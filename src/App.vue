<script setup lang="ts">
import Navigation from "./components/NavigationBar.vue";
</script>

<template>
  <h1 @click="$router.push('/')">ELTTP English for Secondary Schools, Laos</h1>
  <img src="/logo.jpg" alt="ELIC Logo" />
  <Navigation />
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view />
</template>
<style scoped>
img {
  width: 3em;
  float: right;
  position: relative;
  right: 5px;
  bottom: -20px;
}
h1::after {
  /* margin-block-end: 0.2em; */
  /* background-image: url("/logo.png");
  width: 50px;
  height: 50px;
  content: ""; */
}
</style>
