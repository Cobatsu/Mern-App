const mongoose = require('mongoose');


const contactReports = mongoose.Schema({        
    name :{
        type:String,
        required:false,
    },
    surname :{
        type:String,
        required:true,
    }, 
    phoneNumber: {
        type:String ,
        required:true,
    },
    e_mail : {
        type:String , 
        required:true,
    },
    region :{
        type:String , 
        required:true,
    },
    date:{
        type:Date,
        default:new Date(),
    }

});

module.exports = mongoose.model('contactReports',ContactReports);