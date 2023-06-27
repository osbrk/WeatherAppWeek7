let apiKey = "97f8e93f00107773f88eafd933ce86b7";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function defaultCity() {
  let currentPlace = "Marbella";
  axios
    .get(`${apiUrl}q=${currentPlace}&units=metric&appid=${apiKey}`)
    .then(showTemperature);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img
              src="images/${forecastDay.weather[0].icon}.png"
              class="weather-forecast-image"
              alt=""
              width="50px"
            /><br />
            <span class="weather-forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )}º</span>&nbsp;
            <span class="weather-forecast-temp-min">${Math.round(
              forecastDay.temp.min
            )}º</span>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
  console.log(apiURL);
}

function showTemperature(response) {
  event.preventDefault();
  let currentTemperature = `${Math.round(response.data.main.temp)}`;
  let currentElement = document.querySelector("#current-desc");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let backgroundElement = document.querySelector("#background-video");
  let currentDesc = response.data.weather[0].description;
  let currentHumidity = response.data.main.humidity;
  let currentWind = Math.round(response.data.wind.speed);
  currentDegrees.innerHTML = `${currentTemperature}`;
  currentElement.innerHTML = currentDesc;
  humidityElement.innerHTML = currentHumidity;
  windElement.innerHTML = currentWind;
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  backgroundElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.mp4`
  );
  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#change-city");
  currentPlace = `${input.value}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = currentPlace;
  form.reset();
  celcius.setAttribute("class", "active");
  fahrenheit.setAttribute("class", "inactive");
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
let currentDegrees = document.querySelector("#current-degrees");
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);
defaultCity();
