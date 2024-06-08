// API key for OpenWeatherMap
const apiKey = '88f429b96c83addb0a18c8c2c5045e87'; // my API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'; // API URL for current weather
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast'; // API URL for forecast weather

// Event listener to execute when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Add event listener to the search button
    document.getElementById('search-button').addEventListener('click', () => {
        const city = document.getElementById('city-input').value; // Get the city input value
        if (city) {
            getWeather(city); // Fetch current weather for the entered city
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

// Function to display error messages
function displayError(message) {
    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = `
        <div class="bg-red-500 error text-white p-4 rounded-lg shadow-lg">
            <p class="font-bold">${message}</p>
        </div>
    `;
}
