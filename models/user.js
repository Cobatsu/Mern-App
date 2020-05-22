const mongoose = require('mongoose');
const uniqueValidtor=require('mongoose-unique-validator')
const User = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
         type:String,
         required:true,
    },
    lastName:{
         type:String,
         required:true,
    },
    password:{
         type:String,
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
         required:true
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
    }
})

User.plugin(uniqueValidtor)

module.exports = mongoose.model('user',User);