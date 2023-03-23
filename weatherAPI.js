import {locationText} from "./main.js";
import { generateForecast } from './weatherHTML.js'

const weatherApi = WEATHER_API_KEY
const getWeatherData = async function (lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=${weatherApi}`)
        const data = await response.json();
        const forecastData = data.daily.slice(0, 5);
        const alertData = data.alerts;
        generateForecast(forecastData, alertData);
    }
    catch (err) {
        locationText.textContent = "Error generating forecast.";
    }
};

export { getWeatherData };