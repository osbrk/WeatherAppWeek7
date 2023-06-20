let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function showTemperature(response) {
  event.preventDefault();
  let currentTemperature = `${Math.round(response.data.main.temp)}`;
  currentDegrees.innerHTML = `${currentTemperature}`;
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
