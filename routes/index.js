var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WeatherMood | Welcome' });
});

router.post('/home', function(req, res, next) {
  res.render('home', { title: 'WeatherMood | Home'});
});

module.exports = router;
