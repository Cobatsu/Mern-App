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
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        default:null,
        required:false,
    },
    allowedToSee:[{type:mongoose.Schema.Types.ObjectId , required:true}] , 
    isContacted :{
        type:Boolean,
        default:false,
    },
    reportType:{
        type:String,
        required:true,
    },
    region:{
        type:String,
        required:true,
    },
    isFormSent:{
        type:Boolean,
        default:false,
    },
    isFormFilled:{
        type:Boolean,
        default:false,
    },
    townShip:{
        type:String,
        required:false,
    }

});

module.exports = mongoose.model('Report',Reports);