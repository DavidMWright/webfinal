var express = require('express');
var mongoose = require('mongoose');
var index = require('../controllers/indexController');

var router = express.Router();

// GET Sign in page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WeatherMood | Welcome', err: req.query.err });
});

// POST home page
router.post('/home', index.home_page);

router.get('/input', function(req, res, next) {
  res.render('input', { title: 'WeatherMood | Input your mood', err: req.query.err })
})

module.exports = router;
