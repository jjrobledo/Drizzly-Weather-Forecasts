const locationText = document.querySelector(".location");
const locSearch = document.querySelector("[data-search]");

import { findLocation } from './geolocation.js';


locSearch.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const [city, state, country] = e.target.value.match(/\b(\w+)\b/g);
    findLocation(city, state, country);
  }
});

export {locationText}