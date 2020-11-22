var users = require('../models/userModel');


exports.home_page = function(req, res, next) {
    if(!req.body.username || !req.body.password) {
        res.redirect('/');
    }
    else {
        console.log(users.find(req.body.username));
    }
    
    
    res.render('home', { title: 'WeatherMood | Home'});
}