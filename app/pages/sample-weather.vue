<template>
  <div class="weather-wrapper">

    <div class="forecast-container" v-if="forecast">

      <!-- FEATURED: TODAY -->
      <div class="weather-card featured">

        <div class="card-header">
          <p class="eyebrow">Current conditions</p>
          <h1 class="city">
            {{ forecast?.location?.name }}
          </h1>
          <p class="today-date">{{ formattedDate }}</p>
        </div>

        <svg class="wave-divider" viewBox="0 0 320 24" preserveAspectRatio="none">
          <path d="M0,12 C40,24 80,0 120,12 C160,24 200,0 240,12 C280,24 300,6 320,12 L320,24 L0,24 Z" />
        </svg>

        <div class="condition-block">
          <div class="icon-halo">
            <img
              :src="'https:' + forecast?.current?.condition?.icon"
              alt="weather icon"
              class="weather-icon"
            />
          </div>
          <p class="condition">
            {{ forecast?.current?.condition?.text }}
          </p>
        </div>

        <div class="temp">
          {{ Math.round(forecast?.current?.temp_c) }}<span class="deg">°C</span>
        </div>

        <div class="humidity">
          <span class="humidity-dot"></span>
          Humidity {{ forecast?.current?.humidity }}%
        </div>

      </div>

      <!-- 7-DAY STRIP -->
      <div class="forecast-strip">
        <div
          class="day-card"
          v-for="(day, index) in forecastDays"
          :key="day.date"
          :class="{ 'is-today': index === 0 }"
        >
          <p class="day-label">{{ index === 0 ? 'Today' : formatDay(day.date) }}</p>

          <img
            :src="'https:' + day.day.condition.icon"
            :alt="day.day.condition.text"
            class="day-icon"
          />

          <div class="day-temps">
            <span class="temp-high">{{ Math.round(day.day.maxtemp_c) }}°</span>
            <span class="temp-low">{{ Math.round(day.day.mintemp_c) }}°</span>
          </div>

          <div class="day-rain" v-if="day.day.daily_chance_of_rain > 0">
            <span class="rain-dot"></span>
            {{ day.day.daily_chance_of_rain }}%
          </div>
        </div>
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

const forecast = ref(null)

const forecastDays = computed(() => forecast.value?.forecast?.forecastday ?? [])

// Uses the location's own local time from the API (not the visitor's
// device clock), so the date shown matches the city being displayed.
const formattedDate = computed(() => {
  const localtime = forecast.value?.location?.localtime
  if (!localtime) return ''

  const [datePart] = localtime.split(' ')
  const [y, m, d] = datePart.split('-').map(Number)
  const date = new Date(y, m - 1, d)

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })
})

const formatDay = (dateStr) => {
  // Parse as local date to avoid timezone off-by-one on the date string
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

const getWeatherData = async () => {
  try {
    // Note: WeatherAPI's free tier caps forecast at 3 days.
    // days=7 requires a paid plan; the API will silently clamp
    // to whatever your plan allows if you're on the free tier.
    const data = await $fetch(
      'https://api.weatherapi.com/v1/forecast.json?key=ad18a4169e6348568b140400262906&q=Manila&days=7&aqi=no&alerts=no'
    )

    forecast.value = data
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  getWeatherData()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Manrope:wght@400;500;700&display=swap');

/* 🌊 BACKGROUND */
.weather-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  font-family: 'Manrope', sans-serif;

  background:
    linear-gradient(160deg, rgba(11, 37, 69, 0.55) 0%, rgba(19, 78, 111, 0.35) 45%, rgba(255, 138, 91, 0.25) 100%),
    url('/images/ocean.jpg');

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.forecast-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 100%;
  max-width: 340px;
}

/* 📦 FEATURED CARD */
.weather-card.featured {
  background: linear-gradient(180deg, rgba(11, 37, 69, 0.55) 0%, rgba(19, 78, 111, 0.45) 100%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 36px 40px 32px;
  border-radius: 24px;
  text-align: center;
  width: 320px;
  box-shadow: 0 25px 60px rgba(4, 15, 30, 0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  animation: rise 0.6s ease both;
}

.weather-card.featured:hover {
  transform: translateY(-4px);
  box-shadow: 0 30px 70px rgba(4, 15, 30, 0.55);
}

@keyframes rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .weather-card.featured { animation: none; }
  .weather-card.featured:hover { transform: none; }
}

.card-header {
  margin-bottom: 4px;
}

.eyebrow {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 200, 87, 0.85);
  font-weight: 700;
  margin: 0 0 6px;
}

.city {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 600;
  color: #F7FAFC;
  margin: 0;
  letter-spacing: 0.01em;
}

.today-date {
  font-size: 13px;
  font-weight: 500;
  color: rgba(247, 250, 252, 0.6);
  margin: 4px 0 0;
}

.wave-divider {
  width: 100%;
  height: 18px;
  margin: 10px 0 6px;
  display: block;
}

.wave-divider path {
  fill: none;
  stroke: rgba(255, 200, 87, 0.55);
  stroke-width: 2;
  stroke-linecap: round;
}

.condition-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px 0 6px;
}

.icon-halo {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 200, 87, 0.28) 0%, rgba(255, 200, 87, 0) 70%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-icon {
  width: 64px;
  height: 64px;
}

.condition {
  font-size: 15px;
  font-weight: 500;
  color: rgba(247, 250, 252, 0.9);
  margin: 4px 0 0;
}

.temp {
  font-family: 'Fraunces', serif;
  font-size: 56px;
  font-weight: 600;
  line-height: 1;
  margin: 10px 0 14px;
  background: linear-gradient(180deg, #FFC857 0%, #FF8A5B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.deg {
  font-size: 26px;
  font-weight: 400;
  vertical-align: super;
}

.humidity {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(247, 250, 252, 0.75);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 14px;
  border-radius: 999px;
}

.humidity-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7DD3FC;
  box-shadow: 0 0 6px rgba(125, 211, 252, 0.8);
}

/* 📅 7-DAY STRIP */
.forecast-strip {
  display: flex;
  gap: 10px;
  width: 100%;
  overflow-x: auto;
  padding: 4px 2px 10px;
  scroll-snap-type: x proximity;

  scrollbar-width: thin;
  scrollbar-color: rgba(255, 200, 87, 0.5) transparent;
}

.forecast-strip::-webkit-scrollbar {
  height: 5px;
}

.forecast-strip::-webkit-scrollbar-thumb {
  background: rgba(255, 200, 87, 0.5);
  border-radius: 999px;
}

.day-card {
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 76px;
  background: rgba(11, 37, 69, 0.38);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 14px 8px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.day-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 200, 87, 0.4);
}

.day-card.is-today {
  border-color: rgba(255, 200, 87, 0.55);
  background: rgba(19, 78, 111, 0.5);
}

.day-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: rgba(247, 250, 252, 0.85);
  margin: 0;
  text-transform: uppercase;
}

.day-icon {
  width: 40px;
  height: 40px;
}

.day-temps {
  display: flex;
  gap: 6px;
  font-family: 'Fraunces', serif;
  font-size: 14px;
}

.temp-high {
  color: #FFC857;
  font-weight: 600;
}

.temp-low {
  color: rgba(247, 250, 252, 0.55);
}

.day-rain {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  color: rgba(125, 211, 252, 0.9);
}

.rain-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #7DD3FC;
}
</style>