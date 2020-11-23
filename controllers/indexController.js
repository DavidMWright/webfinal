var users = require('../models/userModel');


exports.home_page = function(req, res, next) {
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