import { findLocation } from './geolocationAPI.js';
const locationText = document.querySelector(".location");
const locSearch = document.querySelector("[data-search]");


locSearch.addEventListener("keypress", async function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const [city, state, country] = e.target.value.match(/\b(\w+)\b/g);
    await findLocation(city, state, country);
  }
});

export { locationText }