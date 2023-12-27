<script setup lang="ts">
import StandardGrid from "../cardgrid/StandardGrid.vue";
import data from "../../data.json";
import { YoutubeData } from "../../types";

const items = (data as YoutubeData).sampleLessons.categories.map(
  (category) => ({
    title: category.name,
  })
);
</script>
<template>
  <StandardGrid :items="items" @select="(s: any) => $router.push(s.title)" />
</template>
