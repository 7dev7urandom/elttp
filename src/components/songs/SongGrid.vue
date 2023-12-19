<script setup lang="ts">
import StandardGrid from "../cardgrid/StandardGrid.vue";
import { computed } from "vue";
import { YoutubeData } from "../../types";
import data from "../../data.json";
import { useRouter } from "vue-router";

// const props = defineProps<{ book: Book }>();

const items = computed(() => {
  return (data as YoutubeData).songs.categories.map((category) => ({
    title: category.name,
    ...category,
  }));
});

const router = useRouter();

function openSong(category: YoutubeData["songs"]["categories"][0]) {
  router.push(encodeURIComponent(category.name));
}
</script>
<template>
  <StandardGrid :items="items" @select="(s: any) => openSong(s)" />
</template>
