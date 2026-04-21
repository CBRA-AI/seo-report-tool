async function generateReport() {
  const url = document.getElementById("url").value;

  if (!url) {
    alert("Enter website URL");
    return;
  }

  try {
    const res = await fetch("https://seo-report-api.onrender.com/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ website: url })
    });

    const data = await res.json();

    // 🟢 KEYWORDS TABLE
    const table = document.getElementById("keywordTable");

    table.innerHTML = `
      <tr>
        <th>Keyword</th>
        <th>Position</th>
        <th>Page</th>
      </tr>
    `;

    if (data.keywords && data.keywords.length > 0) {
      data.keywords.forEach(k => {
        table.innerHTML += `
          <tr>
            <td>${k.keyword}</td>
            <td>${k.position}</td>
            <td>${k.page}</td>
          </tr>
        `;
      });
    } else {
      table.innerHTML += `
        <tr><td colspan="3">No keyword data found</td></tr>
      `;
    }

    // 🔵 TRAFFIC CHART
    if (data.traffic && data.traffic.length > 0) {
      const labels = data.traffic.map(t => t.date);
      const users = data.traffic.map(t => t.users);

      const ctx = document.getElementById("trafficChart");

      // Destroy old chart if exists
      if (window.chart) {
        window.chart.destroy();
      }

      window.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Users",
            data: users
          }]
        }
      });
    } else {
      console.log("No traffic data");
    }

  } catch (err) {
    console.error(err);
    alert("Error fetching report");
  }
}
