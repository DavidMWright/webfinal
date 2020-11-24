
var searchLocation = 'q';
var unit = 'imperial';
var weatherID = '108e39011b5fb4c189360456ae96f6d5';
var geoID = 'pk.80af763b520862b52d842b99f130e03d';

function getGeoLocation() { 
    var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}; 
  
    function success(position) { 
        var location = position.coords; 
        var lat = location.latitude.toString(); 
        var long = location.longitude.toString(); 
        var coordinates = [lat, long]; 
        console.log(`Latitude: ${lat}, Longitude: ${long}`); 
        getCity(coordinates); 
        return; 
    } 
  
    function failure(err) { 
        console.warn(`${err.message}`); 
    } 
  
    navigator.geolocation.getCurrentPosition(success, failure, options); 
} 

function getCity(coordinates) { 
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
            var city = serverResponse.address.city; 
            console.log(city); 
            return; 
        } 
    } 
} 
  
getGeoLocation(); 


() => {
    let getCity = getGeoLocation();
    if(getCity) {
        getWeather(getCity);
    }
}

function getWeather(getCity) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchLocation}=${getCity}&APPID=${weatherID}&units=${unit}`).then(result => {
        return result.json();
    }).then(result => {
        displayInfo(result);
    })
}

function displayInfo(serverResult) {
    let weatherDescriptionElement = document.getElementById('weatherDescriptionElement');
    let temperatureElement = document.getElementById('currentTemp');
    let cityElement = document.getElementById('cityHeader');
    let weatherIconElement = document.getElementById('documentIconElement');
    let weatherDescriptionResult = serverResult.weather[0].description;

    weatherIconElement.src = 'http://openweathermap.org/img/w/' + serverResult.weather[0].icon + '.png';
    weatherDescriptionElement.innerText = weatherDescriptionResult.charAt(0).toUpperCase() + weatherDescriptionResult.slice(1);
    temperatureElement.innerText = Math.floor(serverResult.main.temp) + String.fromCharCode(176);
}