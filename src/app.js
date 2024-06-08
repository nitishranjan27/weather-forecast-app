// API key for OpenWeatherMap
const apiKey = '88f429b96c83addb0a18c8c2c5045e87'; // OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'; // API URL for current weather
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast'; // API URL for forecast weather

// Event listener to execute when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Add event listener to the search button
    document.getElementById('search-button').addEventListener('click', () => {
        const city = document.getElementById('city-input').value; // Get the city input value
        if (city) {
            getWeather(city); // Fetch current weather for the entered city
            getExtendedForecast(city); // Fetch forecast weather for the entered city
        }
    });

    // Fetch current location weather using geolocation API
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation(latitude, longitude); // Fetch weather based on current location
    });
});

// Function to get current weather for a city
async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`); // Fetch weather data
        if (!response.ok) throw new Error('City not found'); // Handle city not found error
        const data = await response.json();
        displayWeather(data); // Display weather data
    } catch (error) {
        displayError(error.message); // Display error message
    }
}

// Function to get current weather based on location
async function getWeatherByLocation(lat, lon) {
    try {
        const response = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`); // Fetch weather data
        if (!response.ok) throw new Error('Location not found'); // Handle location not found error
        const data = await response.json();
        displayWeather(data); // Display weather data
    } catch (error) {
        clearWeatherDisplay(); // Clear previous weather data
        displayError(error.message); // Display error message
    }
}

// Function to get extended forecast for a city
async function getExtendedForecast(city) {
    try {
        const response = await fetch(`${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`); // Fetch forecast data
        if (!response.ok) throw new Error('City not found'); // Handle city not found error
        const data = await response.json();
        displayForecast(data); // Display forecast data
    } catch (error) {
        clearForecastDisplay(); // Clear previous forecast data
        displayError(error.message); // Display error message
    }
}

// Function to display current weather data
function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = `
        <div class="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-8 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
            <h2 class="text-4xl font-extrabold mb-6">${data.name}</h2>
            <p class="text-2xl">🌡️ Temperature: ${data.main.temp}°C</p>
            <p class="text-2xl">💧 Humidity: ${data.main.humidity}%</p>
            <p class="text-2xl">💨 Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
}

// Function to display forecast weather data
function displayForecast(data) {
    clearForecastDisplay(); // Clear previous forecast data
    const forecastDisplay = document.getElementById('forecast-display');
    forecastDisplay.innerHTML = `
        <h2 class="text-4xl font-extrabold text-center mb-8">📅 5-Day Forecast</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${data.list.slice(0, 5).map(day => `
                <div class="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 p-4 text-center mbt rounded-lg shadow-md transform transition duration-500 hover:scale-105">
                    <p class="text-2xl datebold">${new Date(day.dt * 1000).toLocaleDateString()}</p>
                    <p>🌡️ Temp: ${day.main.temp}°C</p>
                    <p>💨 Wind: ${day.wind.speed} m/s</p>
                    <p>💧 Humidity: ${day.main.humidity}%</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Function to display error messages
function displayError(message) {
    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = `
        <div class="bg-red-500 error text-white p-4 rounded-lg shadow-lg">
            <p class="font-bold">${message}</p>
        </div>
    `;
}
