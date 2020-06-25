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
 
                const updatedReport = await Reports.findOneAndUpdate ( { _id:tokenData.contactReportID } , { $set: { isFormFilled:true } } ).populate('owner') ; 

           

                if( updatedReport.owner._id != tokenData.owner ||  !updatedReport ||  updatedReport.isFormFilled) {

                        return res.json( { result:'Error' } ) ; 

                }

                 const saved = await  newStudent.save();

                 const signedToken =  await jwt.sign({ studentID:saved._id , owner:tokenData.owner , e_mail:tokenData.e_mail  } , process.env.SECRET_KEY);

                 var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'huze.ozr@gmail.com',
                      pass: 'Huzeyfe123..'
                    }
                  });
                  
                  var mailOptions = {
                    from: 'huze.ozr@gmail.com',
                    to: tokenData.e_mail,
                    subject: 'StudyOnlineInCanada Döküman Bilgilendirme',
                    html: `<a href =${'http://localhost:3000/upload?token=' + signedToken} > HELLO ERCÜMENT </a>`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){

                    if (error) {

                        res.json({result:'Error'});

                    } else {
              
                        res.json({result:'Success'});

                    }

                  });
                 
         }
         catch (error)  {
            
                 res.json({result:'Error'});
         }
    

}

module.exports.updateStudent = async (req,res) => {

    const { params:{id} , body }  = req ; 

    try {

        await Student.updateOne({_id:id} , {$set:{StudentInfo:body}});
        
        const updatedStudent = await Student.findOne({_id:id});
        
        res.json({updatedStudent});
        
    } catch (error) {

        res,json({error});
        
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


}

module.exports.uploadDocuments = async (req,res) =>{

    const token =  req.header("Authorization").split(' ')[1];
   
    try {

        const tokenData  = await jwt.verify( token , process.env.SECRET_KEY ) ; 

        const checkedStudent = await Student.findOne({_id:tokenData.studentID})

        const copyStudent = {...checkedStudent} ; 

        if( checkedStudent && !checkedStudent.registerState.docState ) {

                  
                if( tokenData.owner == checkedStudent.owner ) {

                    copyStudent.registerState.docState = true ;
                    
                    req.files.forEach( (file,index)=> {
                         
                        copyStudent.StudentInfo.Images[index] = file.filename;

                    });

                    await Student.updateOne({_id:tokenData.studentID},{copyStudent});

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

            'StudentInfo.information.name' : searchData.name , 
            'StudentInfo.information.surname' : searchData.surname , 
            'StudentInfo.registerdate' : searchData.registerdate , 
            'StudentInfo.registerState.onkayit.docState' : searchData.docState,
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

    console.log('Hİİİ');
  
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

module.exports.sendForm = async ( req , res , next )=>{

    const { tokenData , requestType } = req.body ;

    const token =  await jwt.sign( { ...tokenData } , process.env.SECRET_KEY , {expiresIn:'1h'} );
    
    const tokenLink =  'http://localhost:3000/student_form?token=' + token ; 

    await Reports.updateOne({_id:tokenData.contactReportID} , {$set:{isFormSent:true}});

    if(requestType === 'MAİL') {
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'huze.ozr@gmail.com',
              pass: 'Huzeyfe123..'
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