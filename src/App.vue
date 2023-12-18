<script setup lang="ts">
import Navigation from "./components/NavigationBar.vue";
</script>

<template>
  <h1 @click="$router.push('/')">ELTTP English for Secondary Schools, Laos</h1>
  <Navigation />
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view />
</template>
