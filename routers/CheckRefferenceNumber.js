const express = require('express');
const router  = express.Router();
const checkRefferenceNumber = require('../controllers/checkRefferenceNumber');

router.route('/').post(checkRefferenceNumber)

module.exports= router;