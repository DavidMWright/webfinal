#! /usr/bin/env node

console.log('This script populates test data into database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var User = require('./models/userModel');
var Mood = require('./models/mood');
var Weather = require('./models/weather');
var WeatherType = require('./models/weatherType');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var moods = []
var weathers = []
var weatherTypes = []

function userCreate(first_name, last_name, user_name, password, email, cb) {
  userdetail = {
        first_name:first_name, 
        last_name: last_name,
        user_name: user_name,
        password: password,
        email: email
    }
  
  var user = new User(userdetail);
       
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New User: ' + user);
    users.push(user)
    cb(null, user)
  }  );
}

function weatherTypeCreate(name, cb) {
  var weatherType = new WeatherType({ w_type: name });
       
  weatherType.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New WeatherType: ' + weatherType);
    weatherTypes.push(weatherType)
    cb(null, weatherType);
  }   );
}

function weatherCreate(temp, type, cb) {
  weatherdetail = { 
    tempurature: temp,
    _weather_type: type
  }
    
  var weather = new Weather(weatherdetail);    
  weather.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Weather: ' + weather);
    weathers.push(weather)
    cb(null, weather)
  }  );
}


function moodCreate(percent, user, weather, cb) {
  mooddetail = { 
    mood_percent: percent,
    _user: user,
    _weahter: weather
  }
    
  var mood = new Mood(mooddetail);    
  mood.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Mood: ' + mood);
    moods.push(mood)
    cb(null, mood)
  });
}


function createUsers(cb) {
    async.parallel([
        function(callback) {
            userCreate('David', 'Wright', 'davidwright', 'iamcool', 'david@gmail.com', callback);
        },
        function(callback) {
            userCreate('test', 'mctest', 'tester', 'root', 'test@mail.com', callback);
        }
        ],
        // optional callback
        cb);
}

function createWeatherTypes(cb) {
    async.parallel([
        function(callback) {
            weatherTypeCreate('Sunny', callback);
        },
        function(callback) {
            weatherTypeCreate('Cloudy', callback);
        },
        function(callback) {
            weatherTypeCreate('Raining', callback);
        },
        function(callback) {
            weatherTypeCreate('Snowing', callback);
        },
        function(callback) {
            weatherTypeCreate('Overcast', callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createUsers,
    createWeatherTypes
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('It Be Done');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




