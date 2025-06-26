const apiKey = "82ba5199efbe4b13b83205935251402"; // WeatherAPI key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const errorBox = document.getElementById("error-container");
const errorMessage = document.getElementById("error-message");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const appBody = document.getElementById("app-body");

// Theme Toggle functionality
themeToggle.addEventListener("click", toggleTheme);

// Check for saved theme on page load
document.addEventListener("DOMContentLoaded", function() {
  if (localStorage.getItem("theme") === "dark") {
    enableDarkMode();
  }
});

// Toggle between light and dark themes
function toggleTheme() {
  if (appBody.classList.contains("dark")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}

// Enable dark mode
function enableDarkMode() {
  appBody.classList.add("dark");
  // Remove the light mode gradient
  appBody.classList.remove("bg-gradient-to-t", "from-pink-200", "to-blue-200");
  // Add dark mode gradient
  appBody.classList.add("bg-gradient-to-t", "from-gray-900", "to-blue-900");
  // Change icon
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
  
  // Update weather card style for dark mode
  if (!weatherInfo.classList.contains("hidden")) {
    weatherInfo.classList.add("bg-gray-800", "text-white");
    weatherInfo.classList.remove("bg-white");
    
    document.getElementById("cityName").classList.remove("text-gray-800");
    document.getElementById("cityName").classList.add("text-white");
    
    document.getElementById("temperature").classList.remove("text-gray-700");
    document.getElementById("temperature").classList.add("text-gray-200");
    
    document.getElementById("description").classList.remove("text-gray-600");
    document.getElementById("description").classList.add("text-gray-300");
    
    document.getElementById("humidity").classList.remove("text-gray-600");
    document.getElementById("humidity").classList.add("text-gray-300");
    
    document.getElementById("windSpeed").classList.remove("text-gray-600");
    document.getElementById("windSpeed").classList.add("text-gray-300");
  }
  
  // Update search input for dark mode
  cityInput.classList.add("bg-gray-700", "text-gray-200");
  cityInput.classList.remove("bg-white", "text-gray-700");
  cityInput.style.placeholder = "rgba(209, 213, 219, 0.5)";

    // Enable error box for dark mode
    errorBox.classList.add("bg-red-800");
    errorBox.classList.remove("bg-red-600");
  
    
  localStorage.setItem("theme", "dark");
}

// Disable dark mode
function disableDarkMode() {
  appBody.classList.remove("dark");
  // Remove dark mode gradient
  appBody.classList.remove("bg-gradient-to-t", "from-gray-900", "to-blue-900");
  // Add light mode gradient
  appBody.classList.add("bg-gradient-to-t", "from-pink-200", "to-blue-200");
  // Change icon
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
  
  // Update weather card style for light mode
  if (!weatherInfo.classList.contains("hidden")) {
    weatherInfo.classList.remove("bg-gray-800", "text-white");
    weatherInfo.classList.add("bg-white");
    
    document.getElementById("cityName").classList.add("text-gray-800");
    document.getElementById("cityName").classList.remove("text-white");
    
    document.getElementById("temperature").classList.add("text-gray-700");
    document.getElementById("temperature").classList.remove("text-gray-200");
    
    document.getElementById("description").classList.add("text-gray-600");
    document.getElementById("description").classList.remove("text-gray-300");
    
    document.getElementById("humidity").classList.add("text-gray-600");
    document.getElementById("humidity").classList.remove("text-gray-300");
    
    document.getElementById("windSpeed").classList.add("text-gray-600");
    document.getElementById("windSpeed").classList.remove("text-gray-300");
  }
  
  // Update search input for light mode
  cityInput.classList.remove("bg-gray-700", "text-gray-200");
  cityInput.classList.add("bg-white", "text-gray-700");
  cityInput.style.placeholder = "";
  
  //Update error box for light mode
  errorBox.classList.add("bg-red-600");
  errorBox.classList.remove("bg-red-800");
  
  localStorage.setItem("theme", "light");
}   

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    showError("Please enter a city name");
    return;
  }
  getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

async function getWeather(city) {
  try {
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
    if (!res.ok) return showError("City not found. Please try again.");

    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    console.error(err);
    showError("Something went wrong.");
  }
}

function displayWeather(data) {
  document.getElementById("cityName").textContent = `${data.location.name}, ${data.location.country}`;
  document.getElementById("temperature").textContent = `🌡 Temperature: ${data.current.temp_c}°C`;
  document.getElementById("description").textContent = `🌤 Condition: ${data.current.condition.text}`;
  document.getElementById("humidity").textContent = `💧 Humidity: ${data.current.humidity}%`;
  document.getElementById("windSpeed").textContent = `💨 Wind: ${data.current.wind_kph} km/h`;
  document.getElementById("weatherIcon").src = `https:${data.current.condition.icon}`;

  weatherInfo.classList.remove("hidden");
  errorBox.classList.add("hidden");
  
  // Apply theme-specific styling to the weather card based on current theme
  if (appBody.classList.contains("dark")) {
    weatherInfo.classList.add("bg-gray-800", "text-white");
    weatherInfo.classList.remove("bg-white");
    
    document.getElementById("cityName").classList.remove("text-gray-800");
    document.getElementById("cityName").classList.add("text-white");
    
    document.getElementById("temperature").classList.remove("text-gray-700");
    document.getElementById("temperature").classList.add("text-gray-200");
    
    document.getElementById("description").classList.remove("text-gray-600");
    document.getElementById("description").classList.add("text-gray-300");
    
    document.getElementById("humidity").classList.remove("text-gray-600");
    document.getElementById("humidity").classList.add("text-gray-300");
    
    document.getElementById("windSpeed").classList.remove("text-gray-600");
    document.getElementById("windSpeed").classList.add("text-gray-300");
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorBox.classList.remove("hidden");
  weatherInfo.classList.add("hidden");
}