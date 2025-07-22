const apiKey = '1d2dcc0a8f3167f43c0d7ab62d8da163'; // Replace with your API key

async function fetchCityData() {
    const cityName = document.getElementById('city-input').value.trim();
    const resultDiv = document.getElementById('result');

    if (!cityName) {
        resultDiv.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            const timezoneOffset = data.timezone / 3600; // Convert seconds to hours
            const utcOffset = timezoneOffset >= 0 ? `+${timezoneOffset}` : timezoneOffset;
            resultDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Condition: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Time Zone: UTC${utcOffset}</p>
            `;
        } else {
            resultDiv.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        resultDiv.innerHTML = '<p>An error occurred. Please try again later.</p>';
    }
}

document.getElementById('search-btn').addEventListener('click', fetchCityData);

// Allow pressing Enter to search
document.getElementById('city-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchCityData();
    }
});