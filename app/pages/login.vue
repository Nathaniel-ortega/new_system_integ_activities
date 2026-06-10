<template>
  <div style="text-align: center; margin-top: 50px;">
    <v-card style="max-width: 400px; margin: 50px auto; padding: 20px;">
      <p style="font-weight: bold; font-size: x-large;">Login</p>
      <p>Welcome Back, Please Login</p>

      <v-form> 
        <v-text-field label="Email"></v-text-field>
        <v-text-field label="Password"></v-text-field>
      </v-form>

      <v-btn>Login</v-btn>
      <div class="mt-8">OR</div>
      <v-btn>Sign in with Google</v-btn>
    
    
   </v-card>
     
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>