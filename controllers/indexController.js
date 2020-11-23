var users = require('../models/userModel');

exports.sign_in = function(req, res, next) {
    res.render('index', { title: 'WeatherMood | Welcome', err: req.query.err });
}

exports.home_page = function(req, res, next) {
    if(req.body.signup) {
        if(!req.body.username || !req.body.password || !req.body.confirm || !req.body.email || !req.body.f_name || !req.body.l_name) {
            let err = encodeURIComponent('Please Fill Out All Fields');
            res.redirect('/signup?err=' + err);
        }
        else if(req.body.password.length < 8){
            let err = encodeURIComponent('Password must be at least 8 characters');
            res.redirect('/signup?err=' + err);
        }
        else {
            if(req.body.password != req.body.confirm) {
                let err = encodeURIComponent("Passsword Dont't Match");
                res.redirect('/signup?err=' + err);
            }

            let query = users.find({ user_name: req.body.username });
            query.exec(function(err, qUsers){
                if(err) {
                    console.log(err);
                    res.redirect('/signup');
                }
                else {
                    if(qUsers[0]) {
                        let err = encodeURIComponent('Username Aleady Taken');
                        res.redirect('/signup?err=' + err);
                    }
                    else {
                        users.create({ user_name: req.body.username, password: req.body.password, email: req.body.email, first_name: req.body.f_name, last_name: req.body.l_name });
                        res.render('home', { title: 'WeatherMood | Home'});
                    }
                }
            });
        }
    }
    else {
        if(!req.body.username || !req.body.password) {
            let err = encodeURIComponent('Please Enter Username and Password');
            res.redirect('/?err=' + err);
        }
        else {
            let query = users.find({ user_name: req.body.username }); 
            query.exec(function(err, qUsers) {
                if(err) {
                    console.log(err);
                    res.redirect('/');
                }
                else {
                    if(qUsers[0]) {
                        qUsers.forEach(function(user){
                            if(user.password == req.body.password) {
                                res.render('home', { title: 'WeatherMood | Home'});
                            }
                            else {
                                let err = encodeURIComponent('Invalid Credentials');
                                res.redirect('/?err=' + err);                    
                            }
                        });
                    }
                    else {
                        let err = encodeURIComponent('Invalid Credentials');
                        res.redirect('/?err=' + err);      
                    }
                }
            });
        }
    }
}

exports.sign_up = function(req, res, next) {
    res.render('signup', { title: 'WeatherMood | Sign Up', err: req.query.err});
}