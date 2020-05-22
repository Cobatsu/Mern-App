const express = require('express');
const router  = express.Router();
const {auth}  = require('../controllers/verify');
const Profile  =require('../controllers/Profile');

router.route('/report/add').post(auth,Profile.addReport);
router.route('/report_search').post(auth,Profile.reportSearch);
router.route('/:id').patch(auth,Profile.Update)

router.route('/report/:id')
.get(Profile.getSpecificReport)
.patch(auth,Profile.updateReport)
.delete(auth,Profile.deleteReport)
.patch(auth,Profile.Update);


module.exports = router;
