import { locationText } from "./index.js";
import { generateForecast } from "./weatherHTML.js";

const getWeatherData = async function (lat, lon) {
  try {
    const queryString = new URLSearchParams({
      api: "weather",
      lat,
      lon,
    }).toString();
    const response = await fetch(
      `/.netlify/functions/api-handler?${queryString}`
    );
    const data = await response.json();

    const forecastData = data.daily.slice(0, 5);
    const alertData = data.alerts;
    generateForecast(forecastData, alertData);
  } catch (err) {
    locationText.textContent = "Error generating forecast.";
  }
};

export { getWeatherData };
