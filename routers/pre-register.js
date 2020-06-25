const express = require('express');
const router  = express.Router();
const registerStudent = require('../controllers/registerStudent');
const uploadMulter = require('../multer/multer')

const {auth}  = require('../controllers/verify');

router.post('/',registerStudent.add);
router.post('/uploadDocuments' , uploadMulter.upload.array('imgCollection',4), registerStudent.uploadDocuments);

router.route('/sendForm').post(auth,registerStudent.sendForm);

router.route('/get_students').post(auth,registerStudent.studentSearch);

router.
route('/student/:id')
.all(auth)
.get(registerStudent.getOneStudent)
.patch(registerStudent.updateStudent)
.delete(registerStudent.deleteStudent)

module.exports = router;

