const mongoose = require('mongoose');


const Student = mongoose.Schema({
    StudentInfo:{
        type:Object,
        required:true,
    }
});

module.exports = mongoose.model('student',Student);