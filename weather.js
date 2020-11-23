
var searchLocation = 'q';
var unit = 'imperial';
var weatherID = '108e39011b5fb4c189360456ae96f6d5';

document.getElementById('searchBtn').addEventListener('click', () => {
    let getCity = document.getElementById('searchData').value;
    if(getCity) {
        getWeather(getCity);
    }
})

function getWeather(getCity) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchLocation}=${getCity}&APPID=${weatherID}&units=${unit}`).then(result => {
        return result.json();
    }).then(result => {
        displayInfo(result);
    })
}

function displayInfo(serverResult) {
    
    switch(serverResult.weather[0].main) {
        case 'Clear':
        break;
        case 'Rain':
        break;
        case 'Clouds':
        break;
        case 'Drizzle':
        break;
        case 'Mist':
        break;
        case 'Thundertorm':
        break;
        case 'Snow':
        break;
    }

    let weatherDescriptionElement = document.getElementById('weatherDescriptionElement');
    let temperatureElement = document.getElementById('currentTemp');
    let cityElement = document.getElementById('cityHeader');
    let weatherIconElement = document.getElementById('documentIconElement');
    let weatherDescriptionResult = serverResult.weather[0].description;

    weatherIconElement.src = 'http://openweathermap.org/img/w/' + serverResult.weather[0].icon + '.png';
    weatherDescriptionElement.innerText = weatherDescriptionResult.charAt(0).toUpperCase() + weatherDescriptionResult.slice(1);
    temperatureElement.innerText = Math.floor(serverResult.main.temp) + String.fromCharCode(176);
}