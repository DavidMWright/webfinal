var User = require('../models/userModel');

// Display User details
exports.user_profile = function(req, res) {
    if(req.session.user) {
        res.render('profile', { user: req.session.user });
    }
    else
    {
        let err = encodeURIComponent('Session Timed Out');
        res.redirect('../?err=' + err);
    }
}

exports.user_edit_page = function(req, res) {
    if(req.session.user) {
        res.render('edit', { user: req.session.user });
    }
    else
    {
        let err = encodeURIComponent('Session Timed Out');
        res.redirect('../?err=' + err);
    }
}

exports.user_edit = function(req, res) {
    if(req.session.user) {        
        userDoc = User.findOne({_id: req.session.user._id});
        
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
                        User.update({ _id: req.body._id }, { user_name: req.body.username });
                    }
                }
            });
        }
        if(req.body.password && req.body.confirm) {
            if(req.body.password == req.body.confirm) {
                userDoc.password = req.body.password;
            }
            else {
                let err = encodeURIComponent('Passwords do not match');
                res.redirect('/edit?err=' + err);
            }
        }
        if(req.body.f_name) {
            userDoc.first_name = req.body.f_name;
        }
        if(req.body.l_name) {
            userDoc.last_name = req.body.l_name;
        }
        if(req.body.email) {
            if(String(req.body.email).includes('@')) {
                let err = encodeURIComponent('Please Enter Valid Email');
                res.redirect('/signup?err=' + err);
            }
            else {
                userDoc.email = req.body.email;
            }
        }

        //userDoc.save();

        res.render('edit', { user: req.session.user });
    }
    else
    {
        let err = encodeURIComponent('Session Timed Out');
        res.redirect('../?err=' + err);
    }
}