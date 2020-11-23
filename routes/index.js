var express = require('express');
var mongoose = require('mongoose');
var index = require('../controllers/indexController');

var router = express.Router();

// GET Sign in page.
router.get('/', index.sign_in);

// POST home page
router.post('/home', index.home_page);

router.get('/signup', index.sign_up);

module.exports = router;
