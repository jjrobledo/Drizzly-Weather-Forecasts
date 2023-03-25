const axios = require("axios");

const GEO_API_KEY = process.env.GEO_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

exports.handler = async (event) => {
  const { api, city, state, country, lat, lon } = event.queryStringParameters;

  if (api === "geo") {
    const response = await axios.get(
      `https://api.geocod.io/v1.7/geocode?format=simple&city=${city}&state=${state}&country=${country}&api_key=${GEO_API_KEY}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  }

  if (api === "weather") {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=${WEATHER_API_KEY}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Invalid API parameter" }),
  };
};
