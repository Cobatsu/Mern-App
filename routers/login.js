const express = require('express');
const User = require('../models/user')
const Permission = require('../models/permission');
const bcrypt  = require('bcryptjs');
const router  = express.Router();
const uuid = require('uuid')
const jwt  = require('jsonwebtoken');
const Login = require('../controllers/Login')

router.route('/').post(Login);

module.exports= router;