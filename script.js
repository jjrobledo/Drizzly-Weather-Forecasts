const cardContainer = document.querySelector(".card-div");
const locationText = document.querySelector(".location");
const clearSearch = document.querySelector(".clear-search");
const locSearch = document.querySelector("[data-search]");
const body = document.querySelector("body");

const findLocation = function (city, state = "", country = "US") {
  fetch(
    `https://api.geocod.io/v1.7/geocode?format=simple&city=${city}&state=${state}&country=${country}&api_key=${geoApi}`
  )
    .then((response) => response.json())
    .then((data) => {
      locationText.textContent = data.address.substring(0, data.address.lastIndexOf(" "));
      const { lat, lng: lon } = data;
      getWeatherData(lat, lon);
    });
};

const windDirection = function (degree) {
  let directions = [
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

const padString = function (value, numSpaces, char) {
  return String(value).padStart(numSpaces, char);
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

const generateForecast = function (arr, alertsArr) {
  if (cardContainer.textContent.length > 0) {
    document.querySelectorAll(".fader").forEach(function (e) {
      e.classList.remove("fade-in");
      cardContainer.textContent = "";
    });
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
    const sunriseHours = sunrise.getHours();
    const sunriseMinutes = sunrise.getMinutes();
    const sunsetHours = sunset.getHours();
    const sunsetMinutes = sunset.getMinutes();
    date = new Date(date * 1000);
    const month = date.getMonth() + 1;
    const day = String(date.getDate()).padStart(2, "0");
    const windDir = windDirection(wind_deg);
    const windSpeed = Math.round(wind_speed);

    const weatherText = `${weatherDescription}. ${
      wind_speed > 0 ? `Winds to the ${windDir} up to ${windSpeed} mph` : ""
    }`;
    const weatherIcon = weatherIconURL[weatherDescription.toLowerCase()];
    let html = ` 
    <div class='flex-card-date fader'>   
      <h3 class='date'>${month + "/" + day}</h3>
      <div class="card flex-card">
        <div class="hi-low-icon">
        <h3 class="high flex-cast"><sup><svg class="low-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z"/></svg></sup>&#160;${Math.round(
          max
        )}°</h3>
        <i class="wi ${weatherIcon} flex-cast"></i>
        <h3 class="low flex-cast"><svg class="low-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/></svg>&#160;${Math.round(
          min
        )}°</h3>
        </div>
        <h3 class="forecast-description">${weatherText}.</h3>
        <div class="sunrise-pop">
        <div class="info flex-info-row">
              <h3 class="flex-info-col sun"><i class="wi wi-sunrise"></i>&nbsp;${
                padString(sunriseHours, 2, "0") +
                ":" +
                padString(sunriseMinutes, 2, "0")
              }</h3>
            <h3 class="flex-info-col sun"><i class="wi wi-sunset"></i>&nbsp;${
              padString(sunsetHours, 2, "0") +
              ":" +
              padString(sunsetMinutes, 2, "0")
            }</h3>
        </div>
        <div class="info flex-info-row">
        <h3 class="flex-info-col"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M416 128c-.625 0-1.125 .25-1.625 .25C415.5 123 416 117.6 416 112c0-44.25-35.75-80-79.1-80c-24.62 0-46.25 11.25-60.1 28.75C256.4 24.75 219.3 0 176 0C114.3 0 64 50.13 64 112c0 7.25 .7512 14.25 2.126 21.25C27.76 145.8 .0054 181.5 .0054 224c0 53 42.1 96 95.1 96h319.1C469 320 512 277 512 224S469 128 416 128zM198.8 353.9c-12.17-5.219-26.3 .4062-31.52 12.59l-47.1 112c-5.219 12.19 .4219 26.31 12.61 31.53C134.1 511.4 138.2 512 141.3 512c9.312 0 18.17-5.438 22.08-14.53l47.1-112C216.6 373.3 210.1 359.2 198.8 353.9zM81.46 353.9c-12.19-5.219-26.3 .4062-31.52 12.59l-47.1 112C-3.276 490.7 2.365 504.8 14.55 510.1C17.63 511.4 20.83 512 23.99 512c9.312 0 18.17-5.438 22.08-14.53l47.1-112C99.29 373.3 93.64 359.2 81.46 353.9zM316.1 353.9c-12.19-5.219-26.3 .4062-31.52 12.59l-47.1 112c-5.219 12.19 .4219 26.31 12.61 31.53C252.3 511.4 255.5 512 258.7 512c9.312 0 18.17-5.438 22.08-14.53l47.1-112C333.1 373.3 328.3 359.2 316.1 353.9zM433.5 353.9c-12.17-5.219-26.28 .4062-31.52 12.59l-47.1 112c-5.219 12.19 .4219 26.31 12.61 31.53C369.6 511.4 372.8 512 375.1 512c9.312 0 18.17-5.438 22.08-14.53l47.1-112C451.3 373.3 445.6 359.2 433.5 353.9z"/></svg></i>${padString(
          Math.round(pop * 100),
          4,
          " "
        )}%</h3>
        <h3 class="flex-info-col"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M16 319.1C16 245.9 118.3 89.43 166.9 19.3C179.2 1.585 204.8 1.585 217.1 19.3C265.7 89.43 368 245.9 368 319.1C368 417.2 289.2 496 192 496C94.8 496 16 417.2 16 319.1zM112 319.1C112 311.2 104.8 303.1 96 303.1C87.16 303.1 80 311.2 80 319.1C80 381.9 130.1 432 192 432C200.8 432 208 424.8 208 416C208 407.2 200.8 400 192 400C147.8 400 112 364.2 112 319.1z"/></svg></i>${padString(
          humidity,
          4,
          " "
        )}%</h3>
        </div>
      </div>
    </div>
  </div>

  
`;

    cardContainer.insertAdjacentHTML("beforeend", html);
  });

  document.querySelectorAll(".fader").forEach(function (e) {
    setTimeout(() => {
      e.classList.add("fade-in");
    }, 400);
  });

  if (document.querySelector(".alerts")) {
    document.querySelector(".alerts").innerHTML = "";
  }

  if (alertsArr) {
    console.log("xxx");
    const alertHTML = `<div class="alerts">
        <svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/></svg>
        <div class="modal hidden">
        <button class="close-modal-x">x</button>
        </div>
        <div class="overlay hidden"></div>
        </div>`;
    cardContainer.insertAdjacentHTML("beforeend", alertHTML);
    alertsArr.forEach(function (e) {
      const alertModalHTML = `
        <h1>${e.event}</h1>
        <h2>Start: ${new Date(e.start * 1000).toString()}</h2>
        <h2>End: ${new Date(e.end * 1000).toString()}</h2>
        <p>
        ${e.description}
        </p>
`;
      document
        .querySelector(".modal")
        .insertAdjacentHTML("beforeend", alertModalHTML);
    });
  }

  if (document.querySelector(".alert-icon")) {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const alertIcon = document.querySelector(".alert-icon");
    const closeBtn = document.querySelector(".close-modal-x");
    const openModal = function () {
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    };

    const closeModal = function () {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    };
    alertIcon.addEventListener("click", openModal);
    overlay.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);
  }
};

const getWeatherData = function (lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=${weatherApi}`
  )
    .then((response) => response.json())
    .then((data) => {
      const alertsArr = data.alerts;
      generateForecast(forecastArr, alertsArr);
    });
};

locSearch.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const [city, state, country] = e.target.value.match(/\b(\w+)\b/g);
    findLocation(city, state, country);
  }
});
const testObj = {
  lat: 45.937,
  lon: -108.2767,
  timezone: "America/Denver",
  timezone_offset: -21600,
  current: {
    dt: 1655247654,
    sunrise: 1655205724,
    sunset: 1655262292,
    temp: 65.03,
    feels_like: 62.6,
    pressure: 1002,
    humidity: 29,
    dew_point: 32.04,
    uvi: 2.7,
    clouds: 98,
    visibility: 10000,
    wind_speed: 23.06,
    wind_deg: 259,
    wind_gust: 35.25,
    weather: [
      {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04d",
      },
    ],
  },
  daily: [
    {
      dt: 1655233200,
      sunrise: 1655205724,
      sunset: 1655262292,
      moonrise: 1655265780,
      moonset: 1655205000,
      moon_phase: 0.5,
      temp: {
        day: 64.67,
        min: 47.82,
        max: 65.41,
        night: 54.09,
        eve: 63.41,
        morn: 51.8,
      },
      feels_like: {
        day: 62.15,
        night: 51.03,
        eve: 61,
        morn: 48.74,
      },
      pressure: 1003,
      humidity: 28,
      dew_point: 30.99,
      wind_speed: 27.07,
      wind_deg: 269,
      wind_gust: 43.37,
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: 98,
      pop: 0,
      uvi: 6.53,
    },
    {
      dt: 1655319600,
      sunrise: 1655292122,
      sunset: 1655348719,
      moonrise: 1655356020,
      moonset: 1655295000,
      moon_phase: 0.55,
      temp: {
        day: 70.7,
        min: 50.63,
        max: 75.51,
        night: 56.05,
        eve: 72.77,
        morn: 52.68,
      },
      feels_like: {
        day: 68.94,
        night: 54.27,
        eve: 71.38,
        morn: 49.95,
      },
      pressure: 1006,
      humidity: 31,
      dew_point: 37.81,
      wind_speed: 29.91,
      wind_deg: 274,
      wind_gust: 43.51,
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "broken clouds",
          icon: "04d",
        },
      ],
      clouds: 78,
      pop: 0.03,
      uvi: 8.04,
    },
    {
      dt: 1655406000,
      sunrise: 1655378521,
      sunset: 1655435144,
      moonrise: 1655445360,
      moonset: 1655385840,
      moon_phase: 0.59,
      temp: {
        day: 74.79,
        min: 52.29,
        max: 81.37,
        night: 65.91,
        eve: 79.63,
        morn: 56.95,
      },
      feels_like: {
        day: 73.8,
        night: 65.03,
        eve: 79.63,
        morn: 55.4,
      },
      pressure: 1013,
      humidity: 39,
      dew_point: 47.25,
      wind_speed: 17.6,
      wind_deg: 93,
      wind_gust: 35.97,
      weather: [
        {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02d",
        },
      ],
      clouds: 22,
      pop: 0,
      uvi: 10.18,
    },
    {
      dt: 1655492400,
      sunrise: 1655464923,
      sunset: 1655521566,
      moonrise: 0,
      moonset: 1655477100,
      moon_phase: 0.63,
      temp: {
        day: 85.39,
        min: 55.76,
        max: 93.38,
        night: 77.65,
        eve: 93.29,
        morn: 57.6,
      },
      feels_like: {
        day: 83.32,
        night: 77.36,
        eve: 91.44,
        morn: 56.77,
      },
      pressure: 1004,
      humidity: 31,
      dew_point: 51.1,
      wind_speed: 15.79,
      wind_deg: 276,
      wind_gust: 27.65,
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      ],
      clouds: 5,
      pop: 0.39,
      rain: 0.59,
      uvi: 9.35,
    },
    {
      dt: 1655578800,
      sunrise: 1655551327,
      sunset: 1655607986,
      moonrise: 1655533920,
      moonset: 1655568420,
      moon_phase: 0.67,
      temp: {
        day: 89.89,
        min: 67.01,
        max: 96.91,
        night: 68.59,
        eve: 93.58,
        morn: 68.2,
      },
      feels_like: {
        day: 87.8,
        night: 68.95,
        eve: 91.8,
        morn: 67.82,
      },
      pressure: 1002,
      humidity: 30,
      dew_point: 53.78,
      wind_speed: 14.92,
      wind_deg: 146,
      wind_gust: 20.42,
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      ],
      clouds: 95,
      pop: 0.81,
      rain: 2.34,
      uvi: 10.05,
    },
    {
      dt: 1655665200,
      sunrise: 1655637734,
      sunset: 1655694404,
      moonrise: 1655622000,
      moonset: 1655659560,
      moon_phase: 0.7,
      temp: {
        day: 85.24,
        min: 65.62,
        max: 90.46,
        night: 66.81,
        eve: 78.69,
        morn: 65.62,
      },
      feels_like: {
        day: 83.75,
        night: 66.63,
        eve: 78.51,
        morn: 65.55,
      },
      pressure: 1003,
      humidity: 35,
      dew_point: 54.18,
      wind_speed: 24.49,
      wind_deg: 306,
      wind_gust: 27.94,
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "broken clouds",
          icon: "04d",
        },
      ],
      clouds: 84,
      pop: 0.75,
      uvi: 11,
    },
    {
      dt: 1655751600,
      sunrise: 1655724143,
      sunset: 1655780819,
      moonrise: 1655709720,
      moonset: 1655750400,
      moon_phase: 0.75,
      temp: {
        day: 74.62,
        min: 57.67,
        max: 78.75,
        night: 60.15,
        eve: 78.21,
        morn: 57.67,
      },
      feels_like: {
        day: 73.09,
        night: 59.54,
        eve: 77.09,
        morn: 55.44,
      },
      pressure: 1009,
      humidity: 28,
      dew_point: 39.04,
      wind_speed: 8.72,
      wind_deg: 319,
      wind_gust: 15.5,
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      ],
      clouds: 0,
      pop: 0.96,
      rain: 2.93,
      uvi: 11,
    },
    {
      dt: 1655838000,
      sunrise: 1655810554,
      sunset: 1655867232,
      moonrise: 1655797320,
      moonset: 1655841120,
      moon_phase: 0.77,
      temp: {
        day: 72.41,
        min: 55.54,
        max: 78.19,
        night: 66.09,
        eve: 78.19,
        morn: 55.72,
      },
      feels_like: {
        day: 70.99,
        night: 64.27,
        eve: 76.87,
        morn: 54.14,
      },
      pressure: 1013,
      humidity: 35,
      dew_point: 42.94,
      wind_speed: 15.66,
      wind_deg: 307,
      wind_gust: 23.02,
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      ],
      clouds: 91,
      pop: 0.99,
      rain: 0.7,
      uvi: 11,
    },
  ],
  alerts: [
    {
      sender_name: "NWS Billings (Southeastern Montana)",
      event: "Flood Watch",
      start: 1655186400,
      end: 1655337600,
      description:
        "...The Flood Watch continues for the following rivers in Montana...\nYellowstone River at Billings affecting Stillwater and\nYellowstone Counties.\n...FLOOD WATCH REMAINS IN EFFECT FROM LATE MONDAY NIGHT TO WEDNESDAY\nEVENING...\n* WHAT...Flooding is possible.\n* WHERE...Yellowstone River at Billings.\n* WHEN...From late Monday night to Wednesday evening.\n* IMPACTS...At 12.5 feet, Minor flooding of several homes in Arrow\nIsland subdivision begins.\nAt 13.1 feet, Water flows over Cerise road in east Billings across\nthe river from Metra Park.\n* ADDITIONAL DETAILS...\n- At 6:00 PM MDT Sunday the stage was 11.6 feet.\n- Forecast...Flood stage may be reached late Monday night. Peak\nflows are expected to occur Tuesday, followed by falling\nriver levels Tuesday night through Thursday.\n- Flood stage is 13.5 feet.\n- http://www.weather.gov/safety/flood\n&&\nFld   Observed           Forecasts (12 pm)\nLocation      Stg   Stg   Day/Time     Mon   Tue   Wed\nYellowstone River\nBillings      13.5  11.6  Sun 6 pm     12.6  14.0  12.0\n&&",
      tags: ["Flood"],
    },
    {
      sender_name: "NWS Billings (Southeastern Montana)",
      event: "Flood Warning",
      start: 1655244180,
      end: 1655337600,
      description:
        "...Moderate flooding occuring for the following rivers in Montana...\nYellowstone River at Billings affecting Yellowstone and\nStillwater Counties.\nFor the Yellowstone River...Billings. Moderate flooding is forecast.\n...FLOOD WARNING NOW IN EFFECT UNTIL TOMORROW EVENING...\n* WHAT...Moderate flooding is occurring.\n* WHERE...Yellowstone River at Billings.\n* WHEN...Until tomorrow evening.\n* IMPACTS...At 12.5 feet, Minor flooding of several homes in Arrow\nIsland subdivision begins.\nAt 13.1 feet, Water flows over Cerise Road in east Billings across\nthe river from Metra Park.\n* ADDITIONAL DETAILS...\n- At 3:00 PM MDT Tuesday the stage was 14.9 feet.\n- Recent Activity...The maximum river stage in the 24 hours\nending at 3:00 PM MDT Tuesday was 14.9 feet.\n- Forecast...The river will crest at 15.1 feet early this\nevening and then begin to fall. The river will fall below\nflood stage late tomorrow afternoon. It will remain high the\nrest of the week.\n- Flood stage is 13.5 feet.\n- Flood History...This crest compares to a previous crest of\n15.0 feet on 06/12/1997.\n- http://www.weather.gov/safety/flood\n&&\nFld   Observed           Forecasts (6 pm)\nLocation      Stg   Stg   Day/Time     Wed   Thu   Fri\nYellowstone River\nBillings      13.5  14.9  Tue 3 pm     12.2  9.9   9.6\n&&",
      tags: ["Flood"],
    },
  ],
};

//generateForecast(testObj.daily.slice(0, 5), testObj.alerts);
