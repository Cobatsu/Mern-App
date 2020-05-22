const express = require('express');
const router  = express.Router();
const jwt  = require('jsonwebtoken');

router.route('/').post(async (req,res,next)=>{
   
    let token = req.header("Authorization").split(' ')[1] ;
    try 
    {
        const verify = await jwt.verify(token,process.env.SECRET_KEY);    
        res.json({message:'Logout Succesful',isLoggedin:false})     
        
    } catch (error) {
        
        res.json({message:'Server Error',isLoggedin:false});
    }
})

module.exports = router;