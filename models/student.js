const mongoose = require('mongoose');


const Student = mongoose.Schema({
    
    StudentInfo:{
        type:Object,
        required:true,
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

    allowedToSee:[ { type:mongoose.Schema.Types.ObjectId , required:false } ]
});

module.exports = mongoose.model('student',Student);