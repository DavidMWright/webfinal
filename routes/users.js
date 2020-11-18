var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

/* Post Request for User Page */
router.post('/:id', user_controller.user_detail);


module.exports = router;
