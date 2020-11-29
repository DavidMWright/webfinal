function getGeoLocation(city, lat, lon, zipCode, unit, weatherID, searchLocation, geoID, part) { 
    var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}; 
  
    function success(position) { 
        var location = position.coords; 
        var localLat = location.latitude.toString(); 
        var long = location.longitude.toString(); 
        var coordinates = [localLat, long]; 
        console.log(`Latitude: ${localLat}, Longitude: ${long}`); 
        lon = long;
        lat = localLat;
        getCity(coordinates, city, lat, lon, zipCode, unit, weatherID, searchLocation, geoID, part); 
        
        return; 
    } 
  
    function failure(err) { 
        console.warn(`${err.message}`); 
    } 
  
    navigator.geolocation.getCurrentPosition(success, failure, options); 
} 

function getCity(coordinates, city, lat, lon, zipCode, unit, weatherID, searchLocation, geoID, part) { 
    var serverRequest = new XMLHttpRequest(); 
    var localLat = coordinates[0]; 
    var long = coordinates[1]; 

    serverRequest.open('GET', `https://us1.locationiq.com/v1/reverse.php?key=${geoID}&lat=` + 
    localLat + "&lon=" + long + "&format=json", true); 
    console.log(serverRequest);
    serverRequest.send(); 
    serverRequest.onreadystatechange = processRequest; 
  
    function processRequest() { 
        if (serverRequest.readyState == 4 && serverRequest.status == 200) { 
            var serverResponse = JSON.parse(serverRequest.responseText); 
            var serverCity = serverResponse.address.city; 
            zipCode = serverResponse.address.postcode;
            console.log(serverResponse.address.postcode); 
            city = serverCity;
            getWeather(city, lat, lon, unit, weatherID, part);
            return; 
        } 
    } 
} 

function init(city, lat, lon, zipCode) {
    var searchLocation = 'q';
    var unit = 'imperial';
    var weatherID = '108e39011b5fb4c189360456ae96f6d5';
    var geoID = 'pk.80af763b520862b52d842b99f130e03d';
    var city = '';
    var part = 'alerts';
    var lon = '';
    var lat = '';
    var zipCode = '';
    getGeoLocation(city, lat, lon, zipCode, unit, weatherID, searchLocation, geoID, part);
}

function getWeather(city, lat, lon, unit, weatherID, part) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=${part}&appid=${weatherID}`).then(result => {
        return result.json();
    }).then(result => {
        displayInfo(result, city);
    })
}

function displayInfo(serverResult, city) {
    //
    let weatherDescriptionElement = document.getElementById('weatherDescriptionElement');
    let temperatureElement = document.getElementById('currentTemp');
    let dailyElement = document.getElementsByClassName('weekItem')

    //SET CURRENT LOCATION
    let cityElement = document.getElementById('currentLocation');
    cityElement.innerText = city.charAt(0).toUpperCase() + city.slice(1);
    
    let weatherIconElement = document.getElementById('documentIconElement');
    let zipCodeElement = document.getElementById('zip');
    let weatherDescriptionResult = serverResult.current.weather[0].description;
    

    weatherIconElement.src = 'http://openweathermap.org/img/w/' + serverResult.current.weather[0].icon + '.png';
    weatherDescriptionElement.innerText = weatherDescriptionResult.charAt(0).toUpperCase() + weatherDescriptionResult.slice(1);
    temperatureElement.innerText = Math.floor(serverResult.current.temp) + String.fromCharCode(176);

    let div = document.getElementsByClassName('weekContainer')[0];
    //get label order based on current day of the week
    let days=['M', 'Tu', 'W', 'Th', 'F', 'Sat', 'Sun'];
    let orderedDays = days.slice(new Date().getDay());
    days.length = new Date().getDay();
    
    orderedDays.push(...days);
    console.log(orderedDays);
    //create list of days
    for (let i = 0; i < 7; i++) {
        let day = document.createElement("div");
        let dayHeader = document.createElement("h1");
        let dayContent = document.createElement("div");
        let image = document.createElement("img");
        let description = document.createElement("p");
        let temperature = document.createElement("h2");

        day.classList.add("weekItem");
        //add header to day element
        dayHeader.innerHTML = orderedDays[i];
        day.appendChild(dayHeader);
        //add the icon and the temperature to the week item
        dayContent.classList.add("weekItemContent");
        //add image
        image.src = 'http://openweathermap.org/img/w/' + serverResult.daily[i].weather[0].icon + '.png'
        dayContent.appendChild(image);
        //add description and temperature
        description.innerHTML = serverResult.daily[i].weather[0].description;
        temperature.innerHTML = Math.floor(serverResult.daily[i].temp.day) + String.fromCharCode(176);
        dayContent.appendChild(description);
        dayContent.appendChild(temperature);
        
        day.appendChild(dayContent);
        div.appendChild(day);
    }
}

init();