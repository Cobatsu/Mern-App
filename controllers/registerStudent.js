
const Student = require('../models/student');

module.exports.add = async (req,res,next)=>{

    console.log(req.files)
    if(!req.files) 
    {
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
             kayitalan:'',
             sube:'',
         },
         parentinformation:{
             parentname:req.body.parent_guardian_first_name,
             parentsurname:req.body.parent_guardian_last_name,
             relationshiptostudent:req.body.relationship_to_student,
             emailadress:req.body.parent_guardian_e_mail_address,
             telno:req.body.parent_guardian_mobile_phone_number
         },
         Images:{
         1:'',
         2:'',
         3:'',
         4:'',
         },
         schoolinformation:{
             currentlyhighschoolstate:req.body.currently_attending_a_high_school,
             currentorlastschoolname:req.body. currentor_last_attended_school_name,
             englishlanguageproficiency:req.body.english_language_proficiency,
             gradelevel:req.body.look_forward_to_study_at_rosedale,
             desireduniversitystudie:req.body.desired_university_studie,
         },
         registerstate:{
             onkayit:{not:'',state:true},
             kayitliogrenci:{not:'',state:false},
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
         }
       },registerdate:{
           day:req.body.time.day,
           month:req.body.time.month,
           year:req.body.time.year,
       }});
 
         try {
                 const saved = await  newStudent.save();
                 res.status(201).send(saved);
         }
         catch (error) 
         {
                 console.log(error)
                 res.status(406).send(error);
         }
    }
    else
    {
     try { 
      const all  =  await  Student.find();
      const id = all[all.length-1]._id;
      const lastItem = all[all.length-1];
      const update = await Student.updateOne({_id:id},{StudentInfo:{...lastItem.StudentInfo, Images:{
         govermentIssuedPhoto:req.files[0].filename,
         rosedaleEnglishProficiencyTest:req.files[1].filename,
         englishProficiencyTestResult:req.files[2].filename,
         AcopyOfTranslated:req.files[3].filename,
         }
      }})
 
         res.status(201).send(update);
     }
     catch (error) 
     {
         res.status(406).send(error);
     }
 
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
    console.log(id);
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