var User = require('../models/userModel');

// Display User details
exports.user_profile = function(req, res) {
    if(req.session.user) {
        res.render('profile', { title: 'Weather Moods | Profile', user: req.session.user });
    }
    else
    {
        let err = encodeURIComponent('Session Timed Out');
        res.redirect('../?err=' + err);
    }
}

exports.user_edit_page = function(req, res) {
    if(req.session.user) {
        res.render('edit', { title: 'Weather Moods | Edit Profile', user: req.session.user });
    }
    else
    {
        let err = encodeURIComponent('Session Timed Out');
        res.redirect('../?err=' + err);
    }
}

exports.user_edit = function(req, res) {
    if(req.session.user) {                
        if(req.body.username) {
            let query = User.findOne({ user_name: req.body.username });
            query.exec(function(err, user) {
                if(err) {
                    console.log(err);
                    res.redirect('/edit');
                }
                else {
                    if(user) {
                        let err = encodeURIComponent('Username Aleady Taken');
                        res.redirect('/edit?err=' + err);
                    }
                    else {
                        User.findOne({_id: req.session.user._id}, function(err, result) {
                            result.user_name = req.body.username;

                            result.save(function(err){
                                if(err){
                                    console.log(err);
                                }
                            });
                        });
                    }
                }
            });
        }
        if(req.body.password && req.body.confirm) {
            if(req.body.password == req.body.confirm) {
                if(req.body.password.length >= 8) {
                    User.findOne({_id: req.session.user._id}, function(err, result) {
                        result.password = req.body.password;

                        result.save(function(err){
                            if(err){
                                console.log(err);
                            }
                        });
                    });
                }
                else {
                    let err = encodeURIComponent('Password < 8 characters');
                    res.redirect('/edit?err=' + err);
                }
            }
            else {
                let err = encodeURIComponent('Passwords do not match');
                res.redirect('/edit?err=' + err);
            }
        }
        if(req.body.f_name) {
            User.findOne({_id: req.session.user._id}, function(err, result) {
                result.first_name = req.body.f_name;

                result.save(function(err){
                    if(err){
                        console.log(err);
                    }
                });
            });
        }
        if(req.body.l_name) {
            User.findOne({_id: req.session.user._id}, function(err, result) {
                result.last_name = req.body.l_name;

                result.save(function(err){
                    if(err){
                        console.log(err);
                    }
                });
            });
        }
        if(req.body.email) {
            if(!String(req.body.email).includes('@')) {
                let err = encodeURIComponent('Please Enter Valid Email');
                res.redirect('/edit?err=' + err);
            }
            else {
                User.findOne({_id: req.session.user._id}, function(err, result) {
                    result.email = req.body.email;

                    result.save(function(err){
                        if(err){
                            console.log(err);
                        }
                    });
                });
            }
        }

        let query = User.findOne({ _id: req.session.user._id }); 
        query.exec(function(err, user) {
            if(err) {
                console.log(err);
            }
            else {
                req.session.user = null;
                req.session.user = user;
                res.render('profile', { title: 'Weather Moods | Profile', user: req.session.user })
            }
        });
    }
    else
    {
        let err = encodeURIComponent('Session Timed Out');
        res.redirect('../?err=' + err);
    }
}