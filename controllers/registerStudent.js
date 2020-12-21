const Student = require('../models/student');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Reports = require('../models/reports');
const mongoose = require('mongoose')
 
module.exports.add = async (req,res,next)=>{

    try {
      
      const { token , ...studentInformations } = req.body ; 
      const tokenData  = await jwt.verify( token , process.env.SECRET_KEY ) ; 

       const newStudent=new Student({

       StudentInfo:{

        ...studentInformations,
        Images:[],

       },
 
       owner:tokenData.owner,
       allowedToSee:tokenData.allowedToSee, 
           
     });
 
                const updatedReport = await Reports.findOne ( { _id:tokenData.contactReportID } ).populate('owner') ; 

           
                if( updatedReport.owner._id != tokenData.owner ||  !updatedReport ||  updatedReport.isFormFilled) {

                        return res.json( { result:'Error' } ) ; 

                }

                 const updated = await Reports.updateOne( { _id:tokenData.contactReportID }  , { $set: { isFormFilled:true } } )

                 const saved = await  newStudent.save();

                 const signedToken =  await jwt.sign({ studentID:saved._id , owner:tokenData.owner , e_mail:tokenData.e_mail  } , process.env.SECRET_KEY);

                 var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'huze.ozr@gmail.com',
                      pass: '22312231aa'
                    }
                  });
                  
                  var mailOptions = {
                    from: 'huze.ozr@gmail.com',
                    to: tokenData.e_mail,
                    subject: 'StudyOnlineInCanada Döküman Bilgilendirme',
                    html: `<a href =${'https://study-online.herokuapp.com/upload?token=' + signedToken} > Rosedale Gerekli Belgeleri Yüklemek İçin Lütfen Tıklayınız. </a>`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){

                    if (error) {
                                          
                        res.json({result:'Error' , error});

                    } else {
              
                        res.json({result:'Success'});

                    }

                  });
                 
         }
         catch (error)  {
            
              
                 res.json({result:'Error' , error});
         }
    

}

module.exports.updateStudent = async (req,res) => {

    const { params:{id} , body }  = req ; 

    try {

        await Student.updateOne({_id:id} , {$set:{StudentInfo:body}});
        
        const updatedStudent = await Student.findOne({_id:id});
        
        res.json({updatedStudent});
        
    } catch (error) {

        res.json({error});
        
    }

}



module.exports.uploadDocuments = async (req,res) =>{

    const token =  req.header("Authorization").split(' ')[1];
   
    try {

        const tokenData  = await jwt.verify( token , process.env.SECRET_KEY ) ; 

        const checkedStudent = await Student.findOne({_id:tokenData.studentID})


        if( checkedStudent && !checkedStudent.registerState.docState ) {

                  
                if( tokenData.owner == checkedStudent.owner ) {

                    
                    var images = [] ; 

                    req.files.forEach( (file,index)=> {
                         
                        images[index] = file.filename;

                    });


                    await Student.updateOne({_id:tokenData.studentID},{$set:{'StudentInfo.Images':images , 'registerState.docState':true}});

                    return res.json({  result:'Success' });

                }

        }
        
        return res.json({   result:'Error'  });
        
    } catch (error) {
        console.log(error)
        
        return res.json({   result:'Error'  });

    }

}




const Query =  (body)=>{
    
    let searchData = {};

    for (const key  in body) { // it needs to be fixed

        const element = body[key];
       
        if(element)
        {
            if( key === 'gender' || key === 'docState' ){
                searchData={...searchData,[key]:element}
            }
            else if (key === 'dateIntervalStart'){
                searchData={...searchData,registerdate:{$gte:element}}
            }
            else if (key === 'dateIntervalEnd'){
                searchData={...searchData,registerdate:{...searchData.meetingDate,$lte:element}}
            }
            else{
                searchData={...searchData,[key]:{ $regex:element, $options: "i" }}
            }    
        }
         
    }
       return  searchData
}

