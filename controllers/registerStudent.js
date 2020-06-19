const Student = require('../models/student');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Reports = require('../models/reports');
const mongoose = require('mongoose')
 
module.exports.add = async (req,res,next)=>{
    try {
          
      const { token } = req.body ; 
      const tokenData  = await jwt.verify( token , process.env.SECRET_KEY ) ; 


        console.log(tokenData);

       const newStudent=new Student({StudentInfo:{
         information:{
             name:req.body.name,
             surname:req.body.surname,
             dateofbirth:req.body.date_of_birth,
             countryofbirth:req.body.country_of_birth,
             countryofcitizenship:req.body.country_of_citizenship,
             firstdateofgrade:req.body.first_date_of_grade_9,
             nativelanguge:req.body.native_language,
             gender:req.body.gender,
             adress:{
                 street:req.body.street,
                 apartmentandnumber:req.body.apartment_and_number,
                 town:req.body.town,
                 city:req.body.city,
                 postalcode:req.body.postal_code
             },
             telno:req.body.phone_number,
             emailadress:req.body.e_mail,
         },
         parentinformation:{
             parentname:req.body.parent_guardian_first_name,
             parentsurname:req.body.parent_guardian_last_name,
             relationshiptostudent:req.body.relationship_to_student,
             emailadress:req.body.parent_guardian_e_mail_address,
             telno:req.body.parent_guardian_mobile_phone_number
         },
         Images:[],
         schoolinformation:{
             currentlyhighschoolstate:req.body.currently_attending_a_high_school,
             currentorlastschoolname:req.body. currentor_last_attended_school_name,
             englishlanguageproficiency:req.body.english_language_proficiency,
             gradelevel:req.body.look_forward_to_study_at_rosedale,
             desireduniversitystudie:req.body.desired_university_studie,
         },
         registerState:{
             onkayit:{note:''  , docState:false },
             kayitliogrenci:{
                 
                 note:'', 
                 state:false,
                 edcStatus:{

                    attendanceStatus:false,
 
                 },
                
            },
         },
         odeme:{
             kayitfiyati:'',
             taksitplan:{
                 taksitsayisi:2,
                 firsttaksittarihi:{
                     taksitmiktari:'',
                     tahsilatmiktari:'',
                     tahsiltarihi:'',
 
                 },
                 secondtaksittarihi:{
                     taksitmiktari:'',
                     tahsilatmiktari:'',
                     tahsiltarihi:'',
                 }
             },
         },
         registerdate:new Date(),
       },
       owner:tokenData.owner, 
       allowedToSee:tokenData.allowedToSee , 
           
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
    

    // else {

    //     try { 

    //     const all  =  await  Student.find();
    //     const id = all[all.length-1]._id;
    //     const lastItem = all[all.length-1];
    //     const update = await Student.updateOne({_id:id},{StudentInfo:{...lastItem.StudentInfo, Images:{
    //         govermentIssuedPhoto:req.files[0].filename,
    //         rosedaleEnglishProficiencyTest:req.files[1].filename,
    //         englishProficiencyTestResult:req.files[2].filename,
    //         AcopyOfTranslated:req.files[3].filename,
    //         }
    //     }})
 
    //      res.status(201).send(update);
    //  }
    //  catch (error) 
    //  {
    //      res.status(406).send(error);
    //  }
 
    // }
}


module.exports.uploadDocuments = async (req,res) =>{

    const token =  req.header("Authorization").split(' ')[1];
   
    try {

        const tokenData  = await jwt.verify( token , process.env.SECRET_KEY ) ; 

        const checkedStudent = await Student.findOne({_id:tokenData.studentID})

        const copyStudent = {...checkedStudent.StudentInfo} ; 

        if( checkedStudent && !checkedStudent.StudentInfo.registerState.onkayit.docState ) {

                  
                if( tokenData.owner == checkedStudent.owner ) {

                    copyStudent.registerState.onkayit.docState = true ;
                    
                    req.files.forEach( (file,index)=> {
                         
                        copyStudent.Images[index] = file.filename;

                    });

                    await Student.updateOne({_id:tokenData.studentID},{StudentInfo:copyStudent});

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

        var documentCount = await Student.countDocuments();    
             
        var sortedData = await  Student.find(finalSearchQuery).populate('owner').sort({ 'StudentInfo.registerdate' : 'descending' }).skip(10*pageNumber).limit(10);

        let copyReport = [...sortedData ];

        copyReport.forEach((mainItem,index)=>{
            
             let copyReportObj = {...mainItem._doc};
             let format = mainItem.StudentInfo.registerdate;
             let lastDate = format.getDate() + '/'  + (format.getMonth()+1) + '/' + format.getFullYear();
             let dateArray = lastDate.split('/');
             let updatedArray = dateArray.map((item)=>item.length === 1 ? '0' + item  : item);

             copyReportObj.StudentInfo.registerdate = updatedArray.join('/'); 
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
        if(specificStudent)
        {
            res.json({specificStudent});
        }  
        else 
        {
            res.json({message:'Server Error',error});
        }
                       
    } catch (error) 
    {
        res.json({error})  
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

              console.log(error);

            } else {
      
                res.json({result:'Success'});

            }

          });
           
    } else {
           
             
          res.json({result:'Success' , tokenLink });


    }

}