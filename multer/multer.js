
const multer =require("multer");
const DIR = './client/public/';

storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now()+'_'+fileName)
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