<template>
  <div v-if="category">
    <YoutubeDropdownCycle :category="category" />
  </div>
  <p v-else>Activity {{ game }} does not exist!</p>
</template>
<script setup lang="ts">
import jsonData from "../../data.json";
import { YoutubeData } from "../../types";
import YoutubeDropdownCycle from "../YoutubeDropdownCycle.vue";

const props = defineProps<{ game: string }>();
const category = (jsonData as YoutubeData).activities.categories.find(
  (c) => c.name === props.game
);
// const selected = ref(category?.videos[0]);
</script>
