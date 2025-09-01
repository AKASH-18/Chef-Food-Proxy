import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Common browser headers
const browserHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.swiggy.com/",
};

// ✅ Restaurants list
app.get("/api/restaurants", async (req, res) => {
  try {
    const city = req.query.city || "bangalore";
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9716&lng=77.5946&city=${city}`;

    const response = await fetch(url, { headers: browserHeaders });
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Error fetching restaurants:", err);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// ✅ Restaurant menu
app.get("/api/menu/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&restaurantId=${restaurantId}`;

    const response = await fetch(url, { headers: browserHeaders });
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Error fetching menu:", err);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
