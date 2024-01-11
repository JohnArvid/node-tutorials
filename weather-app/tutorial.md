Creating a weather application in Node.js involves fetching data from a weather API and displaying it. We'll use the OpenWeatherMap API and the `axios` library for making HTTP requests. Below is a step-by-step tutorial:

### Step 1: Set Up Your Project

Create a new directory for your project, navigate into it, and initialize a Node.js project:

```bash
mkdir weather-app
cd weather-app
npm init -y
```

Install the necessary dependencies:

```bash
npm install express axios
```

### Step 2: Get an API Key

Sign up on [OpenWeatherMap](https://openweathermap.org/) to get your API key.

### Step 3: Create Your Server

Create a file named `server.js` and set up your Node.js server using Express:

```javascript
// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/weather', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      throw new Error('City parameter is required.');
    }

    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Step 4: Create Your HTML File

Create an HTML file named `index.html`:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather App</title>
</head>
<body>
  <h1>Weather App</h1>
  <form id="form" action="/weather">
    <label for="city">Enter city:</label>
    <input type="text" id="city" name="city" required />
    <button type="submit">Get Weather</button>
  </form>
  <div id="weather-info"></div>
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
  <script src="/client.js"></script>
</body>
</html>
```

### Step 5: Create Your Client-Side JavaScript

Create a file named `client.js` for your client-side JavaScript:

```javascript
// client.js
$('#form').submit(function (e) {
  e.preventDefault();
  const city = $('#city').val();

  $.get(`/weather?city=${city}`, function (data) {
    const weatherInfo = $('#weather-info');
    weatherInfo.empty();

    if (data.weather) {
      const description = data.weather[0].description;
      const temperature = data.main.temp;
      const cityName = data.name;

      weatherInfo.append(`<p>City: ${cityName}</p>`);
      weatherInfo.append(`<p>Description: ${description}</p>`);
      weatherInfo.append(`<p>Temperature: ${temperature} K</p>`);
    } else {
      weatherInfo.append(`<p>Error: ${data.message}</p>`);
    }
  });
});
```

### Step 6: Run Your Application

Replace `'YOUR_API_KEY'` in `server.js` with your actual OpenWeatherMap API key.

Run your server:

```bash
node server.js
```

Visit http://localhost:3000 in your browser and enter a city name. You should see weather information displayed.

This tutorial provides a basic setup for a weather application. Depending on your needs, you might want to add more features such as a graphical user interface or additional weather details. Make sure to explore the OpenWeatherMap API documentation for more information on available endpoints and parameters.