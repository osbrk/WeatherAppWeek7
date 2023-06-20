let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function showTemperature(response) {
  event.preventDefault();
  let currentTemperature = `${Math.round(response.data.main.temp)}`;
  let currentDegrees = document.querySelector("#current-degrees");
  currentDegrees.innerHTML = `${currentTemperature}`;
  console.log(response);
  let currentDesc = response.data.weather[0].description;
  let currentElement = document.querySelector("#current-desc");
  currentElement.innerHTML = currentDesc;
  let currentHumidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = currentHumidity;
  let currentWind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = currentWind;
}
function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#change-city");
  let currentPlace = `${input.value}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = currentPlace;
  axios
    .get(`${apiUrl}q=${currentPlace}&units=metric&appid=${apiKey}`)
    .then(showTemperature);
}
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = weekdays[now.getDay()];
let currentDay = `${weekday} ${hours}:${minutes}`;
let currentElement = document.querySelector("#current-day");
currentElement.innerHTML = `Weather on ${currentDay}, in `;

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);
