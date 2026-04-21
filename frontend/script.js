async function generateReport() {
  const url = document.getElementById("url").value;

  if (!url) {
    alert("Please enter website URL");
    return;
  }

  try {
    const res = await fetch("https://seo-report-api-caii.onrender.com/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        website: url
      })
    });

    // ❌ backend error handle
    if (!res.ok) {
      throw new Error("API error");
    }

    const data = await res.json();

    console.log("API DATA:", data);

    // =========================
    // 🟢 KEYWORD TABLE
    // =========================
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
        <tr>
          <td colspan="3">No keyword data found</td>
        </tr>
      `;
    }

    // =========================
    // 🔵 TRAFFIC CHART
    // =========================
    if (data.traffic && data.traffic.length > 0) {

      const labels = data.traffic.map(t => t.date);
      const users = data.traffic.map(t => t.users);

      const ctx = document.getElementById("trafficChart");

      // old chart destroy panna
      if (window.chart) {
        window.chart.destroy();
      }

      window.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Users",
            data: users,
            borderWidth: 2,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

    } else {
      console.log("No traffic data available");
    }

  } catch (error) {
    console.error("ERROR:", error);
    alert("Error fetching report (Check backend / permissions)");
  }
}
