var express = require('express');
var mongoose = require('mongoose');
var index = require('../controllers/indexController');

var router = express.Router();

// GET Sign in page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WeatherMood | Welcome' });
});

// POST home page
router.post('/home', index.home_page);

module.exports = router;
