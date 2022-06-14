***REMOVED***
***REMOVED***
const cardContainer = document.querySelector(".card-div");
const locationText = document.querySelector(".location");
const clearSearch = document.querySelector(".clear-search");
const locSearch = document.querySelector("[data-search]");

const findLocation = function (city, state = "") {
  fetch(
    `https://api.geocod.io/v1.7/geocode?format=simple&city=${city}&state=${state}&api_key=${geoApi}`
  )
    .then((response) => response.json())
    .then((data) => {
      locationText.textContent = data.address;
      const { lat, lng: lon } = data;
      getWeatherData(lat, lon);
    });
};

const windDirection = function (degree) {
  directions = [
    "North",
    "Northeast",
    "East",
    "Southeast",
    "South",
    "Southwest",
    "West",
    "Northwest",
  ];
  degree = Math.round((degree * 8) / 360);
  return directions[degree];
};

const weatherIconURL = {
  "thunderstorm with light rain": "wi-storm-showers",
  "thunderstorm with rain": "wi-storm-showers",
  "thunderstorm with heavy rain": "wi-storm-showers",
  "light thunderstorm": "wi-storm-showers",
  thunderstorm: "wi-storm-showers",
  "heavy thunderstorm": "wi-storm-showers",
  "ragged thunderstorm": "wi-storm-showers",
  "thunderstorm with light drizzle": "wi-storm-showers",
  "thunderstorm with drizzle": "wi-storm-showers",
  "thunderstorm with heavy drizzle": "wi-storm-showers",
  "light intensity drizzle": "wi-showers",
  drizzle: "wi-showers",
  "heavy intensity drizzle": "wi-showers",
  "light intensity drizzle rain": "wi-showers",
  "drizzle rain": "wi-showers",
  "heavy intensity drizzle rain": "wi-showers",
  "shower rain and drizzle": "wi-showers",
  "heavy shower rain and drizzle": "wi-showers",
  "shower drizzle": "wi-showers",
  "light rain": "wi-day-rain",
  "moderate rain": "wi-day-rain",
  "heavy intensity rain": "wi-day-rain",
  "very heavy rain": "wi-day-rain",
  "extreme rain": "wi-day-rain",
  "freezing rain": "wi-sleet",
  "light intensity shower rain": "wi-rain",
  "shower rain": "wi-rain",
  "heavy intensity shower rain": "wi-rain",
  "ragged shower rain": "wi-rain",
  "light snow": "wi-snow",
  Snow: "wi-snow",
  "Heavy snow": "wi-snow",
  Sleet: "wi-sleet",
  "Light shower sleet": "wi-sleet",
  "Shower sleet": "wi-sleet",
  "Light rain and snow": "wi-rain-mix",
  "Rain and snow": "wi-rain-mix",
  "Light shower snow": "wi-day-snow",
  "Heavy shower snow": "wi-snow",
  mist: "wi-fog",
  Smoke: "wi-smoke",
  Haze: "wi-fog",
  "sand/ dust whirls": "wi-sandstorm",
  fog: "wi-fog",
  sand: "wi-sandstorm",
  dust: "wi-dust",
  "volcanic ash": "wi-volcano",
  squalls: "wi-storm-warning",
  tornado: "wi-tornado",
  "clear sky": "wi-day-sunny",
  "few clouds: 11-25%": "wi-day-cloudy",
  "scattered clouds: 25-50%": "wi-cloud",
  "broken clouds: 51-84%": "wi-cloudy",
  "overcast clouds: 85-100%": "wi-cloudy",
  "clear sky": "wi-day-sunny",
  "few clouds": "wi-day-sunny-overcast",
  "scattered clouds": "wi-day-cloudy",
  "overcast clouds": "wi-day-cloudy",
  "broken clouds": "wi-cloudy",
};

