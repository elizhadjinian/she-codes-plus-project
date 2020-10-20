
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

let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let formattedDateTime = `${currentDay} ${currentHour}:${currentMinutes}`;
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
  let heading = document.querySelector("#city-heading");
  let cityName = `${response.data.name}`;
  heading.innerHTML = `${cityName}`;
  let temperature = Math.round(response.data.main.temp);
  mainTemperature.innerHTML = `${temperature}°F`;
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
