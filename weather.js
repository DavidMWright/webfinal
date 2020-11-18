
var searchLocation = 'zip';
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
    document.getElementById("currentTemp").innerHTML = Math.round(serverResult.main.temp);
}