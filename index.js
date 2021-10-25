/* let weather = {
    "paris": {
        temp: 19.7,
        humidity: 80
    },
    "tokyo": {
        temp: 17.3,
        humidity: 50
    },
    "lisbon": {
        temp: 17.3,
        humidity: 20
    },
    "san francisco": {
        temp: 20.9,
        humidity: 100
    },
    "moscow": {
        temp: -5,
        humidity: 20
    }
}; */

/*let city = prompt("Enter a city?");
city = city.toLowerCase();
city = city.trim();
if(weather[city] !== undefined){
    let temperature = weather[city].temp;
    let humidity = weather[city].humidity;
    let celsiusTemperature = Math.round(temperature);
    let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);

    alert(
        `It is currently ${celsiusTemperature}℃ (${fahrenheitTemperature} F) in ${city} with a humidity of ${humidity}`
    );
}else{
    alert(
        `Sorry we don't know the weather for this city, try going to https://www.google.com?=weather+${city}`
    );
}*/

let now = new Date();
let h2 = document.querySelector("#date");
let months =["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
if(hours < 10){
    hours = `0${hours}`;
}
let minutes = now.getMinutes();
if(minutes < 10){
    minutes = `0${minutes}`;
}
h2.innerHTML = `${month} ${date} ${hours}:${minutes}`;


function getCurrentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}


function searchLocation(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = "4862096a12087cffaa0f38c4b3cddb16";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayWeather);
}


function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "4862096a12087cffaa0f38c4b3cddb16";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    //console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}
function displayWeather(response){
    //console.log(response.data);
    document.querySelector("#place").innerHTML = response.data.name;celsiusTemperature = response.data.main.temp;
    document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
    document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#weather-adjective").innerHTML = response.data.weather[0].main;
    document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#weather-icon").setAttribute("alt", `${response.data.weather[0].description}`);


    getForecast(response.data.coord);
}


function displayForecast(response){
    console.log(response.data.daily);
let forecastElement = document.querySelector("#forecast");
let forecastHTML =`<div class="row">`;
let days = ["Mon", "Tue", "Wed"];
days.forEach(function(day){
forecastHTML = forecastHTML + `

<div class="col">
    <div class="weather-forcast-date">${day}</div>
    <div class="icon"><img src="" alt=""></div>
    <span class="max-temperature">20 </span>
    <span class="min-temperature">15</span>
</div>
`;
})
forecastHTML = forecastHTML + `</div>`;

forecastElement.innerHTML = forecastHTML;
//console.log(forecastHTML);
}

function searchCity(city){
    let apiKey = "4862096a12087cffaa0f38c4b3cddb16";
    let units = "metric" 
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    //console.log(apiUrl);
    axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event){
    event.preventDefault();
    /* let cityInput = document.querySelector("#city-input");
    
    console.log(cityInput.value);
    let h2 = document.querySelector("h2");
    if(cityInput.value){
         h2.innerHTML=`${cityInput.value}`;
    }else{
        h2.innerHTML = null;
        alert("Please type a city");
    } */
 
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}
let form = document.querySelector("#city");
form.addEventListener("submit", handleSubmit);


let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Tokyo");



let celsiusTemperaure = null;

function displayFahrenheit(event){
    event.preventDefault();
    //when hovering the F, remove the active from celcius
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature =	(celsiusTemperature * 9 / 5) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);  
}


function displayCelciusTemperature(event){
    event.preventDefault();
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

