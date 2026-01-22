function saveParcel() {
  let cn = document.getElementById("cn").value;
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let contact = document.getElementById("contact").value;
  let amount = document.getElementById("amount").value;
  let status = document.getElementById("status").value;

  if (!cn || !name || !contact || !amount) {
    alert("All fields required hain");
    return;
  }

  let parcels = JSON.parse(localStorage.getItem("parcels")) || [];

  parcels.push({
    cn,
    name,
    address,
    contact,
    amount,
    status
  });

  localStorage.setItem("parcels", JSON.stringify(parcels));
  location.href = "dashboard.html";
}