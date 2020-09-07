const temp = document.querySelector(".js-temp");
const weatherIcon = document.querySelector(".js-weatherIcon");
const place = document.querySelector(".js-place");
const API_KEY = "5e2ede8ed107dad505b40530567db49d";
const COORDS = "coords";

function getIconClass(description, main) {
  // how to get sunset ,sunrise time?
  const date = new Date();
  const hour = date.getHours();
  let night = 0;
  if (hour >= 19 || hour <= 6) {
    night = 1;
  }
  if (main === "Thunderstorm") {
    return '<i class="fas fa-bolt"></i>';
  } else if (main === "Drizzle") {
    return '<i class="fas fa-cloud-showers-heavy"></i>';
  } else if (main === "Rain") {
    if (description === "light rain" || description === "moderate rain") {
      if (night === 1) {
        return '<i class="fas fa-cloud-moon-rain"></i>';
      } else {
        return '<i class="fas fa-cloud-sun-rain"></i>';
      }
    }
  } else if (main === "Snow") {
    return '<i class="far fa-snowflake"></i>';
  } else if (main === "Clear") {
    if (night === 1) {
      return '<i class="fas fa-moon"></i>';
    } else {
      return '<i class="fas fa-sun"></i>';
    }
  } else if (main === "Clouds") {
    if (description === "few clouds") {
      if (night === 1) {
        return '<i class="fas fa-cloud-moon"></i>';
      } else {
        return '<i class="fas fa-cloud-sun"></i>';
      }
    } else {
      return '<i class="fas fa-cloud"></i>';
    }
  } else {
    return '<i class="fas fa-smog"></i>';
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
      const weatherMain = json.weather[0].main;
      const icon = getIconClass(weatherDescription, weatherMain);
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
