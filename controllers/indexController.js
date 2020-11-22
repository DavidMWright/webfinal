var users = require('../models/userModel');


exports.home_page = function(req, res, next) {
    if(!req.body.username || !req.body.password) {
        let err = encodeURIComponent('Please Enter Username and Password');
        res.redirect('/?err=' + err);
    }
    else {
        let query = users.find({ username: req.body.username }); 
        query.exec(function(err, qUsers) {
            if(err) {
                console.log(err);
                res.redirect('/');
            }
            else {
                qUsers.forEach(function(user){
                    if(user.password == req.body.password) {
                        res.render('home', { title: 'WeatherMood | Home'});
                    }
                    else {
                        console.log(user.password)
                        let err = encodeURIComponent('Invalid Credentials');
                        res.redirect('/?err=' + err);                    
                    }
                });
                
                console.log(user.password)

                let err = encodeURIComponent('Invalid Credentials');
                res.redirect('/?err=' + err);
            }
        });
    }

}