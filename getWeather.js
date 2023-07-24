const axios = require('axios');

async function getWeather(city, language) {

  try {
    const response = await axios.get(`https://geocode.maps.co/search?q=${city}`);
    const place = response.data[0];
    const lat = place.lat;
    const lon = place.lon;
    const name = place.display_name

    const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    return {weather: weatherResponse.data.current_weather, name: name}
  } catch (err) {
    console.log(err);
  }

}

module.exports = { getWeather };