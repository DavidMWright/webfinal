var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

// Post Request for User Page
router.post('/:id', user_controller.user_detail);

// Only set up for testing 
router.get('/', function(req, res, next) {
    res.render('profile', { user: {first_name: 'David', last_name: 'Wright'} });
});

module.exports = router;
