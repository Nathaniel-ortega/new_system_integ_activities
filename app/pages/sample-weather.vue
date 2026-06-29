<template>
  <div class="weather-wrapper">

    <div class="weather-card" v-if="currentWeather">

      <h1 class="city">
        {{ currentWeather?.location?.name }}
      </h1>

      <img
        :src="'https:' + currentWeather?.current?.condition?.icon"
        alt="weather icon"
        class="weather-icon"
      />

      <p class="condition">
        {{ currentWeather?.current?.condition?.text }}
      </p>

      <div class="temp">
        {{ currentWeather?.current?.temp_c }}°C
      </div>

      <div class="humidity">
        Humidity: {{ currentWeather?.current?.humidity }}%
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
//@ts-nocheck

definePageMeta({
  layout: 'weather',
  middleware: 'auth'
})

const currentWeather = ref(null)

const getWeatherData = async () => {
  try {
    const data = await $fetch(
      'http://api.weatherapi.com/v1/current.json?key=ad18a4169e6348568b140400262906&q=Manila&aqi=no'
    )

    currentWeather.value = data
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  getWeatherData()
})
</script>

<style scoped>
/* 🌊 BACKGROUND IMAGE */
.weather-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background: 
    linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)),
    url('/images/ocean.jpg');

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 📦 CARD */
.weather-card {
  background: rgba(255, 255, 255, 0.92);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  width: 320px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  transition: 0.3s ease;
}

.weather-card:hover {
  transform: translateY(-5px);
}

/* 🌍 CITY */
.city {
  font-size: 24px;
  font-weight: bold;
  color: #1976d2;
}

/* 🌤 ICON */
.weather-icon {
  width: 80px;
  height: 80px;
  margin: 10px 0;
}

/* ☁ CONDITION */
.condition {
  font-size: 16px;
  font-weight: 500;
  color: #444;
}

/* 🌡 TEMP */
.temp {
  font-size: 48px;
  font-weight: bold;
  color: #ff9800;
  margin: 10px 0;
}

/* 💧 HUMIDITY */
.humidity {
  font-size: 16px;
  color: #555;
}
</style>