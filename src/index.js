// Global variables
let dateTime = document.querySelector(".dateTime");
dateTime.innerHTML = setDateTime();

let city = document.querySelector(".search");
city.addEventListener("submit", setCity);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", revealLocation);

let units = "metric";
let coords = null;
let initialCelcius = null;
let initialWindSpeed = null;

let mainTemperature = document.querySelector("span.mainDegrees");
let windSpeedConversion = document.querySelector("#wind-conversion")
let fahrenheitSymbol = document.querySelector("#fahrenheit");
fahrenheitSymbol.addEventListener("click", convertFahrenheit);

let celciusSymbol = document.querySelector("#celcius");
celciusSymbol.addEventListener("click", convertCelcius);

// sets current date and time from the user's device;
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

// sets the short form of days on forecast table instead of numerical type
function setForecastDays(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let day = forecastDate.getDay();
  let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return forecastDays[day];
}

// displays dynamic forecast info for 5 days using API daily info
function displayForescast(response) {

  let forecastInfo = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  initialMin = Math.round(response.data.daily[0].temp.min);
  initialMax = Math.round(response.data.daily[0].temp.max)
  
  forecastInfo.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML = forecastHTML + `<div class="col forecastCard">
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
              <span class="boldTemperatureDigits tempValueMax">${initialMax}</span>°/<span class="tempValueMin">${initialMin}</span>°
            </div>
          </div>`;
    }
  })

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// gets the city by calling for it with longitude and latitude info from API
function getForecast(coordinates, units) {
  let apiKey = "39211d1d13139f85371fa9af1af3fc63";
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  
  axios.get(forecastUrl).then(displayForescast);
}

// displays the information about searched city
function displayWeather(response) {
  console.log(response)
  document.querySelector(".mainCity").innerHTML = response.data.name;
  document.querySelector(".mainDegrees").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  initialWindSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = initialWindSpeed;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;

  initialCelcius = Math.round(response.data.main.temp);
  let mainIconEl = document.querySelector("#mainImageElement");
  let mainIconElAPI = response.data.weather[0].icon;

  mainIconEl.setAttribute("src", `../media/${mainIconElAPI}.png`);

  coords = response.data.coord;
  getForecast(coords, "metric");
}

//error message if city name is mistyped
function error(err) {
  let searchCity = document.querySelector("#city-search").value;
  if (err) {
    alert(`🤖 Wow, seems like evil bots are trying to interfere
Check the spelling of "${searchCity.charAt(0).toUpperCase() + searchCity.slice(1)}" and type it one more time`)
  }
}

// search engine output
function setDefaultCity(searchCity) {
  let apiKey = "39211d1d13139f85371fa9af1af3fc63";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(displayWeather).catch(error);
}

// search engine 
function setCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-search").value;

  if (searchCity.length <= 0) {
    alert(`👾 Oops, looks like aliens are messing up with you, please, type the city name again`);
  } else {
    setDefaultCity(searchCity)
  };
}

// defines the current location of the user
function searchCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "39211d1d13139f85371fa9af1af3fc63";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`

  axios.get(apiUrl).then(displayWeather);
}

function revealLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentPosition);
}

// Temperature unit conversion
function convertFahrenheit(event) {
  event.preventDefault();

  let fahrenheitTemperature = Math.round(initialCelcius * 9 / 5) + 32;
  mainTemperature.innerHTML = fahrenheitTemperature;
  let windSpeedtoFahr = Math.round(initialWindSpeed * 2.237);
  document.querySelector("#wind").innerHTML = windSpeedtoFahr;
  windSpeedConversion.innerHTML = ` mph`;

  fahrenheitSymbol.classList.add("active");
  celciusSymbol.classList.remove("active");
  fahrenheitSymbol.classList.remove("to-be-chosen");
  celciusSymbol.classList.add("to-be-chosen");
  
  getForecast(coords, "imperial");
}

function convertCelcius(event) {
  event.preventDefault();
  mainTemperature.innerHTML = initialCelcius;
  document.querySelector("#wind").innerHTML = initialWindSpeed;
  windSpeedConversion.innerHTML = ` m/s`;

  celciusSymbol.classList.add("active");
  fahrenheitSymbol.classList.remove("active");
  celciusSymbol.classList.remove("to-be-chosen");
  fahrenheitSymbol.classList.add("to-be-chosen");

 getForecast(coords, "metric");
}

setDefaultCity("Kyiv");