// Load parcels from storage
let parcels = JSON.parse(localStorage.getItem("parcels")) || [
  { cn: "CN001", sender: "Ali", receiver: "Ahmed", city: "Karachi", lat: 24.8607, lng: 67.0011 },
  { cn: "CN002", sender: "Sara", receiver: "Bilal", city: "Lahore", lat: 31.5204, lng: 74.3587 }
];
// ---------------- LOGIN ----------------
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("login", "yes");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginMsg").innerText = "Wrong username or password";
  }
}

function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

// ---------------- PARCEL DATA ----------------
let parcels = [
  { cn: "CN001", sender: "Ali", receiver: "Ahmed", city: "Karachi", lat: 24.8607, lng: 67.0011 },
  { cn: "CN002", sender: "Sara", receiver: "Bilal", city: "Lahore", lat: 31.5204, lng: 74.3587 },
  { cn: "CN003", sender: "Usman", receiver: "Zara", city: "Islamabad", lat: 33.6844, lng: 73.0479 }
];

// ---------------- DASHBOARD ----------------
function loadParcels() {
  let list = document.getElementById("parcelList");
  list.innerHTML = "";

  parcels.forEach(p => {
    let li = document.createElement("li");
    li.innerText = p.cn + " - " + p.receiver;
    li.onclick = function () {
      localStorage.setItem("selectedCN", p.cn);
      window.location.href = "detail.html";
    };
    list.appendChild(li);
  });
}

function searchParcel() {
  let text = document.getElementById("searchBox").value.toLowerCase();
  let list = document.getElementById("parcelList");
  list.innerHTML = "";

  parcels.filter(p => p.cn.toLowerCase().includes(text))
    .forEach(p => {
      let li = document.createElement("li");
      li.innerText = p.cn + " - " + p.receiver;
      li.onclick = function () {
        localStorage.setItem("selectedCN", p.cn);
        window.location.href = "detail.html";
      };
      list.appendChild(li);
    });
}

// ---------------- DETAIL PAGE ----------------
function loadParcelDetail() {
  let cn = localStorage.getItem("selectedCN");
  let p = parcels.find(x => x.cn === cn);
  if (!p) return;

  document.getElementById("parcelDetail").innerHTML = `
    <p><b>CN:</b> ${p.cn}</p>
    <p><b>Sender:</b> ${p.sender}</p>
    <p><b>Receiver:</b> ${p.receiver}</p>
    <p><b>City:</b> ${p.city}</p>
  `;

  let map = L.map("map").setView([p.lat, p.lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  L.marker([p.lat, p.lng]).addTo(map)
    .bindPopup(p.receiver)
    .openPopup();
}

function goBack() {
  window.location.href = "dashboard.html";
}

// ---------------- AUTO LOAD ----------------
if (document.getElementById("parcelList")) loadParcels();
if (document.getElementById("parcelDetail")) loadParcelDetail();
function saveParcel() {
  let cn = document.getElementById("cn").value;
  let sender = document.getElementById("sender").value;
  let receiver = document.getElementById("receiver").value;
  let city = document.getElementById("city").value;
  let lat = document.getElementById("lat").value;
  let lng = document.getElementById("lng").value;

  if (!cn || !receiver) {
    alert("CN and Receiver required");
    return;
  }

  parcels.push({
    cn, sender, receiver, city,
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  });

  localStorage.setItem("parcels", JSON.stringify(parcels));
  alert("Parcel Added Successfully");

  window.location.href = "dashboard.html";
}