const generateForecast = function (arr) {
  if (cardContainer.textContent.length > 0) {
    cardContainer.textContent = "";
  }
  arr.forEach((element) => {
    let {
      dt: date,
      sunrise,
      sunset,
      pop,
      humidity,
      weather: [{ main, description: weatherDescription }],
      temp: { min, max },
      wind_deg,
      wind_speed,
    } = element;
    weatherDescription =
      weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    sunrise = new Date(sunrise * 1000);
    sunset = new Date(sunset * 1000);
    date = new Date(date * 1000);
    month = date.getMonth() + 1;
    day = String(date.getDate()).padStart(2, "0");
    const windDir = windDirection(wind_deg);
    windSpeed = Math.round(wind_speed);

    const weatherText = `${weatherDescription}. ${
      wind_speed > 0 ? `Winds to the ${windDir} up to ${windSpeed} mph` : ""
    }`;
    const weatherIcon = weatherIconURL[weatherDescription.toLowerCase()];
    html = ` 
    <div class='flex-card-date'>   
    <h3 class='date'>${month + "/" + day}</h3>
    <div class="card flex-card">

      <h3 class="high flex-cast">&nbsp;<sup><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z"/></svg></sup>&nbsp;${Math.round(
        max
      )}°</h3>
      <i class="wi ${weatherIcon} flex-cast"></i>
      <h3 class="low flex-cast"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/></svg>&nbsp;${Math.round(
        min
      )}°</h3>
      <h3 class="forecast-description">${weatherText}.</h3>
      
      <div class="info flex-info-row">
          <h3 class="flex-info-col"><i class="wi wi-sunrise"></i>&nbsp;${
            String(sunrise.getHours()).padStart(2, "0") +
            ":" +
            String(sunrise.getMinutes()).padStart(2, "0")
          }</h3>
          <h3 class="flex-info-col"><i class="wi wi-sunset"></i>&nbsp;${
            String(sunset.getHours()).padStart(2, "0") +
            ":" +
            String(sunset.getMinutes()).padStart(2, "0")
          }</h3>
      </div>
      <div class="info flex-info-row">
      <h3 class="flex-info-col"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M416 128c-.625 0-1.125 .25-1.625 .25C415.5 123 416 117.6 416 112c0-44.25-35.75-80-79.1-80c-24.62 0-46.25 11.25-60.1 28.75C256.4 24.75 219.3 0 176 0C114.3 0 64 50.13 64 112c0 7.25 .7512 14.25 2.126 21.25C27.76 145.8 .0054 181.5 .0054 224c0 53 42.1 96 95.1 96h319.1C469 320 512 277 512 224S469 128 416 128zM198.8 353.9c-12.17-5.219-26.3 .4062-31.52 12.59l-47.1 112c-5.219 12.19 .4219 26.31 12.61 31.53C134.1 511.4 138.2 512 141.3 512c9.312 0 18.17-5.438 22.08-14.53l47.1-112C216.6 373.3 210.1 359.2 198.8 353.9zM81.46 353.9c-12.19-5.219-26.3 .4062-31.52 12.59l-47.1 112C-3.276 490.7 2.365 504.8 14.55 510.1C17.63 511.4 20.83 512 23.99 512c9.312 0 18.17-5.438 22.08-14.53l47.1-112C99.29 373.3 93.64 359.2 81.46 353.9zM316.1 353.9c-12.19-5.219-26.3 .4062-31.52 12.59l-47.1 112c-5.219 12.19 .4219 26.31 12.61 31.53C252.3 511.4 255.5 512 258.7 512c9.312 0 18.17-5.438 22.08-14.53l47.1-112C333.1 373.3 328.3 359.2 316.1 353.9zM433.5 353.9c-12.17-5.219-26.28 .4062-31.52 12.59l-47.1 112c-5.219 12.19 .4219 26.31 12.61 31.53C369.6 511.4 372.8 512 375.1 512c9.312 0 18.17-5.438 22.08-14.53l47.1-112C451.3 373.3 445.6 359.2 433.5 353.9z"/></svg></i>&nbsp;${Math.round(
        pop * 100
      )}%</h3>
      <h3 class="flex-info-col"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M16 319.1C16 245.9 118.3 89.43 166.9 19.3C179.2 1.585 204.8 1.585 217.1 19.3C265.7 89.43 368 245.9 368 319.1C368 417.2 289.2 496 192 496C94.8 496 16 417.2 16 319.1zM112 319.1C112 311.2 104.8 303.1 96 303.1C87.16 303.1 80 311.2 80 319.1C80 381.9 130.1 432 192 432C200.8 432 208 424.8 208 416C208 407.2 200.8 400 192 400C147.8 400 112 364.2 112 319.1z"/></svg></i>&nbsp;${humidity}%</h3>
  </div>

    </div>
    </div>
`;
    cardContainer.insertAdjacentHTML("beforeend", html);
  });
};

const getWeatherData = function (lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApi}`
  )
    .then((response) => response.json())
    .then((data) => {
      forecastArr = data.daily.slice(0, 5);
      console.log(forecastArr);
      generateForecast(forecastArr);
    });
};

locSearch.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    if (locSearch.value && clearSearch.style.visibility !== "visible") {
      clearSearch.style.visibility = "visible";
    } else if (!locSearch.value) {
      clearSearch.style.visibility = "hidden";
    }
    const [city, state] = e.target.value.match(/\b(\w+)\b/g);
    console.log(city, state);
    findLocation(city, state);
  }
});

clearSearch.addEventListener("click", () => {
  locSearch.value = "";
  clearSearch.style.visibility = "hidden";
});
