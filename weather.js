const temp = document.querySelector(".js-temp");
const weatherIcon = document.querySelector(".js-weatherIcon");
const place = document.querySelector(".js-place");
const API_KEY = "5e2ede8ed107dad505b40530567db49d";
const COORDS = "coords";

function getIconClass(description) {
  // how to get sunset ,sunrise time?
  const date = new Date();
  const hour = date.getHours();
  const night = 0;
  if (hour >= 19 || hour <= 6) {
    const night = 1;
  }
  if (description === "broken clouds" || description === "scattered clouds") {
    return '<i class="fas fa-cloud"></i>';
  } else if (description === "clear sky") {
    if (night === 0) {
      return '<i class="fas fa-sun"></i>';
    }
    return '<i class="fas fa-moon"></i>';
  } else if (description === "shower rain" || description === "rain") {
    return '<i class="fas fa-cloud-showers-heavy"></i>';
  } else if (description === "thunderstorm") {
    return '<i class="fas fa-bolt"></i>';
  } else if (description === "snow") {
    return '<i class="far fa-snowflake"></i>';
  } else if (description === "mist") {
    return '<i class="fas fa-smog"></i>';
  } else {
    if (night === 0) {
      return '<i class="fas fa-cloud-sun"></i>';
    }
    return '<i class="fas fa-cloud-moon"></i>';
  }
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const jsonPlace = json.name;
      const weatherDescription = json.weather[0].description;
      const icon = getIconClass(weatherDescription);
      weatherIcon.innerHTML = icon;
      temp.innerText = `${Math.round(temperature)}°`;
      place.innerText = jsonPlace;
    });
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("cant access geo loaction");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
