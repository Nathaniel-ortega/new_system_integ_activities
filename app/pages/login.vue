<template>
  <v-container fluid class="login-bg d-flex align-center justify-center">

    <v-card class="login-card pa-8" elevation="18" rounded="xl">

      <!-- Header -->
      <div class="text-center mb-6">

        <v-avatar size="90" color="primary" class="mb-4">
          <v-icon size="50" color="white">
            mdi-account-circle
          </v-icon>
        </v-avatar>

        <h1 class="text-h4 font-weight-bold">
          Welcome Back 👋
        </h1>

        <p class="text-subtitle-1 text-grey-darken-1 mt-2">
          Please sign in to continue
        </p>

      </div>

      <!-- Form -->
      <v-form>
        <v-text-field
          label="Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          rounded="lg"
        />

        <v-text-field
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock-outline"
          append-inner-icon="mdi-eye-off"
          variant="outlined"
          rounded="lg"
        />
      </v-form>

      <!-- Login Button -->
      <v-btn
        color="primary"
        block
        size="large"
        rounded="xl"
        class="mt-3"
      >
        Login
      </v-btn>

      <!-- Divider -->
      <v-divider class="my-6">
        OR
      </v-divider>

      <!-- Google Login Button (FIXED & VISIBLE) -->
      <v-btn
        block
        color="#DB4437"
        size="large"
        rounded="xl"
        class="google-btn"
        prepend-icon="mdi-google"
        @click="loginWithGoogle"
      >
        Sign in with Google
      </v-btn>

    </v-card>

  </v-container>
</template>

<script setup lang="ts">
// @ts-nocheck

definePageMeta({
  middleware: 'auth'
})

const config = useRuntimeConfig()

declare global {
  interface Window {
    google: any
  }
}

const loginWithGoogle = () => {
  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: config.public.googleClientId,
    scope: "openid email profile",

    callback: async (response: any) => {
      const userInfo = await $fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        }
      )

      localStorage.setItem("google_user", JSON.stringify(userInfo))
      localStorage.setItem("google_token", response.access_token)

      navigateTo("/")
    },
  })

  client.requestAccessToken()
}
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.login-card {
  width: 100%;
  max-width: 430px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 25px;
  transition: 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
}

.google-btn {
  color: white !important;
  font-weight: 600;
  text-transform: none;
  box-shadow: 0 6px 18px rgba(219, 68, 55, 0.35);
}

.google-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(219, 68, 55, 0.45);
}

.v-btn {
  text-transform: none;
  font-weight: 600;
  height: 50px;
}

h1 {
  color: #1565C0;
}

@media (max-width: 600px) {
  .login-card {
    margin: 20px;
    padding: 25px !important;
  }

  h1 {
    font-size: 30px !important;
  }
}
</style>