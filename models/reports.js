const mongoose = require('mongoose');


const Reports = mongoose.Schema({        
    schoolName :{
        type:String,
        required:false,
    },
    relatedPersonName :{
        type:String,
        required:true,
    }, 
    relatedPersonPhoneNumber: {
        type:String ,
        required:true,
    },
    relatedPersonEmail : {
        type:String , 
        required:true,
    },
    meetingDate :{
        type:Date , 
        required:true,
    },
    meetingDate2:{
        type:String , 
        required:false,
    },
    meetingDetails:{
        type:String,
        required:true,
    },
    userID:{
        type:Array,
        required:true,
    },
    reportType:{
        type:String,
        required:true,
    },
    whoseDocument:{
        type:String,
        required:true,
    },
    region:{
        type:String,
        required:true,
    },
    townShip:{
        type:String,
        required:true,
    }

});

module.exports = mongoose.model('Report',Reports);