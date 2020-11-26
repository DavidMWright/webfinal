var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

// Only set up for testing 
router.get('/profile', user_controller.user_profile);

router.get('/edit', user_controller.user_edit_page);

router.post('/edit', user_controller.user_edit);

module.exports = router;
