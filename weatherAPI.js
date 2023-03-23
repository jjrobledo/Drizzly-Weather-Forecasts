
import {locationText} from "./index";
import { generateForecast } from './weatherHTML.js'

weatherApi = '20ba3d7d0058c562abc79333792c7909'

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