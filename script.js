const apiKey = '7a488ae3f2e98f02c1c4a3662a933357'; 
const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherDataContainer = document.getElementById('weatherData');

function fetchWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      return {
        location: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
      };
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(weatherData) {
  weatherDataContainer.innerHTML = `
    <h2>${weatherData.location}</h2>
    <p>Temperature: ${weatherData.temperature}°C</p>
    <p>Description: ${weatherData.description}</p>
  `;
}

weatherForm.addEventListener('submit', event => {
  event.preventDefault();
  const location = locationInput.value;
  weatherDataContainer.innerHTML = 'Loading...';
  fetchWeatherData(location)
    .then(weatherData => {
      displayWeatherData(weatherData);
    });
});
