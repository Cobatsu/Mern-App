const mongoose = require('mongoose');


const Reports = mongoose.Schema({        
    schoolName :{
        type:String,
        required:false,
        trim:true , 
        lowerCase:true,
    },
    relatedPersonName :{
        type:String,
        required:true,
        trim:true , 
        lowerCase:true,
    }, 
    relatedPersonPhoneNumber: {
        type:String ,
        required:true,
        trim:true , 
    },
    relatedPersonEmail : {
        type:String , 
        required:true ,
        trim:true , 
    },

    meetingDate :{
        type:Date , 
        default:new Date() ,
        required:true ,
    },

    meetingDetails:{
        type:String,
        required:false,
        trim:true , 
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        default:null,
        required:false,
    },

    allowedToSee:[ mongoose.Schema.Types.ObjectId ] ,

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