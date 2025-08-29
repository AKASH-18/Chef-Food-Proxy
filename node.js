// proxy.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

// Allow CORS for browser requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Proxy route for Swiggy API
app.get('/swiggy-restaurants', async (req, res) => {
  try {
    const swiggyUrl = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.9875082&lng=79.4141214&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
    const response = await axios.get(swiggyUrl);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Proxy running on http://localhost:${PORT}`));
