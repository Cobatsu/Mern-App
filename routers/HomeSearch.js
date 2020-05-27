const express = require('express');
const router  = express.Router();
const HomeSearch = require('../controllers/HomeSearch');

router.route('/').get(HomeSearch);

module.exports = router;
