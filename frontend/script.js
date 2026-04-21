async function generate() {
  const url = document.getElementById("url").value;

  const res = await fetch("https://seo-report-api.onrender.com/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ website: url })
  });

  const data = await res.json();

  // Summary
  document.getElementById("summary").innerHTML = `
    Users: ${data.users} <br>
    Sessions: ${data.sessions}
  `;

  // Keywords table
  let rows = "";
  data.keywords.forEach(k => {
    rows += `<tr>
      <td>${k.keyword}</td>
      <td>${k.position}</td>
      <td>${k.page}</td>
    </tr>`;
  });

  document.getElementById("keywordTable").innerHTML = rows;

  // Chart
  const ctx = document.getElementById('trafficChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Users', 'Sessions'],
      datasets: [{
        label: 'Traffic',
        data: [data.users, data.sessions]
      }]
    }
  });
}
