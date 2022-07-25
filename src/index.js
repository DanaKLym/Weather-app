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

function setForecastDays(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let day = forecastDate.getDay();
  let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return forecastDays[day];
}

function displayForescast(response) {
  console.log(response.data.daily);
  
  let forecastInfo = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
 
  forecastInfo.forEach(function (day, index) { 
    if (index < 5) {
  forecastHTML = forecastHTML + `<div class="col">
            <div class="forecastWeekDays">${setForecastDays(day.dt)}</div>
            <div class="forecastImage">
              <img
                src="media/${day.weather[0].icon}.png"
                alt="sun and clouds"
                width="50px"
                id="firstLowerWeatherIcon"
              />
            </div>
            <div class="temperatureDigits">
              <span class="boldTemperatureDigits">${Math.round(day.temp.max)}°C</span>/${Math.round(day.temp.min)}°C
            </div>
          </div>`;
  }
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates) {
  let apiKey = "39211d1d13139f85371fa9af1af3fc63";
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lat}&appid=${apiKey}&units=metric`;
  
  console.log(forecastUrl);
  axios.get(forecastUrl).then(displayForescast);
}

function displayWeather(response) {
  document.querySelector(".mainCity").innerHTML = response.data.name;
  document.querySelector(".mainDegrees").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;

  initialCelcius = Math.round(response.data.main.temp);

  let mainIconEl = document.querySelector("#mainImageElement");
  let mainIconElAPI = response.data.weather[0].icon;

  mainIconEl.setAttribute("src", `../media/${mainIconElAPI}.png`);

  getForecast(response.data.coord);
  
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


function convertFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round(initialCelcius * 9 / 5) + 32;
  mainTemperature.innerHTML = fahrenheitTemperature;

  fahrenheitSymbol.classList.add("active");
  celciusSymbol.classList.remove("active");
  fahrenheitSymbol.classList.remove("to-be-chosen");
  celciusSymbol.classList.add("to-be-chosen");
}

function convertCelcius(event) {
  event.preventDefault();
  mainTemperature.innerHTML = initialCelcius;

  celciusSymbol.classList.add("active");
  fahrenheitSymbol.classList.remove("active");
  celciusSymbol.classList.remove("to-be-chosen");
  fahrenheitSymbol.classList.add("to-be-chosen");
}

let dateTime = document.querySelector(".dateTime");
dateTime.innerHTML = setDateTime();
  
let city = document.querySelector(".search");
city.addEventListener("submit", setCity);
  
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", revealLocation);  

let mainTemperature = document.querySelector("span.mainDegrees");
let fahrenheitSymbol = document.querySelector("#fahrenheit");
fahrenheitSymbol.addEventListener("click", convertFahrenheit);

let celciusSymbol = document.querySelector("#celcius");
celciusSymbol.addEventListener("click", convertCelcius);

let initialCelcius = null;

setDefaultCity("Kyiv");