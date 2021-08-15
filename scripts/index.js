let now = new Date();
let h2 = document.querySelector("h2");
let hour = now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

function formatDate(now) {
  return `${day}, ${hour}:${minutes}`;
}
h2.innerHTML = formatDate(new Date());

//Find city in search field and show it's temperature

function showMainTemp(response) {
  document.querySelector("#cityId").innerHTML = response.data.name;
  document.querySelector("#mainTemp").innerHTML =
    Math.round(response.data.main.temp) + " °C";
  document.querySelector("#minTemp").innerHTML =
    "Min " + Math.round(response.data.main.temp_min) + " °C";
  document.querySelector("#maxTemp").innerHTML =
    "Max " + Math.round(response.data.main.temp_max) + " °C";
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiKey = "4a31229d8c51868f02d6abacf2552431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showMainTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//CURRENT LOCATION API WITH GEOLOCATION
function showTemp(response) {
  console.log();
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let mainTemp = Math.round(response.data.main.temp);
  let mainTempElement = document.querySelector("#mainTemp");
  mainTempElement.innerHTML = `${mainTemp}°C`;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "4a31229d8c51868f02d6abacf2552431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#currentButton");
button.addEventListener("click", getCurrentPosition);

//WORLDTIME API/TIMESTAMP

function showDateTime(response) {
  console.log();
  document.querySelector("#timeDate").innerHTML = response;
}
function localTimeStamp() {
  let timeApiKey = "AIzaSyC9NVnjWPvCtkINAQNwLx6-MuVgHeHX-8M";
  let timeApiUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=${timeApiKey}`;
  axios.get(timeApiUrl).then(showDateTime);
}