module.exports.studentSearch = async (req,res,next)=>{

    const {user,body:{pageNumber,personelReportID,role,...rest}} = req;
    
    var searchData = Query(rest);
    
    try {
        
        if (user.role !== 'Admin') { 
       
            if(user.role !== role) searchData = { ...searchData , allowedToSee:{$all:[personelReportID]}}  ;

            else searchData = { ...searchData , allowedToSee:{$all:[user._id]}}

        } else {

            if(user.role !== role) searchData = { ...searchData , allowedToSee:{$all:[personelReportID]}}  ;

        }


        var finalSearchQuery = {

            'StudentInfo.name' : searchData.name , 
            'StudentInfo.surname' : searchData.surname , 
            'registerdate' : searchData.registerdate , 
            'registerState.docState' : searchData.docState,
             allowedToSee:searchData.allowedToSee

        }

        finalSearchQuery =  Object.keys(finalSearchQuery).reduce((init,curr)=>{

            if(finalSearchQuery[curr])  {
                   
                return {...init , [curr]:finalSearchQuery[curr]}

            } else {

                return init ; 
            }

        },{})

        var documentCount = await Student.countDocuments(finalSearchQuery);    
             
        var sortedData = await  Student.find(finalSearchQuery).populate('owner').sort({ registerdate : 'descending' }).skip(10*pageNumber).limit(10);

        let copyReport = [...sortedData ];

        copyReport.forEach((mainItem,index)=>{
            
             let copyReportObj = {...mainItem._doc};
             let format = mainItem.registerDate;
             let lastDate = format.getDate() + '/'  + (format.getMonth()+1) + '/' + format.getFullYear();
             let dateArray = lastDate.split('/');
             let updatedArray = dateArray.map((item)=>item.length === 1 ? '0' + item  : item);

             copyReportObj.registerDate = updatedArray.join('/'); 
             copyReport[index] = copyReportObj;
        })

        res.json({ sortedData:copyReport , documentCount: documentCount });

    }       
    catch (error) {
         console.log(error);
         res.json({error});
    }
}

module.exports.getOneStudent = async (req,res,next)=>{

    const {id} = req.params;
  
    try 
    {
        const specificStudent = await Student.findOne({_id:id});

        if(specificStudent) {

            res.json({specificStudent});

        } else  {

            res.json( { error:'Error' } );

        }
                       
    } catch (error) 
    {
        res.json( { error } )  
    } 

}

module.exports.confirmStudent = async ( req ,res ) =>{

    const { params:{id} }  = req ; 

    try {

        await Student.updateOne( {_id:id} , {$set:{'registerState.result.result':true , 'registerState.pendingResult':false }} );
        
        const updatedStudent = await Student.findOne({_id:id});

        res.json({updatedStudent});
        
    } catch (error) {

        res.json({error});
        
    }


}

module.exports.sendConfirmation = async ( req , res) =>{

    const { params:{id} }  = req ; 

    try {

        await Student.updateOne( {_id:id} , {$set:{'registerState.pendingResult':true}} );
        
        const updatedStudent = await Student.findOne({_id:id});

        res.json({updatedStudent});
        
    } catch (error) {

        res.json({error});
        
    }

}


module.exports.addPaymentSchedule = async ( req , res) => {

    const { params:{ id } , body:{ paymentSchedule , paymentType } }  = req ; 

    console.log(paymentSchedule)

    try {

        await Student.updateOne( { _id:id } , {  $set: { 'paymentSchedule': paymentSchedule  , 'paymentType':paymentType , 'registerState.isContracted':true } } );
        
        const updatedStudent = await Student.findOne({ _id:id });

        res.json({updatedStudent});
        
    } catch (error) {

        res.json({error});
        
    }


}

module.exports.deleteFile = async (req,res) => {

    const { params:{ id } , body:{ fileWillBeDeleted } }  = req ; 

    console.log('HEYY')

    try {

        await Student.updateOne( { _id:id } , {  $pull: { 'StudentInfo.Images': fileWillBeDeleted  } } );
        
        const updatedStudent = await Student.findOne({ _id:id });

        res.json({updatedStudent});
        
    } catch (error) {

        res.json({error});
        
    }
    
}



module.exports.uploadFile = async (req,res) => {

    
    const { params:{ id } }  = req ; 

    try {


        await Student.updateOne( {_id:id} , {$push:{'StudentInfo.Images':req.files[0].filename}} );
        
        const updatedStudent = await Student.findOne({_id:id});

        res.json({updatedStudent});
        
    } catch (error) {

        res.json({error});
        
    }

}


module.exports.deleteStudent = async (req,res) => { 

    const { params:{id} }  = req ; 

    try {

        const updatedStudent = await Student.deleteOne({_id:id});
         
        res.json({updatedStudent});
        
    } catch (error) {

        res.json({error});
        
    }


} //

