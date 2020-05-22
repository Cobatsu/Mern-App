const mongoose = require('mongoose');


const Session = mongoose.Schema({
   
    token:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        required:true,
    }
});

module.exports = mongoose.model('session',Session);