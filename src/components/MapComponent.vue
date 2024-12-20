<template>
    <div id="map" style="height: 400px;"></div>
  </template>
  
  <script>
  import L from 'leaflet';
  
  export default {
    name: "MapComponent",
    mounted() {
      // Initialiser la carte avec Leaflet
      const map = L.map('map').setView([25.7617, -80.1918], 10); // Exemple pour Miami
  
      // Ajouter une couche de tuiles (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
      // Ajouter un marqueur sur la carte
      L.marker([25.7617, -80.1918]).addTo(map)
        .bindPopup('Miami')
        .openPopup();
    }
  };
  </script>
  