module.exports.addNewStudent = async ( req ,res , next ) => {

    const { user , body:{ mainData , studentModel } } = req;

    try {

        const newStudent =  new Student({

            StudentInfo:{

                ...studentModel,
                name:mainData.studentName,
                surname:mainData.studentSurname,
                date_of_birth:mainData.studentBirthDate,
                phone_number:mainData.studentPhoneNumber,
                e_mail:mainData.studentMail,
                parent_guardian_e_mail_address:mainData.studentParentMail,
                currentor_last_attended_school_name:mainData.studentSchoolName,
                
                Images:[],
              
     
            },

            isFilled:false,
            owner:user._id,
            allowedToSee: user.relatedAgencyID ? [ user._id , user.relatedAgencyID ] : [ user._id ], 
                
        });
    
        let newAdded = await newStudent.save();
    
        const tokenData = {
    
            owner : user._id ,
            stundentID:newAdded._id, 
            studentMail:mainData.studentMail,
    
        }
    
        const token =  await jwt.sign( { ...tokenData } , process.env.SECRET_KEY , {expiresIn:'1h'} );
        const tokenLink =  'https://study-online.herokuapp.com/student_form?token=' + token + 
        `&name=${mainData.studentName}` +
        `&surname=${mainData.studentSurname}` +
        `&e_mail=${mainData.studentMail}`+
        `&parent_guardian_e_mail_address=${mainData.studentParentMail}` +
        `&currentor_last_attended_school_name=${mainData.studentSchoolName}` +
        `&phone_number=${mainData.studentPhoneNumber.split(" ").join("_")}` + 
        `&origin=UPDATE`; 
    
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'huze.ozr@gmail.com',
              pass: '22312231aa'
            }
          });
          
          var mailOptions = {
            from: 'huze.ozr@gmail.com',
            to: mainData.studentMail,
            subject: 'StudyOnlineInCanada Döküman Bilgilendirme',
            html: `<a href =${tokenLink} > On Kayıt Formunuzu Doldurmak Icın Lutfen Tıklayın  </a>`
          };
          
           transporter.sendMail(mailOptions, function(error, info) {
    
            if (error) {
                
                return res.json({result:'Error' , error});
    
            } else {
      
                return res.json({result:'Success'});
    
            } } )

    } catch (error) { 

            console.log(error);

            return res.json({error:error});

    }

}

module.exports.updateStudent = async (req,res) => {

    const { params:{id} , body }  = req ; 

    try {

        await Student.updateOne({_id:id} , {$set:{StudentInfo:body}});
        
        const updatedStudent = await Student.findOne({_id:id});
        
        res.json({updatedStudent});
        
    } catch (error) {

        res.json({error});
        
    }

}

module.exports.updateNewAddedStudent = async ( req , res , next )=>{

    try {
        
        const { token , ...studentInformations } = req.body ; 

        const tokenPayload  = await jwt.verify( token , process.env.SECRET_KEY ) ; 
    
        const willBeUpdated =  await Student.findOne( {_id:tokenPayload.stundentID} ).populate('owner');

        if ( willBeUpdated.owner._id ==  tokenPayload.owner && willBeUpdated && tokenPayload.studentMail == willBeUpdated.StudentInfo.e_mail && !willBeUpdated.isFilled ) {

           await Student.updateOne( {_id:tokenPayload.stundentID} , {$set:{StudentInfo:{ ...studentInformations , Images:willBeUpdated.StudentInfo.Images || [] } }, isFilled:true } )

        } else {

            return res.json({ error: 'Error'}) ;

        }

        const signedToken =  await jwt.sign({ studentID:tokenPayload.stundentID , owner:tokenPayload.owner , e_mail:tokenPayload.studentMail  } , process.env.SECRET_KEY);

        var transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
             user: 'huze.ozr@gmail.com',
             pass: '22312231aa'
           }
         });
         
         var mailOptions = {
           from: 'huze.ozr@gmail.com',
           to: tokenPayload.studentMail,
           subject: 'StudyOnlineInCanada Döküman Bilgilendirme',
           html: `<a href =${'https://study-online.herokuapp.com/upload?token=' + signedToken} > Rosedale Gerekli Belgeleri Yüklemek İçin Lütfen Tıklayınız. </a>`
         };
         
         transporter.sendMail(mailOptions, function(error, info) {

           if (error) {
                                 
               return res.json({result:'Error'});

           } else {
     
               return res.json({result:'Success'});

           }

         });

    
    } catch (error) {
        
        return res.json({ error: 'Error' })

    }

}

module.exports.sendForm = async ( req , res , next )=>{

    const { tokenData , requestType } = req.body ;

    const token =  await jwt.sign( { ...tokenData } , process.env.SECRET_KEY , {expiresIn:'1h'} );
    
    const tokenLink =  'https://study-online.herokuapp.com/student_form?token=' + token + `&origin=REGISTER`; 

    await Reports.updateOne({_id:tokenData.contactReportID} , {$set:{isFormSent:true}});

    if ( requestType === 'MAİL' ) {
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'huze.ozr@gmail.com',
              pass: '22312231aa'
            }
          });
          
          var mailOptions = {
            from: 'huze.ozr@gmail.com',
            to: tokenData.e_mail ,
            subject: 'StudyOnlineInCanada Döküman Bilgilendirme',
            html: `<a href =${tokenLink} > Ön Kayıt Formunu Doldurmak İçin Lütfen Tıklayınız </a>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){

            if (error) {

                res.json({result:'Error'});

            } else {
      
                res.json({result:'Success'});

            }

          });
           
    } else {
           
             
          res.json({result:'Success' , tokenLink });


    }

}