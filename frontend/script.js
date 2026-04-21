async function generateReport() {
  const url = document.getElementById("url").value;

  const res = await fetch("https://seo-report-api.onrender.com/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ website: url })
  });

  const data = await res.json();

  // Keywords table
  const table = document.getElementById("keywordTable");
  table.innerHTML = `
    <tr>
      <th>Keyword</th>
      <th>Position</th>
      <th>Page</th>
    </tr>
  `;

  data.keywords.forEach(k => {
    table.innerHTML += `
      <tr>
        <td>${k.keyword}</td>
        <td>${k.position}</td>
        <td>${k.page}</td>
      </tr>
    `;
  });

  // Chart
  const labels = data.traffic.map(t => t.date);
  const users = data.traffic.map(t => t.users);

  new Chart(document.getElementById("trafficChart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Users",
        data: users
      }]
    }
  });
}
