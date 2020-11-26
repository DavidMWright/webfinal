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
        res.redirect('/?err=' + err);
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
                            req.session.user.user_name = req.body.username;
                            req.session.save(function(err){});

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
                if(req.body.password.length >= 8 && /\d/.test(req.body.password)) {
                    User.findOne({_id: req.session.user._id}, function(err, result) {
                        result.password = req.body.password;

                        result.save(function(err){
                            if(err){
                                console.log(err);
                            }
                        });
                    });
                }
                else if (req.body.password.length >= 8){
                    let err = encodeURIComponent('Password < 8 characters');
                    res.redirect('/edit?err=' + err);
                }
                else
                {
                    let err = encodeURIComponent('Passsword Must contain letters and numbers');
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
                req.session.user.first_name = req.body.f_name;
                req.session.save(function(err){});

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
                req.session.user.last_name = req.body.l_name;
                req.session.save(function(err){});

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
                    req.session.user.email = req.body.email;
                    req.session.save(function(err){});

                    result.save(function(err){
                        if(err){
                            console.log(err);
                        }
                    });
                });
            }
        }

        res.redirect('/home');
    }
    else
    {
        let err = encodeURIComponent('Session Timed Out');
        res.redirect('/?err=' + err);
    }
}