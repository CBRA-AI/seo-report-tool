async function generate() {
  const url = document.getElementById("url").value;

  const res = await fetch("http://localhost:3000/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ website: url })
  });

  const data = await res.json();

  document.getElementById("output").innerText =
    JSON.stringify(data, null, 2);
}
