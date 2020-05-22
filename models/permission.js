const mongoose = require('mongoose');

const Permission = mongoose.Schema({
    subBranchDefault:{
        type:Object,
        required:true,
    },
    agencyDefault:{
        type:Object,
        required:true,
    },
    adminDefault:{
        type:Object,
        required:true,
    }
});

module.exports  = mongoose.model('Permission',Permission);
