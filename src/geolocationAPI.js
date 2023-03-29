import { locationText } from "./index.js";
import { getWeatherData } from "./weatherAPI.js";

const findLocation = async function (city, state = "", country = "US") {
  try {
    const queryString = new URLSearchParams({
      api: "geo",
      city,
      state,
      country,
    }).toString();
    const response = await fetch(
      `/.netlify/functions/api-handler?${queryString}`
    );
    const data = await response.json();

    locationText.textContent = data.address.substring(
      0,
      data.address.lastIndexOf(" ")
    );
    const { lat, lng: lon } = data;
    await getWeatherData(lat, lon);
  } catch (err) {
    locationText.textContent = "Error fetching geocoding data.";
  }
};

export { findLocation };
