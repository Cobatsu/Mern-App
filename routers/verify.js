const express = require('express');
const User = require('../models/user')
const {verify} = require('../controllers/verify')
const router  = express.Router();
const jwt  = require('jsonwebtoken');

router.get('/',verify)

module.exports = router;