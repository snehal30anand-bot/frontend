let map;

function showMap() {
  document.getElementById("mapBox").style.display = "block";
  document.getElementById("latlngBox").style.display = "none";


  if (map) return;

  map = L.map("map").setView([20, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  map.on("click", function (e) {
    document.getElementById("lat").innerText =
      e.latlng.lat.toFixed(6);
    document.getElementById("lng").innerText =
      e.latlng.lng.toFixed(6);

    L.marker(e.latlng).addTo(map);
  });
}

function showLatLng() {
  document.getElementById("latlngBox").style.display = "block";
  document.getElementById("mapBox").style.display = "none";
}
// Normal map
const normalLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);

// Satellite map
const satelliteLayer = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
);

// Default
normalLayer.addTo(map);

function searchLocation() {
  const place = document.getElementById("searchBox").value;

  if (!place) {
    alert("Please enter a location");
    return;
  }

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        alert("Location not found");
        return;
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      // Move map
      map.setView([lat, lon], 12);

      // Marker
      L.marker([lat, lon]).addTo(map);

      // Switch to satellite
      map.removeLayer(normalLayer);
      satelliteLayer.addTo(map);

      // Update lat/lng
      document.getElementById("lat").innerText = lat;
      document.getElementById("lng").innerText = lon;
    });
}
