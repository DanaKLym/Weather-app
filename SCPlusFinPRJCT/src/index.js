/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};

weather.paris.name = "Paris";
weather.paris.far = 67.46;


weather.tokyo.name = "Tokyo";
weather.tokyo.far = 63.14;

weather.lisbon.name = "Lisbon";
weather.lisbon.far = 86.36;

weather["san francisco"].name = "San Francisco"
weather["san francisco"].far = 69.62;

weather.oslo.name = "Oslo";
weather.oslo.far = 23;

let enter = prompt("Enter a city");

enter = enter.trim();
enter = enter.toLowerCase();

let outcome = enter.innerHTML;


if (enter === "paris") {
  alert(`It is currently ${Math.round(weather["paris"].temp)}°C (${Math.round(weather["paris"].far)}°F) in ${weather["paris"].name} with a humidity of ${weather["paris"].humidity}%`)
} else {
  if (enter === "tokyo") { alert(`It is currently ${Math.round(weather["tokyo"].temp)}°C (${Math.round(weather["tokyo"].far)}°F) in ${weather["tokyo"].name} with a humidity of ${weather["tokyo"].humidity}%`) }
  else {
    if (enter === "lisbon") { alert(`It is currently ${Math.round(weather["lisbon"].temp)}°C (${Math.round(weather["lisbon"].far)}°F) in ${weather["lisbon"].name} with a humidity of ${weather["lisbon"].humidity}%`) }
    else {
      if (enter === "san francisco") { alert(`It is currently ${Math.round(weather["san francisco"].temp)}°C (${Math.round(weather["san francisco"].far)}°F) in ${weather["san francisco"].name} with a humidity of ${weather["san francisco"].humidity}%`) }
      else {
        if (enter === "oslo") { alert(`It is currently ${Math.round(weather["oslo"].temp)}°C (${Math.round(weather["oslo"].far)}°F) in ${weather["oslo"].name} with a humidity of ${weather["oslo"].humidity}%`) }
        else { alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${enter}`)}
      }
    }
  }
}*/

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
  document.querySelector(".mainCity").innerHTML = response.data.name;
  document.querySelector(".mainDegrees").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  console.log(response);
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

/*let searchInput = document.querySelector(".search-input");
  let mainCity = document.querySelector("h1.mainCity");
  
  if (searchInput.value) {
  (mainCity.innerHTML = searchInput.value);
  } else {
    alert(`🫣 Oops, looks like you forgot to enter the city`);
  }*/


/*--------------------------------------------------------------------------------------

function displayWeather(response) { 
  let headingCity = document.querySelector("h1.mainCity");
  headingCity.innerHTML = response.data.name;
  let locationTemp = document.querySelector(".mainDegrees");
  locationTemp.innerHTML = Math.round(response.data.main.temp);

}

function showCoordinates(position) { 
  let lat = position.coords.latitude;
  let lon = position.coords.longitute;
  let keyAPI = `39211d1d13139f85371fa9af1af3fc63`;
  let coordsURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${keyAPI}`;
  axios.get(coordsURL).then(displayWeather);
}

function getLocation(event) { 
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCoordinates);
}


let currentLocButton = document.querySelector("#locationButton");
currentLocButton.addEventListener("click", getLocation);

function displayTemperature(response) {
  let mainDegrees = document.querySelector(".mainDegrees");
  mainDegrees.innerHTML = Math.round(response.data.main.temp);
  
  let searchCity = document.querySelector("#searchHere"); 
  searchCity = response.data.name;
}

let findCity = `Lisbon`;
let keyAPI = `39211d1d13139f85371fa9af1af3fc63`;
let units = `metric`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${findCity}&appid=${keyAPI}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);*/
//--------------------------------------------------------------------------------

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
