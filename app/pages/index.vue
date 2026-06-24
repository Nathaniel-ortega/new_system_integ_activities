<template>
  <div>
 
    <v-card style="max-width: 400px; margin: 50px auto; padding: 20px">
      
      <!-- Profile Picture -->
      <v-avatar size="120" class="mb-4">
        <v-img
          :src="user?.picture"
          alt="Profile Picture"
        />
      </v-avatar>

      <!-- Welcome Text -->
      <h1 class="text-h4 font-weight-bold mb-2">
        Welcome Back 👋
      </h1>

      <v-divider class="my-4"></v-divider>

      <!-- User Information -->
      <h2 class="text-h5 font-weight-medium">
        {{ user?.name || user?.displayName }}
      </h2>

      <p class="text-body-1 text-grey-darken-1 mt-2">
        {{ user?.email }}
      </p>

      <!-- Logout Button -->
      <v-btn
        color="error"
        size="large"
        rounded="pill"
        class="mt-6"
        prepend-icon="mdi-logout"
        @click="logout"
      >
        Logout
      </v-btn>
   
    </v-card>
  
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck

import { onMounted } from "vue"

definePageMeta({ 
  middleware: 'auth'
})


const logout = () => { 
  localStorage.removeItem('google_user')
  localStorage.removeItem('google_token')
  window.google?.accounts.id.disableAutoSelect()
  navigateTo('/login')
}

const user = ref<any>(null)
onMounted(() => { 
  const savedUser = localStorage.getItem('google_user')

  if (!savedUser){ 
    navigateTo('/login')
    return
  }


  user.value = JSON.parse(savedUser)
})

</script>



<style>

</style>