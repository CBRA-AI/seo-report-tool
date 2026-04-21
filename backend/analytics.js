const { google } = require("googleapis");

const credentials = JSON.parse(process.env.GOOGLE_CREDS);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
});

async function getAnalyticsData(propertyId) {
  const client = await auth.getClient();

  const analyticsData = google.analyticsdata({
    version: "v1beta",
    auth: client,
  });

  const response = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" }
      ],
      dimensions: [{ name: "date" }],
    },
  });

  return response.data.rows || [];
}

module.exports = { getAnalyticsData };
