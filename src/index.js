
// date and time

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

let currentMonth = months[now.getMonth()];
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let formattedDateTime = `${currentDay} ${currentMonth} ${currentDate}, ${currentHour}:${currentMinutes}`;
let dayTime = document.querySelector("#day-time");
dayTime.innerHTML = `${formattedDateTime}`;


//change City with Searchbar

function changeCity(event) {
  event.preventDefault();
  let heading = document.querySelector("#city-heading");
  let cityInput = document.querySelector("#city-input");
  heading.innerHTML = `${cityInput.value}`;
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("#enter-city-input");
searchForm.addEventListener("submit", changeCity);

// current temperature

function getTemp(response) {
  let mainTemperature = document.querySelector("#main-temp");
  let temperature = Math.round(response.data.main.temp);
  let heading = document.querySelector("#city-heading");
  let cityName = `${response.data.name}`;
  let descriptionElement = document.querySelector("#description");
  let description = `${response.data.weather[0].description}`
  let windspeed = document.querySelector("#windspeed");
  let theWindspeed = `${response.data.wind.speed}`
  heading.innerHTML = `${cityName}`;
  mainTemperature.innerHTML = `${temperature}°F`;
  descriptionElement.innerHTML = `${description}`;
  windspeed.innerHTML = `windspeed: ${theWindspeed}`;
  fahrenheightTemperature = response.data.main.temp;
}

function retrieveTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiKey = `bc2204f2285bd1d52f09483093f391ff`;
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
}

navigator.geolocation.getCurrentPosition(retrieveTemp);

function showCelsius(event){
  event.preventDefault();
  let celsiusTemperature = (fahrenheightTemperature - 32) * 5/9;
  let temperatureElement = document.querySelector("#main-temp");
  let celsius = Math.round(celsiusTemperature);
  temperatureElement.innerHTML = `${celsius}°C`;
}

let changeToCelsius = document.querySelector("#celsius-temp")
changeToCelsius.addEventListener("click", showCelsius)

function showFahrenheight(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  let fahrenheight = Math.round(fahrenheightTemperature);
  temperatureElement.innerHTML = `${fahrenheight}°F`;
}

let changeToFahrenheight = document.querySelector("#fahrenheight-temp")
changeToFahrenheight.addEventListener("click", showFahrenheight)

let fahrenheightTemperature = null;

//current location button

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveTemp);
}

function searchCity(city) {
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiKey = `bc2204f2285bd1d52f09483093f391ff`;
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getTemp);
}
