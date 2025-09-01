import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Strong browser-like headers
const browserHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.swiggy.com/",
  Origin: "https://www.swiggy.com",
  Connection: "keep-alive",
};

// ✅ Restaurants API
app.get("/api/restaurants", async (req, res) => {
  try {
    const lat = req.query.lat || "12.9716";
    const lng = req.query.lng || "77.5946";

    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    const response = await fetch(url, { headers: browserHeaders });
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Error fetching restaurants:", err.message);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// ✅ Menu API
app.get("/api/menu/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&restaurantId=${restaurantId}`;

    const response = await fetch(url, { headers: browserHeaders });
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Error fetching menu:", err.message);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// Default route (health check)
app.get("/", (req, res) => {
  res.send("✅ Swiggy Proxy API is working");
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
