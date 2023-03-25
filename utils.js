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

const weatherIconPatterns = [
  { regex: /^thunderstorm/i, icon: "wi-storm-showers" },
  { regex: /^drizzle/i, icon: "wi-showers" },
  {
    regex:
      /^light rain|moderate rain|heavy intensity rain|very heavy rain|extreme rain/i,
    icon: "wi-day-rain",
  },
  { regex: /^freezing rain/i, icon: "wi-sleet" },
  {
    regex:
      /^light intensity shower rain|shower rain|heavy intensity shower rain|ragged shower rain/i,
    icon: "wi-rain",
  },
  { regex: /^light snow|snow|heavy snow/i, icon: "wi-snow" },
  { regex: /^sleet|shower sleet|light shower sleet/i, icon: "wi-sleet" },
  { regex: /^light rain and snow|rain and snow/i, icon: "wi-rain-mix" },
  { regex: /^light shower snow|heavy shower snow/i, icon: "wi-day-snow" },
  { regex: /^mist|smoke|haze|fog/i, icon: "wi-fog" },
  { regex: /^sand\/dust whirls|sand|dust/i, icon: "wi-sandstorm" },
  { regex: /^volcanic ash/i, icon: "wi-volcano" },
  { regex: /^squalls/i, icon: "wi-storm-warning" },
  { regex: /^tornado/i, icon: "wi-tornado" },
  { regex: /^clear sky$/i, icon: "wi-day-sunny" },
  { regex: /^few clouds(?!:)/i, icon: "wi-day-sunny-overcast" },
  { regex: /^scattered clouds$/i, icon: "wi-day-cloudy" },
  { regex: /^broken clouds|overcast clouds$/i, icon: "wi-cloudy" },
];

function getWeatherIcon(weatherDescription) {
  for (const pattern of weatherIconPatterns) {
    if (pattern.regex.test(weatherDescription)) {
      return pattern.icon;
    }
  }
  return "";
}

const padString = (value, numSpaces, char) =>
  String(value).padStart(numSpaces, char);

export { windDirection, padString, getWeatherIcon };
