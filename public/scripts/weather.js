
var searchLocation = 'q';
var unit = 'imperial';
var weatherID = '108e39011b5fb4c189360456ae96f6d5';
var geoID = 'pk.80af763b520862b52d842b99f130e03d';
var city = '';
var part = 'alerts';
var lon = '';
var lat = '';
var zipCode = '';

function getGeoLocation(city, lat, lon, zipCode) { 
    var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}; 
  
    function success(position) { 
        var location = position.coords; 
        var localLat = location.latitude.toString(); 
        var long = location.longitude.toString(); 
        var coordinates = [localLat, long]; 
        console.log(`Latitude: ${localLat}, Longitude: ${long}`); 
        lon = long;
        lat = localLat;
        getCity(coordinates, city, lat, lon, zipCode); 
        
        return; 
    } 
  
    function failure(err) { 
        console.warn(`${err.message}`); 
    } 
  
    navigator.geolocation.getCurrentPosition(success, failure, options); 
} 

function getCity(coordinates, city, lat, lon, zipCode) { 
    var serverRequest = new XMLHttpRequest(); 
    var localLat = coordinates[0]; 
    var long = coordinates[1]; 

    serverRequest.open('GET', `https://us1.locationiq.com/v1/reverse.php?key=${geoID}&lat=` + 
    localLat + "&lon=" + long + "&format=json", true); 
    console.log(serverRequest);
    serverRequest.send(); 
    serverRequest.onreadystatechange = processRequest; 
    serverRequest.addEventListener("readystatechange", processRequest, false); 
  
    function processRequest() { 
        if (serverRequest.readyState == 4 && serverRequest.status == 200) { 
            var serverResponse = JSON.parse(serverRequest.responseText); 
            var serverCity = serverResponse.address.city; 
            zipCode = serverResponse.address.postcode;
            console.log(serverResponse.address.postcode); 
            console.log(serverResponse); 
            city = serverCity;
            getWeather(city, lat, lon);
            return; 
        } 
    } 
} 

function init(city, lat, lon, zipCode) {
    getGeoLocation(city, lat, lon, zipCode);
}

function getWeather(city, lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=${part}&appid=${weatherID}`).then(result => {
        return result.json();
    }).then(result => {
        console.log(result);
        displayInfo(result);
    })
}

function displayInfo(serverResult) {
    let weatherDescriptionElement = document.getElementById('weatherDescriptionElement');
    let temperatureElement = document.getElementById('currentTemp');
    let cityElement = document.getElementById('cityHeader');
    let weatherIconElement = document.getElementById('documentIconElement');
    let zipCodeElement = document.getElementById('zip');
    let weatherDescriptionResult = serverResult.current.weather[0].description;

    weatherIconElement.src = 'http://openweathermap.org/img/w/' + serverResult.current.weather[0].icon + '.png';
    weatherDescriptionElement.innerText = weatherDescriptionResult.charAt(0).toUpperCase() + weatherDescriptionResult.slice(1);
    temperatureElement.innerText = Math.floor(serverResult.current.temp) + String.fromCharCode(176);
    //zipCodeElement.innerText = zipCode;
    console.log(serverResult);
}


init();