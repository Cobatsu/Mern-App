
const multer =require("multer");
const DIR = './public/documents';
const jwt = require('jsonwebtoken');

storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
     
        cb(null, DIR);
    },
    filename: (req, file, cb) => {

        const token =  req.header("Authorization").split(' ')[1];

        const jwtData = jwt.verify(token, process.env.SECRET_KEY);

        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, jwtData.id +  '_' + Date.now()+'_'+fileName)
    }
});


module.exports.upload=multer({

    storage: storage,
    fileFilter: (req, file, cb) => {
        if (true) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});