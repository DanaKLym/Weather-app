function setDateTime() {
  let date = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return (`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, ${hours}:${minutes}`);
}

let dateTime = document.querySelector(".dateTime");
dateTime.innerHTML = setDateTime();

function displayWeather(response) { 
  console.log(response);
  
  document.querySelector(".mainCity").innerHTML = response.data.name;
  document.querySelector(".mainDegrees").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
 
  let mainIconEl = document.querySelector("#mainImageElement");
  let mainIconElValue = response.data.weather[0].icon;
  mainIconEl.setAttribute("src", `http://openweathermap.org/img/wn/${mainIconElValue}@2x.png`)

}

function setDefaultCity(searchCity) { 
  let apiKey = "39211d1d13139f85371fa9af1af3fc63";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function setCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-search").value;
  setDefaultCity(searchCity);
}

function searchCurrentPosition(position) { 
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "39211d1d13139f85371fa9af1af3fc63";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  console.log(apiUrl);
   axios.get(apiUrl).then(displayWeather);
}

function revealLocation(event) { 
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentPosition);
}

let city = document.querySelector(".search");
city.addEventListener("submit", setCity);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", revealLocation);

setDefaultCity("Kyiv");

function convertFahrenheit() {
  let fahrenheitTemperature = Math.round((mainTemperature.textContent * 9 / 5) + 32);

  return (mainTemperature.innerHTML = fahrenheitTemperature);

}

let mainTemperature = document.querySelector("span.mainDegrees");
let fahrenheitSymbol = document.querySelector("a#fahrenheit");
fahrenheitSymbol.addEventListener("click", convertFahrenheit);


function convertCelcius() {
  let celciusTemperature = Math.round((mainTemperature.textContent - 32) * 5 / 9);
  return (mainTemperature.innerHTML = celciusTemperature);
}


let celciusSymbol = document.querySelector("a#celcius");
celciusSymbol.addEventListener("click", convertCelcius);
