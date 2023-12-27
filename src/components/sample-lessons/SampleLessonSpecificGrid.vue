<script setup lang="ts">
import data from "../../data.json";
import StandardGrid from "../cardgrid/StandardGrid.vue";
import { YoutubeData } from "../../types";

const props = defineProps<{
  category: string;
}>();

const items =
  (data as YoutubeData).sampleLessons.categories.find(
    (c) => c.name === props.category
  )?.videos || [];
function openVideo(vId: string) {
  window.location.assign(
    `https://youtube.com/watch?v=${vId}&list=${
      (data as YoutubeData).sampleLessons.playlistId
    }`
  );
}
</script>
<template>
  <StandardGrid
    v-if="items.length > 0"
    :items="items"
    @select="(s) => openVideo(s.videoId)"
  />
  <p v-else>No videos in this category</p>
</template>
