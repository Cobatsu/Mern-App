const express = require('express');
const router  = express.Router();
const registerStudent = require('../controllers/registerStudent');
const uploadMulter = require('../multer/multer')
const DIR = '../frontend/public/';
router.post('/', uploadMulter.upload.array('imgCollection',4),registerStudent.add);
router.get('/',registerStudent.getStudents);
router.get('/:id',registerStudent.getOneStudent);
module.exports = router;

