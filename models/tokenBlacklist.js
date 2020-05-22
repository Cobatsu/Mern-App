const mongoose = require('mongoose');


const BlackList = mongoose.Schema({

 token:{
   type:String,
   required:true
 },


});



module.exports = mongoose.model('BlackList',BlackList);