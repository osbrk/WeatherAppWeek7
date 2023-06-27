let apiKey = "97f8e93f00107773f88eafd933ce86b7";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function defaultCity() {
  let currentPlace = "Marbella";
  celcius.setAttribute("class", "active");
  fahrenheit.setAttribute("class", "inactive");
  axios
    .get(`${apiUrl}q=${currentPlace}&units=metric&appid=${apiKey}`)
    .then(showTemperature);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img
              src="images/01d.png"
              class="weather-forecast-image"
              alt=""
              width="50px"
            /><br />
            <span class="weather-forecast-temp-max">26º</span>&nbsp;
            <span class="weather-forecast-temp-min">16º</span>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
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

function changeToF(event) {
  event.preventDefault();
  let cToF = currentDegrees.innerText * 1.8 + 32;
  currentDegrees.innerHTML = Math.round(cToF);
  fahrenheit.setAttribute("class", "active");
  celcius.setAttribute("class", "inactive");
}
function changeToC(event) {
  event.preventDefault();
  let fToC = (currentDegrees.innerText - 32) / 1.8;
  currentDegrees.innerHTML = Math.round(fToC);
  celcius.setAttribute("class", "active");
  fahrenheit.setAttribute("class", "inactive");
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
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToF);
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeToC);
defaultCity();
