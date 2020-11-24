
var searchLocation = 'q';
var unit = 'imperial';
var weatherID = '108e39011b5fb4c189360456ae96f6d5';
var geoID = 'pk.80af763b520862b52d842b99f130e03d';
var city = '';

function getGeoLocation(city) { 
    var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}; 
  
    function success(position) { 
        var location = position.coords; 
        var lat = location.latitude.toString(); 
        var long = location.longitude.toString(); 
        var coordinates = [lat, long]; 
        console.log(`Latitude: ${lat}, Longitude: ${long}`); 
        getCity(coordinates, city); 
        return; 
    } 
  
    function failure(err) { 
        console.warn(`${err.message}`); 
    } 
  
    navigator.geolocation.getCurrentPosition(success, failure, options); 
} 

function getCity(coordinates, city) { 
    var serverRequest = new XMLHttpRequest(); 
    var lat = coordinates[0]; 
    var long = coordinates[1]; 

    serverRequest.open('GET', `https://us1.locationiq.com/v1/reverse.php?key=${geoID}&lat=` + 
    lat + "&lon=" + long + "&format=json", true); 
    serverRequest.send(); 
    serverRequest.onreadystatechange = processRequest; 
    serverRequest.addEventListener("readystatechange", processRequest, false); 
  
    function processRequest(e) { 
        if (serverRequest.readyState == 4 && serverRequest.status == 200) { 
            var serverResponse = JSON.parse(serverRequest.responseText); 
            var serverCity = serverResponse.address.city; 
            console.log(serverCity); 
            city = serverCity;
            getWeather(city);
            return; 
        } 
    } 
} 

function init(city) {
    getGeoLocation(city);
        
    
}

function getWeather(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchLocation}=${city}&APPID=${weatherID}&units=${unit}`).then(result => {
        return result.json();
    }).then(result => {
        displayInfo(result);
    })
}

function displayInfo(serverResult) {
    let weatherDescriptionElement = document.getElementsByClassName('weatherDescriptionElement');
    let temperatureElement = document.getElementsByClassName('currentTemp');
    let cityElement = document.getElementsByClassName('cityHeader');
    let weatherIconElement = document.getElementsByClassName('documentIconElement');
    let weatherDescriptionResult = serverResult.weather[0].description;

    weatherIconElement.src = `<img src='http://openweathermap.org/img/w/${serverResult.weather[0].icon}.png'`;
    weatherDescriptionElement.innerText = weatherDescriptionResult.charAt(0).toUpperCase() + weatherDescriptionResult.slice(1);
    temperatureElement = Math.floor(serverResult.main.temp) + String.fromCharCode(176);
    console.log(serverResult);
}


init();