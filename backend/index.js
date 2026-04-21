const { getAnalyticsData } = require("./analytics");
const { getSearchConsoleData } = require("./searchConsole");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("SEO Report API Running 🚀");
});

// Report route
app.post("/report", async (req, res) => {
  const { website } = req.body;

  try {
    const gscData = await getSearchConsoleData(website);

    const keywords = gscData.map(row => ({
      keyword: row.keys[0],
      page: row.keys[1],
      clicks: row.clicks,
      impressions: row.impressions,
      position: row.position.toFixed(1),
    }));

    res.json({
      website,
      users: 1200,
      sessions: 1500,
      keywords
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching GSC data");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
