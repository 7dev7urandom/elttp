<script setup lang="ts">
import ChooserGrid from '../components/ChooserGrid.vue';
</script>

<template>
  <!-- Start with a title -->
  <ChooserGrid />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
h1 {
  animation: fadeIn 2ms ease-in 2ms forwards;
  opacity: 0;
  margin: 0;
  font-size: 1.5em;
  text-size-adjust: none;
}
@keyframes fadeIn {
    0%, 1% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
