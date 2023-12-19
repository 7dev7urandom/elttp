<template>
  <h2>
    {{
      game
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")
    }}
  </h2>
  <StandardGrid :items="allGameVideos" @select="loadVideo" />
</template>
<script setup lang="ts">
import StandardGrid from "../cardgrid/StandardGrid.vue";
import jsonData from "../../data.json";
import { YoutubeData } from "../../types";

const props = defineProps<{ game: string }>();

const allGameVideos = (jsonData as YoutubeData).activities.categories.find(
  (g) => g.name === props.game
)!.videos;
function loadVideo(v: { title: string; videoId: string }) {
  window.location.assign(
    "https://youtube.com/watch?v=" +
      v.videoId +
      "&list=" +
      (jsonData as YoutubeData).activities.playlistId
  );
}
</script>
