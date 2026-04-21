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
    // 🔍 GSC DATA
    const gscData = await getSearchConsoleData(website);

    const keywords = gscData.map(row => ({
      keyword: row.keys[0],
      page: row.keys[1],
      clicks: row.clicks,
      impressions: row.impressions,
      position: row.position.toFixed(1),
    }));

    // 📊 GA DATA
    const analyticsRows = await getAnalyticsData("YOUR_PROPERTY_ID");

    const trafficData = analyticsRows.map(row => ({
      date: row.dimensionValues[0].value,
      users: Number(row.metricValues[0].value),
      sessions: Number(row.metricValues[1].value),
      pageviews: Number(row.metricValues[2].value),
    }));

    // 📤 FINAL RESPONSE
    res.json({
      website,
      keywords,
      traffic: trafficData
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching SEO data");
  }
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
