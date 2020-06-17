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
        default:new Date(),
        required:true,
    },
    meetingDetails:{
        type:String,
        required:false,
    },
    owner:{
        type:String,
        required:false,
    },
    allowedToSee:{
        type:Array,    
        required:true,
    },
    isContacted :{
        type:Boolean,
        default:false,
    },
    reportType:{
        type:String,
        required:true,
    },
    whoseDocument:{
        type:String,
        required:false,
    },
    region:{
        type:String,
        required:true,
    },
    townShip:{
        type:String,
        required:false,
    }

});

module.exports = mongoose.model('Report',Reports);