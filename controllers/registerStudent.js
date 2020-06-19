
const Student = require('../models/student');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const student = require('../models/student');
const Reports = require('../models/reports');
 
module.exports.add = async (req,res,next)=>{

    const { referenceCode } = req.body ; 

 
        const  relatedUser = await User.findOne({ referenceCode });

        if(!relatedUser) {

            return res.json({isCorrect:false});

        }

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
             onkayit:{note:'' , state:true , docState:false },
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
         referenceCode
       }
           
     });
 
         try {
                 const saved = await  newStudent.save();

                 const token =  await jwt.sign({ id:saved._id , referenceCode },process.env.SECRET_KEY);

                 var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'huze.ozr@gmail.com',
                      pass: 'Huzeyfe123..'
                    }
                  });
                  
                  var mailOptions = {
                    from: 'huze.ozr@gmail.com',
                    to: 'ercanozr12@gmail.com',
                    subject: 'StudyOnlineInCanada Döküman Bilgilendirme',
                    html: `<a href =${'http://localhost:3000/upload?token=' + token} > HELLO ERCÜMENT </a>`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){

                    if (error) {

                      console.log(error);

                    } else {
              
                        res.json({saved:'Completed'});

                    }

                  });
                 
         }
         catch (error) 
         {
                 console.log(error)
                 res.json({error});
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

        const tokenData  = await jwt.verify( token , process.env.SECRET_KEY) ; 

        const checkedStudent = await student.findOne({_id:tokenData.id})

        const copyStudent = {...checkedStudent.StudentInfo} ; 

        if( checkedStudent && !checkedStudent.StudentInfo.registerState.onkayit.docState ) {

            if(!req.files) {
                    return res.json({isVerified:true});
            } else {
                  
                if( tokenData.referenceCode == checkedStudent.StudentInfo.referenceCode ) {

                    copyStudent.registerState.onkayit.docState = true ;
                    
                    req.files.forEach( (file,index)=> {
                         
                        copyStudent.Images[index] = file.filename;

                    });

                    await student.updateOne({_id:tokenData.id},{StudentInfo:copyStudent});

                    return res.json({  isAdded:true });

                }
            }
        }

        res.json({ error:'Server Error' });
        
    } catch (error) {
        console.log(error)
        
        res.json({error:'Server Error'});

    }

}


module.exports.getStudents = async (req,res,next)=>{
    try
    {
        const students  = await Student.find();
        res.json({students})  //find returns array dont forget !        
    } 
    catch (error) 
    {
        res.json({error})
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

    const token =  await jwt.sign( { ...tokenData } , process.env.SECRET_KEY );
    
    const findedReport =  await Reports.updateOne({_id:contactReportID} , {$set:{isFormSent:true}});

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
            to: 'ercanozr12@gmail.com',
            subject: 'StudyOnlineInCanada Döküman Bilgilendirme',
            html: `<a href =${'http://localhost:3000/upload?token=' + token} > HELLO ERCÜMENT </a>`
          };
          
          transporter.sendMail(mailOptions, function(error, info) {

            if (error) {

              console.log(error);

            } else {
      
                res.json({result:'Success'});

            }

          });
           
    } else {
           
             
          res.json({result:'Success' , tokenLink : token });


    }

}