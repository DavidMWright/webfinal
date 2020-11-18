
let GetLocation = 'city';
let unit = 'imperial';
let weatherID = '9dc9eeb95e5bf155ec332b2150dc17ae';

document.getElementById('searchBtn').addEventListener('click', () => {
    let getCity = document.getElementById('searchData').nodeValue;
    if(getCity) {
        getWeather(getCity);
    }
})

function getWeather(getCity) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${getLocation}={GetCity}&ID=${weatherID}&unit=${unit}`).then(result => {
        return result.json();
    }).then(result => {console.log(result)});
}