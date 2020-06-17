const User = require('../models/user');
const jwt  = require('jsonwebtoken');

module.exports.verify  = async (req,res,next)=>{
   let token = req.header("Authorization").split(' ')[1]
   
   try {
       const verify = await jwt.verify(token,process.env.SECRET_KEY);
       const user = await User.findOne({_id:verify._id});
       res.json({isLoggedin:true,user,message:'Verify Succesful'});
   } 
   catch (error) 
   {
        console.log(error)
        res.json({message:'Invalid Token',isLoggedin:false,user:{}})
   }     
}

module.exports.auth =  async (req,res,next)=>{
  
    const token = req.header("Authorization").split(' ')[1];
    try
    {
        const verify = await jwt.verify(token,process.env.SECRET_KEY);

        const currentUser = await User.findOne({_id:verify._id});

        if(currentUser) {
                
            var result = Object.keys(verify).every((key)=>{
               
                return currentUser[key] == verify[key];

            })
            
            if(result) {

                req.user = verify ; 
                
                next();

            } else {
                
                res.json({error:'Server Error'})
 
            }

             
        } else {

            res.json({error:'Server Error'}); 

        }
            //if there is no problem go on with  next ();
    }
    catch(error)
    { 
        res.json({isLoggedin:false,error})
    }
}

module.exports.unique = async (req,res,next)=>{
    
    const {id} = req.params;
    const {userName} = req.body;
  
    if(userName)
    {
        try {
            
            if(id)    //this is for updating users
            {
                const FindUser_x = await User.findOne({_id:id});
                const FindUser_y = await User.findOne({userName});

                if(FindUser_y && userName !== FindUser_x.userName)
                {
                  res.json({notUnique:true});
                }
                else
                {
                   next();
                }  
            }
            else
            {
                const FindUser = await User.findOne({userName}); //to add users
                if(FindUser)
                {
                  res.json({notUnique:true});
                }
                else
                {
                   next();
                }   
            }
           
        } catch (error) {
            
            res.json({error});
  
        }      
    } 
    else
    {
        res.json({message:'Server  Error'})
    }
}