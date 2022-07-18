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

  initialCelcius = Math.round(response.data.main.temp);
 
  let mainIconEl = document.querySelector("#mainImageElement");
  let mainIconElAPI = response.data.weather[0].icon;
  
  if (mainIconElAPI === "01d") {
    mainIconEl.setAttribute("src", `../media/01d.png`);
  } else if (mainIconElAPI === "02d") {
    mainIconEl.setAttribute("src", `../media/02d.png`);
  } else if (mainIconElAPI === "03d") {
    mainIconEl.setAttribute("src", `../media/03d.png`);
  } else if (mainIconElAPI === "04d") {
    mainIconEl.setAttribute("src", `../media/04d.png`);
  } else if (mainIconElAPI === "09d") {
    mainIconEl.setAttribute("src", `../media/09d.png`);
  } else if (mainIconElAPI === "10d") {
    mainIconEl.setAttribute("src", `../media/10d.png`);
  } else if (mainIconElAPI === "13d") {
    mainIconEl.setAttribute("src", `../media/13d.png`);
  } else if (mainIconElAPI === "50d") {
    mainIconEl.setAttribute("src", `../media/50d.png`);
  } else if (mainIconElAPI === "01n") {
    mainIconEl.setAttribute("src", `../media/01n.png`);
  } else if (mainIconElAPI === "02n") {
    mainIconEl.setAttribute("src", `../media/02n.png`);
  } else if (mainIconElAPI === "03n") {
    mainIconEl.setAttribute("src", `../media/03n.png`);
  } else if (mainIconElAPI === "04n") {
    mainIconEl.setAttribute("src", `../media/04n.png`);
  } else if (mainIconElAPI === "09n") {
    mainIconEl.setAttribute("src", `../media/09n.png`);
  } else if (mainIconElAPI === "10n") {
    mainIconEl.setAttribute("src", `../media/10n.png`);
  } else if (mainIconElAPI === "11n") {
    mainIconEl.setAttribute("src", `../media/11n.png`);
  } else if (mainIconElAPI === "13n") {
    mainIconEl.setAttribute("src", `../media/13n.png`);
  } else if (mainIconElAPI === "50n") {
    mainIconEl.setAttribute("src", `../media/50n.png`);
  } else {mainIconEl.setAttribute("src", `http://openweathermap.org/img/wn/${mainIconElAPI}@2x.png`)};

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

let mainTemperature = document.querySelector("span.mainDegrees");
let fahrenheitSymbol = document.querySelector("#fahrenheit");
fahrenheitSymbol.addEventListener("click", convertFahrenheit);

let celciusSymbol = document.querySelector("#celcius");
celciusSymbol.addEventListener("click", convertCelcius);

let initialCelcius = null;