let parcels = JSON.parse(localStorage.getItem("parcels")) || [];

function loadParcels(filtered = parcels) {
  let list = document.getElementById("parcelList");
  if (!list) return;

  list.innerHTML = "";

  let deliveredCount = 0;
  let deliveredAmount = 0;

  filtered.forEach((p, i) => {
    if (p.status === "Delivered") {
      deliveredCount++;
      deliveredAmount += Number(p.amount);
    }

    let li = document.createElement("li");

    li.innerHTML = `
  <b>${p.cn}</b> - ${p.name}<br>
  Rs. ${p.amount} |
  <span class="status ${p.status}">${p.status}</span><br>

  <a href="tel:${p.contact}">📞 Call</a> |
  <a href="https://wa.me/${p.contact}" target="_blank">💬 WhatsApp</a>
`;

    li.onclick = () => {
      localStorage.setItem("selectedIndex", i);
      location.href = "detail.html";
    };

    list.appendChild(li);
  });

  document.getElementById("deliveredCount").innerText = deliveredCount;
  document.getElementById("deliveredAmount").innerText = deliveredAmount;
}
function searchParcel() {
function filterStatus(status) {
  if (status === "All") {
    loadParcels(parcels);
    return;
  }

  let result = parcels.filter(p => p.status === status);
  loadParcels(result);
}
  let q = document.getElementById("searchInput").value.toLowerCase();

  let result = parcels.filter(p =>
    p.cn.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q)
  );

  loadParcels(result);
}