const express = require('express');
const router  = express.Router();
const HomeSearch = require('../controllers/HomeSearch');
const {auth}  = require('../controllers/verify');

router.route('/').get( auth , HomeSearch );

module.exports = router;
