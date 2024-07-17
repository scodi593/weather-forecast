
const apiKey = "c2e47e722347212e8dcd24ad234e8551";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const iconMap = {
    "Clouds": "images/clouds.png",
    "Clear": "images/clear.png",
    "Rain": "images/rain.png",
    "Drizzle": "images/drizzle.png",
    "Haze": "images/mist.png",
    "Mist": "images/mist.png",
    "Snow" : "images/snow.png",
    // Add more conditions as needed
};

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Re-throw the error to handle it outside
    }
}

function updateWeatherUI(data) {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/hr";

    document.querySelector(".weather").style.display = "block";
    const weatherCondition = data.weather[0].main;
    weatherIcon.src = iconMap[weatherCondition] || "images/default.png";
    weatherIcon.alt = weatherCondition;
}

searchBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission
    const city = searchBox.value.trim();
    if (city) {
        try {
            const weatherData = await fetchWeather(city);
            updateWeatherUI(weatherData);
        } catch (error) {
            // Handle error, e.g., display a message to the user
            console.error('Error:', error.message);
        }
    } else {
        // Handle empty input case if needed
        console.error('Please enter a city name');
    }
});
