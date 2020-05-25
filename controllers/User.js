const User = require('../models/user');
const Permission = require('../models/permission');
require('dotenv').config();
const bcyrpt = require('bcryptjs');

const isPermissionsAreSame = async (permissions)=>{
     

    const originalPermissions = await Permission.findOne({ _id : process.env.PERMİSSİON_İD }) 

    var  { subBranchDefault } = originalPermissions;

    for (const key in permissions) {
        
       if(Object.keys(subBranchDefault).includes(key))
       {

           let isSame  =  permissions[key].every((value,index)=> value === subBranchDefault[key][index] );
                
              return  isSame  ;  

       }
       else
       {

            return  false ;

       }
        
    }

}

module.exports.addUser = async (req,res,next)=>{
    
    const { password , ...rest } = req.body; 
    const { permissions } = rest;
    const currentUser = req.user ;

  
   if(currentUser.role === 'Bayi')
   {
       return res.json({ error:'Server Error' });
   }

   if(currentUser.role === 'Temsilci' && rest.role !== 'Bayi')
   {
       return res.json({ error:'Server Error' });
   }


   if(currentUser.role !== 'Admin')
   {
        if(!isPermissionsAreSame(permissions)) return res.json({error:'Server Error'});
   }
    
   bcyrpt.hash(password,10,async (err,hash)=>{

        let  newUser = null ;

        if(rest.role  === 'Bayi' )
        {       
            newUser = new User({...rest,relatedAgencyID:currentUser._id,password:hash});
        }
        else
        {
            newUser = new User({ ...rest , password:hash });
        }
      

        if(err)
        {
            return res.json({message:'Server Error'}) 
        }
        else
        {

           try
           {
               const saved = await  newUser.save();
               res.json({saved,message:'Adding Succesful'});
           }
           catch (error) 
           {
               console.log(error)
               res.json({error, message:'User Name must be unique'})
           }

        }
    })  

}


module.exports.getPermission = async (req,res,next)=>{
    try {

        const permissionsList  = await Permission.findOne({_id:"5ea5ea1421f697326c0c53f0"}).select('-__v');
        res.json({ permissionsList });

    } catch (error) {
        res.json({ error });         
    }  

} 

module.exports.getSpecificUser = async (req,res,next)=>{
    const {id}  = req.params;
    try 
    {
        const onePerson = await User.findOne({_id:id}).select('-__v -_id');
        if(onePerson)
        {
            res.json({person:onePerson});
        }
        else
        {
            res.json({message:'Server Error',error:'Error'});
        }
    } 
    catch (error)
    {
        res.json({error});
    }
}

module.exports.removeUser = async (req,res,next)=>{
  
    const {id}  = req.params;
    const {user} = req;

    if(user.role === 'Admin')
    {
        try 
        {

            const deletedUser = await User.findOneAndRemove({_id:id});
            res.json({deletedUser});

        } catch (error) {
            res.json({error});
        }

    }
    else
    {
        res.json({error:'Server Error'})
    }
 

}

module.exports.updateSpecificUser = async (req,res,next)=>{
  
    const {id}  = req.params;
    const currentUser = req.user;
    let  updatedUser = req.body;
    const {password} = updatedUser;

    if(updatedUser.role !== 'Bayi')  
        updatedUser = {...updatedUser,relatedAgencyID:''}
    
    if(currentUser.role !== 'Admin' &&   currentUser.role !== 'Temsilci')
        return res.json({error:'Server Error'}) ;
    
    if(currentUser.role === 'Temsilci' && updatedUser.role !== 'Bayi')
        return res.json({error:'Server Error'}) ;
   
    try {
        
        const willUpdate = await User.findOne({_id:id});

        if(willUpdate.password !== password)
        {
          bcyrpt.hash(password,10,async (err,hash)=>{
           
            const onePerson = await User.updateOne({_id:id},{$set:{...updatedUser,password:hash}});
            const updatedNewUser = await User.findOne({_id:id}).select('-__v');

            return res.json({success:true,message:'Updated',updatedNewUser});

          })
        }
        else
        {
            await User.updateOne({_id:id},{$set:{...updatedUser,password:password}});
            const updatedNewUser = await User.findOne({_id:id}).select('-__v');
            res.json({success:true,message:'Updated',updatedNewUser});
        }
       
    } catch (error) {
        res.json({error});
    }
}

const Query = (body)=>{
  
    let searchData = null ;

    for (const key in body) {
       
        const element = body[key];

        if(element)
        {

           if(key === 'gender' || key === 'region' ||  key ==='role')
           {
               searchData={...searchData,[key]:element}
           }
           else if(key === 'contractDateStart')
           {
               searchData={...searchData,contractDate:{$gte:element}}
           }
           else if(key === 'contractDateEnd')
           {
               searchData={...searchData,contractDate:{...searchData.contractDate,$lte:element}}
           }
           else
           {
               searchData={...searchData,[key]:{ $regex:element, $options: "i" }}
           }
            
        }

            
    }

    return  searchData;
    
}

module.exports.personSearch = async (req,res,next) => {

  const {user,body:{pageNumber,...rest}} = req;
  
    let searchData = Query(rest);
    
   try {

        if(!pageNumber)
        {
          var documentCount = await User.countDocuments(searchData);     
        }

        let sortedData = await  User.find(searchData).sort({contractDate:'descending'}).skip(10*pageNumber).limit(12);

        let copyReport = [...sortedData];

        copyReport.forEach((mainItem,index)=>{        
             let copyReportObj = {...mainItem._doc};
             let format = mainItem.contractDate;
             let lastDate = format.getDate() + '/'  + (format.getMonth()+1) + '/' + format.getFullYear();
             let dateArray = lastDate.split('/');
             let updatedArray = dateArray.map((item)=>item.length === 1 ? '0' + item  : item);
             copyReportObj.contractDate = updatedArray.join('/'); 
             copyReport[index] = copyReportObj;
        })

        res.json({sortedData:copyReport,documentCount});
   } 
   catch (error){
       
         console.log(error)
   }
}

module.exports.getSubBranchs = async (req,res,next)=>{
     
     const {id}  = req.params;

     try 
     {
        const subBranches = await User.find({relatedAgencyID:id});
        res.json({subBranches});

     } 
     catch (error) 
     {
        res.json({error});
     }

}

module.exports.getRelatedAgency = async (req,res,next)=>{

    const {id} = req.params;
    try { 
        const relatedAgency = await User.findOne({_id:id}).select({ "firstName": 1,"lastName":1,"region":1 , "_id":0 });
        res.json({relatedAgency});

    } catch (error) {
        res.json({error});
    }


}

