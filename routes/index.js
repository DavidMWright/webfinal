var express = require('express');
var mongoose = require('mongoose');
var index = require('../controllers/indexController');

var router = express.Router();

// GET Sign in page.
router.get('/', index.sign_in_page);

// POST Sign in page
router.post('/', index.sign_up);

// POST home page
router.post('/signin', index.sign_in);

router.get('/signup', index.sign_up_page);

router.get('/home', index.home);

module.exports = router;
