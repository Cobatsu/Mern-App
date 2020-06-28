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

    registerDate: {

         type:Date,
         default:new Date(),
         required:true

    },

    registerState:{
        
        docState: {type:Boolean , default:false } , 

        pendingResult:  {type:Boolean , default:false } ,

        result : {
            
            text:{type:String , default:'' } ,

            result:{type:Boolean , default:false } , 
 
        } ,

        isContracted:{

            type:Boolean,
            default:false,
    
        },

    },

   
    paymentType:{

        type:String , 
        default:'',
        
    } ,

    paymentSchedule:[ {
        amount:String ,
        date :Date,
    } ], 

    allowedToSee:[ mongoose.Schema.Types.ObjectId ]

});

module.exports = mongoose.model('student',Student);