const User = require('../models/user');
const bcrypt  = require('bcryptjs');
const Permission = require('../models/permission');
const jwt  = require('jsonwebtoken');

module.exports = async (req,res,next)=>{

    const { name , password } = req.body;
    
    if(name  && password)
    {
        const user = await User.findOne({userName:req.body.name});  
        
       if(user)
      {
          bcrypt.compare(req.body.password, user.password, async function(err, result) {
    
            if(result)
            {            
                const permissions = await Permission.findOne({_id:"5ea5ea1421f697326c0c53f0"});

                const {_doc:{_id,...rest}}=permissions;
    
                let type = ''; 
                let updatedPermissions = {};

                switch(user.role)
                {
                    case 'Bayi':
                           type='subBranchDefault';
                        break;
                    case 'Temsilci':
                           type='agencyDefault';
                        break;
                    case 'Admin':
                           type='adminDefault';
                        break;     
                }
                
                for (let i = 0 ; i < Object.keys( rest[type] ).length ; i++) {  

                    if(! Object.keys( user.permissions ).includes( Object.keys(rest[type])[i] )){

                       var  newPermissionKey =  Object.keys(rest[type])[i] ; 

                       updatedPermissions[newPermissionKey] = [];
                    }
                }

                await User.updateOne({_id:user._id},{$set:{permissions:{...user.permissions,...updatedPermissions}}});

                const getUpdatedUser = await User.findOne({_id:user._id})
                 
                const token =  await jwt.sign({_id:user._id,userName:user.userName,firstName:user.firstName,lastName:user.lastName,role:user.role},process.env.SECRET_KEY,{expiresIn:'1d'});
                return res.json({user:getUpdatedUser,token ,isLoggedin:true , message:'Login Successful'});
                
            }
            else
            {
                return res.json({message:'Wrong Password'})
            } 
            
        });  
        }
        else
        {
                res.json({message:'User Name is not Valid '})
        }

    }
    else
    { 

        res.json({message:'Name And Password Can Not Be Blank'})

    }

}