<template>
  <div id="map" ref="mapEl"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'

const mapEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!mapEl.value) return

  // 1. Create map (temporary default view)
  const map = L.map(mapEl.value).setView([0, 0], 2)

  // 2. Load OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // 3. Ask for user location
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude

      const userLatLng = [lat, lng] as [number, number]

      // 4. Move map to user location
      map.setView(userLatLng, 16)

      // 5. Add marker
      L.marker(userLatLng)
        .addTo(map)
        .bindPopup('📍 You are here')
        .openPopup()
    },
    (error) => {
      console.error('Location error:', error)
      alert('Unable to get your location')
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  )
})
</script>

<style scoped>
#map {
  height: 400px;
  width: 100%;
  border-radius: 12px;
}
</style>