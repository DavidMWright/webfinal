var users = require('../models/userModel');
var Mood = require('../models/mood');
var fetch = require('node-fetch');


const getWeather = async () => {
    let unit = 'imperial';
    let weatherID = '108e39011b5fb4c189360456ae96f6d5';
    let lat = '45.5270';
    let lon = '-123.1211';
    let part = 'alerts,hourly,minutely,current';
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=' + unit + '&exclude=' + part + '&appid=' + weatherID;    

    const res = await fetch(url);
    const json = await res.json();

    return json;
}

/*
Renders sign in page
*/
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
        query.exec(async function(err, user) {
            if(err) {
                console.log(err);
                res.redirect('/');
            }
            else {
                if(user) {
                    if(user.password == req.body.password) {
                        req.session.user = user;

                        let weather = await getWeather();
                        let temp = String(Math.floor(weather.daily[0].temp.day));
                        let desc = String(weather.daily[0].weather[0].description);
                
                        req.session.weather = { temp: temp, desc: desc };

                        let date = new Date();
                        let query = Mood.findOne({ date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(), _user: req.session.user._id });
                        query.exec(function(err, result) {
                            if(err) {
                                console.log(err);
                                res.redirect('/')
                            }
                            else if(result) {
                                res.redirect('/home');
                            }
                            else {
                                res.redirect('/input');
                            }
                        });
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
exports.home = async function(req, res) {
    if(req.session.user) {
        // Get the weather data for the week
        let weather = await getWeather();
        let weatherJson = { desc: [], temp: [] };

        for(let i = 0; i < 7; i++) {
            weatherJson.desc.push(weather.daily[i].weather[0].description);
            weatherJson.temp.push(weather.daily[i].temp.day);
        }
        
        // Get mood for today
        var mood;
        let date = new Date();
        let query = Mood.findOne({ date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(), _user: req.session.user._id });
        query.exec(function(err, result) {
            if(err) {
                console.log(err);
            }
            else if (result) {
                // Get Mood averages
                let moods = Mood.find({ _user: req.session.user._id });

                res.render('home', {    title: 'WeatherMood | Home', 
                                        user: req.session.user, 
                                        weather: weatherJson,
                                        mood: result.mood_percent
                });
            }
        });
    }
    else {
        let err = encodeURIComponent('Session Timed Out');
        res.redirect('/?err=' + err);
    }
}

/*
Renders user input page
*/
exports.input_page = function(req, res) {
    if(req.session.user) {
        res.render('input', {   title: 'WeatherMood | Input your mood', 
                                user: req.session.user,
                                weather: req.session.weather,
                                input: 'inputpage'
                            }
        );
    }
    else {
        let err = encodeURIComponent('Session Timed Out');
        res.redirect('/?err=' + err);
    }
}

/*
Inserts User input into database and redirects to home
*/
exports.input = function(req, res) {
    if(req.session.user) {
        let date = new Date();
        let insert = { 
            mood_percent: req.body.mood, 
            date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
            _user: req.session.user._id,
            tempurature: req.session.weather.temp,
            weather_type: req.session.weather.desc
        };

        Mood.create(insert, function(err, result) {
            if(err){
                console.log(err);
            }
        });

        res.redirect('/home')
    }
    else {
        let err = encodeURIComponent('Session Timed Out');
        res.redirect('/?err=' + err);
    }

}