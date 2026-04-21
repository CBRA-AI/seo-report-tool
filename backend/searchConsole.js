const { google } = require("googleapis");

// 🔐 Render ENV la JSON store pannirukkom
const credentials = JSON.parse(process.env.GOOGLE_CREDS);

// Auth setup
const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
});

async function getSearchConsoleData(siteUrl) {
  const client = await auth.getClient();

  const searchconsole = google.searchconsole({
    version: "v1",
    auth: client,
  });

  const response = await searchconsole.searchanalytics.query({
    siteUrl: siteUrl,
    requestBody: {
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      dimensions: ["query", "page"],
      rowLimit: 10,
    },
  });

  return response.data.rows || [];
}

module.exports = { getSearchConsoleData };
