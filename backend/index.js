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

  // Dummy data (next step la real API connect pannuvom)
  const report = {
    website,
    users: 1200,
    sessions: 1500,
    keywords: [
      { keyword: "bridal jewellery", position: 3, page: "/bridal" },
      { keyword: "gold bangles", position: 5, page: "/bangles" }
    ]
  };

  res.json(report);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
