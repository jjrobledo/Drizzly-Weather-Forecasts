import {locationText} from "./main.js";
import {getWeatherData} from "./weatherAPI.js";

const geoApi = GEO_API_KEY
const findLocation = async function (city, state = "", country = "US") {
    try {
        console.log(city,state,country)
        const response = await fetch(`https://api.geocod.io/v1.7/geocode?format=simple&city=${city}&state=${state}&country=${country}&api_key=${geoApi}`)
        const data = await response.json();
        locationText.textContent = data.address.substring(0, data.address.lastIndexOf(" "));
        const {lat, lng: lon} = data;
        await getWeatherData(lat, lon);

    } catch (err) {
        console.log(err)
        locationText.textContent = "Location not found. Please try again.";
    }
};

export {findLocation};