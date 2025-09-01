import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all domains (frontend can call backend)
app.use(cors());

// ✅ Route to fetch restaurants
app.get("/api/restaurants", async (req, res) => {
  try {
    const city = req.query.city || "bangalore"; // default city
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9716&lng=77.5946&city=${city}`;

    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from Swiggy API" });
  }
});

// ✅ Route to fetch menu by restaurantId
app.get("/api/menu/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&restaurantId=${restaurantId}`;

    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
