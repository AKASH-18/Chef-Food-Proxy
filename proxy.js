const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Enable CORS for all requests
app.use(cors());

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "Missing ?url= parameter" });
  }

  try {
    const response = await axios.get(targetUrl, {
      responseType: "json",
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch target URL", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
});
