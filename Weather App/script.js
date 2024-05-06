const apikey = "03c507cad1e314613bc86aaf0ae848c1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const cityName = document.querySelector(".city-name");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
const errorMessage = document.querySelector(".error-message");
const weatherInfo = document.querySelector(".weather-info");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);
  if (response.status === 404) {
    errorMessage.style.display = "block";
    weatherInfo.style.display = "none";
  } else {
    const data = await response.json();
    updateWeatherInfo(data);
  }
}

function updateWeatherInfo(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${data.wind.speed} km/h`;

  const weatherCondition = data.weather[0].main.toLowerCase();
  switch (weatherCondition) {
    case "clouds":
      weatherIcon.src = "https://img.icons8.com/color/96/000000/clouds.png";
      break;
    case "clear":
      weatherIcon.src = "https://img.icons8.com/color/96/000000/sun.png";
      break;
    case "rain":
      weatherIcon.src = "https://img.icons8.com/color/96/000000/rain.png";
      break;
    case "drizzle":
      weatherIcon.src = "https://img.icons8.com/color/96/000000/light-rain.png";
      break;
    case "mist":
      weatherIcon.src = "https://img.icons8.com/color/96/000000/fog-day.png";
      break;
    default:
      weatherIcon.src = "https://img.icons8.com/color/96/000000/clouds.png";
  }

  errorMessage.style.display = "none";
  weatherInfo.style.display = "block";
}

searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    errorMessage.textContent = "Please enter a city name.";
    errorMessage.style.display = "block";
    weatherInfo.style.display = "none";
  }
});