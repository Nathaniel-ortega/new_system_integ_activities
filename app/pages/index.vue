<template>
  <v-container fluid class="background d-flex align-center justify-center">
    <v-card class="profile-card pa-6" elevation="15" rounded="xl">

      <!-- Profile -->
      <div class="text-center">
        <v-avatar size="120" class="avatar mb-4">
          <v-img :src="user?.picture" alt="Profile Picture" />
        </v-avatar>

        <h1 class="text-h4 font-weight-bold">
          Welcome Back 👋
        </h1>

        <p class="text-subtitle-1 text-grey-darken-1 mt-2">
          Glad to see you again!
        </p>
      </div>

      <v-divider class="my-5" />

      <!-- User Info -->
      <div class="text-center">
        <h2 class="text-h5 font-weight-bold">
          {{ user?.name || user?.displayName }}
        </h2>

        <p class="text-body-1 text-grey-darken-1 mt-2">
          {{ user?.email }}
        </p>
      </div>

      <!-- Map -->
      <div class="map-container">
        <ClientOnly>
          <Map />
        </ClientOnly>
      </div>

      <!-- Buttons -->
      <v-row class="mt-5" dense>
        <v-col cols="12">
          <v-btn
            block
            color="primary"
            size="large"
            rounded="xl"
            prepend-icon="mdi-qrcode-scan"
            @click="goToScanner"
          >
            Open QR Scanner
          </v-btn>
        </v-col>

        <!-- ✅ WEATHER BUTTON ADDED -->
        <v-col cols="12">
          <v-btn
            block
            color="info"
            size="large"
            rounded="xl"
            prepend-icon="mdi-weather-partly-cloudy"
            @click="goToWeather"
          >
            Weather Dashboard
          </v-btn>
        </v-col>

        <v-col cols="12">
          <v-btn
            block
            color="error"
            size="large"
            rounded="xl"
            prepend-icon="mdi-logout"
            @click="logout"
          >
            Logout
          </v-btn>
        </v-col>
      </v-row>

    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'


definePageMeta({

  middleware: 'auth'
})

const user = ref<any>(null)

onMounted(() => {
  const savedUser = localStorage.getItem('google_user')

  if (!savedUser) {
    navigateTo('/login')
    return
  }

  user.value = JSON.parse(savedUser)
})

// Go to QR Scanner
const goToScanner = () => {
  navigateTo('/qrscanner')
}

// ✅ GO TO WEATHER PAGE
const goToWeather = () => {
  navigateTo('/sample-weather')
}

// Logout
const logout = () => {
  localStorage.removeItem('google_user')
  localStorage.removeItem('google_token')

  window.google?.accounts.id.disableAutoSelect()

  navigateTo('/login')
}
</script>

<style scoped>
.background {
  min-height: 100vh;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.profile-card {
  width: 100%;
  max-width: 550px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  transition: 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
}

.avatar {
  border: 5px solid #1976d2;
  box-shadow: 0 10px 25px rgba(25, 118, 210, 0.35);
}

.map-container {
  margin-top: 25px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.v-btn {
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: .5px;
  height: 50px;
}

h1 {
  color: #1565c0;
}

h2 {
  color: #263238;
}

.text-grey-darken-1 {
  color: #616161;
}

@media (max-width: 600px) {
  .profile-card {
    padding: 20px !important;
  }

  .avatar {
    width: 100px !important;
    height: 100px !important;
  }

  h1 {
    font-size: 1.8rem !important;
  }

  h2 {
    font-size: 1.3rem !important;
  }
}
</style>