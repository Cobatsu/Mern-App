const mongoose = require('mongoose');
const uniqueValidtor=require('mongoose-unique-validator')
const shortid = require('shortid')

const User = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    firstName:{
         type:String,
         lowerCase:true,
         trim:true,
         required:true,
    },
    lastName:{
         type:String,
         lowerCase:true,
         trim:true,
         required:true,
    },
    password:{
         type:String,
         trim:true,
         requireds:true,
    },
    gender:{
         type:String,
         required:true,
    },
    mailAddress:
    {
         type:String,
         required:true,
         trim:true,
    },
    role:{
         type:String,
         required:true
    },
    phoneNumber:{
            type:String,
            required:true
    },
    permissions:{
         type:Object,
         required:false
    },
    contractDate : {
         type:Date,
         required:true,
    },
    region:{
     type:String,
     required:false,
    },
    township:{
     type:String,
     required:false,
    },
    relatedAgencyID:{
     type:String,
     required:false,
    },
    responsibleCities : {
     type:Array,
     required:false,
    },

})

User.plugin(uniqueValidtor)

module.exports = mongoose.model('user',User);