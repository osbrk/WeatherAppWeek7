let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#btn-current");
button.addEventListener("click", getCurrentPosition);

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

let currently = document.querySelector("#current-day");
currently.innerHTML = `Weather on ${currentDay}, in `;
function showTemperature(response) {
  event.preventDefault();
  let currentTemperature = `${Math.round(response.data.main.temp)}`;
  let currentDegrees = document.querySelector("#current-degrees");
  currentDegrees.innerHTML = `${currentTemperature}`;
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
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);
function showPosition(position) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = "Your location";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(showTemperature);
}