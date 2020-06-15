const User = require('../models/user');

module.exports = async (req,res,next)=>{

    const {referenceCode} = req.body

    try {
        
        const  relatedUser = await User.findOne({ referenceCode });

        if(relatedUser) {

            res.json({isCorrect:true});

        } else {

            res.json({isCorrect:false});
        }


    } catch (error) {
        
        res.json({error});

    }

   

}