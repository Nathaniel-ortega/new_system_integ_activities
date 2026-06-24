<template>
  <div style="text-align: center; margin-top: 50px">
    <v-card style="max-width: 400px; margin: 50px auto; padding: 20px">
      <p style="font-weight: bold; font-size: x-large">Login</p>
      <p>Welcome Back, Please Login</p>

      <v-form>
        <v-text-field label="Email"></v-text-field>
        <v-text-field label="Password"></v-text-field>
      </v-form>

      <v-btn>Login</v-btn>
      <div class="mt-8">OR</div>
      <v-btn @click="loginWithGoogle">Sign in with Google</v-btn>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
//@ts-nocheck
definePageMeta({ 
  middleware: 'auth'
})

const config = useRuntimeConfig();

declare global {
  interface Window {
    google: any;
  }
}

const loginWithGoogle = () => {
  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: config.public.googleClientId,
    scope: "openid email profile",
    callback: async (respone: any) => {
      const userInfo = await $fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${respone.access_token}`,
          },
        }
      );
      localStorage.setItem("google_user", JSON.stringify(userInfo));
      localStorage.setItem("google_token", respone.access_token);

      navigateTo("/");
    },
  });
  client.requestAccessToken();
   localStorage.setItem("google_user", JSON.stringify(userInfo));
      localStorage.setItem("google_token", respone.access_token);

      navigateTo("/");
};
</script>

<style>
</style>