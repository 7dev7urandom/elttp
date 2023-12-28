<template>
  <StandardGrid
    v-slot="{ item }"
    :items="phonics"
    @select="(it) => $router.push(it.path + '/')"
  >
    <!-- Include title and icon -->
    <img v-if="item.image" :src="item.image" :alt="item.title" height="128" />
    <svg-icon v-else :path="(item as any).icon" type="mdi" size="128" />
    <h3 class="book-card_title">
      {{ item.title }}
    </h3>
  </StandardGrid>
</template>
<script setup lang="ts">
// @ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";
import StandardGrid from "../cardgrid/StandardGrid.vue";

const phonics: {
  title: string;
  icon?: string;
  image?: string;
  path: string;
}[] = [];
phonics.push({
  title: "Phonics Documents",
  image: "/phonics/documentcover.jpg",
  path: "/phonics/documents",
});
phonics.push({
  title: "Phonics Videos",
  image: "/phonics/cover.jpg",
  path: "/phonics/videos",
});
</script>
<style scoped>
#divider {
  width: 1px;
  height: 80%;
  background-color: var(--card-border-color);
  float: right;
  position: relative;
}
.downloadicon {
  float: right;
  padding: 15px 15px 15px 15px;
}
h3 {
  float: left;
  width: 80%;
}
.card_title {
  margin: 0;
  padding: 0.5em;
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
}
</style>
