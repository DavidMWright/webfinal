var users = require('../models/userModel');

exports.sign_in_page = function(req, res) {
    req.session.destroy();
    res.render('index', { title: 'WeatherMood | Welcome', err: req.query.err });
}

/*
Validates sign in request and redirects to home page and sets up session
*/
exports.sign_in = function(req, res) {
    if(!req.body.username || !req.body.password) {
        let err = encodeURIComponent('Please Enter Username and Password');
        res.redirect('/?err=' + err);
    }
    else {
        let query = users.findOne({ user_name: req.body.username }); 
        query.exec(function(err, user) {
            if(err) {
                console.log(err);
                res.redirect('/');
            }
            else {
                if(user) {
                    if(user.password == req.body.password) {
                        req.session.user = user;
                        
                        let query = 

                        res.redirect('/home');
                    }
                    else {
                        let err = encodeURIComponent('Invalid Credentials');
                        res.redirect('/?err=' + err);                    
                    }
                }
                else {
                    let err = encodeURIComponent('Invalid Credentials');
                    res.redirect('/?err=' + err);      
                }
            }
        });
    }
}

/* 
Validates and sendsd data from sign up page to data base and redirects to sign in
*/
exports.sign_up = function(req, res) {
    let signup = true;

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
            signup = false;
        }
        if(!/\d/.test(req.body.password) || /^\d+$/.test(req.body.password)) {
            let err = encodeURIComponent('Passsword Must contain letters and numbers');
            res.redirect('/signup?err=' + err);
            signup = false;
        }
        if(!String(req.body.email).includes('@')) {
            let err = encodeURIComponent('Please Enter Valid Email');
            res.redirect('/signup?err=' + err);
            signup = false;
        }

        if (signup) {
            let query = users.findOne({ user_name: req.body.username });
            query.exec(function(err, user){
                if(err) {
                    console.log(err);
                    res.redirect('/signup');
                }
                else {
                    if(user) {
                        let err = encodeURIComponent('Username Aleady Taken');
                        res.redirect('/signup?err=' + err);
                    }
                    else {
                        users.create({ user_name: req.body.username, password: req.body.password, email: req.body.email, first_name: req.body.f_name, last_name: req.body.l_name });
                        res.redirect('/');
                    }
                }
            });
        }
    }
}

/*
Renders Sign up page
*/
exports.sign_up_page = function(req, res) {
    res.render('signup', { title: 'WeatherMood | Sign Up', err: req.query.err});
}

/*
Renders main home page. If invalid session, redirects to login
*/
exports.home = function(req, res) {
    if(req.session.user) {
        // Need to set up getting and sending weather data from database to home page
        

        res.render('home', { title: 'WeatherMood | Home', user: req.session.user });

        //HUNG
        res.render('days', { title: 'Books', forecast: '' });
    }
    else {
        let err = encodeURIComponent('Session Timed Out');
        res.redirect('/?err=' + err);
    }
}