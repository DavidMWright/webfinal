var express = require('express');
var mongoose = require('mongoose');
var index = require('../controllers/indexController');

var router = express.Router();

// GET Sign in page.
router.get('/', index.sign_in_page);

// POST to home page
router.post('/signin', index.sign_in);

// GET Sign in page
router.get('/signup', index.sign_up_page);

// POST Sign in page after sign up
router.post('/', index.sign_up);

// GET Home page
router.get('/home', index.home);
router.post('/home', index.home);

// POST Home page
router.post('/input', index.input);

// Get input page
router.get('/input', index.input_page);

router.get('/forgot', index.forgot_password_page);

router.post('/forgot', index.forgot_password);

// router.post('/api', (request, response) => {
//     console.log(request.body);
//   });

// GETS LON AND LAT FROM CLIENTSIDE


module.exports = router;
