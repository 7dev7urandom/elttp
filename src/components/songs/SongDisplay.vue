<template>
  <div v-if="category" class="song-display">
    <YoutubeDropdownCycle :category="category" @select="selected = $event" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p id="lyrics" v-html="lyrics"></p>
  </div>
  <p v-else>No songs in this category</p>
</template>
<script setup lang="ts">
import YoutubeDropdownCycle from "../YoutubeDropdownCycle.vue";
import data from "../../data.json";
import { YoutubeData } from "../../types";
import { computed, ref } from "vue";

const props = defineProps<{
  categoryName: string;
}>();

const category = (data as YoutubeData).songs.categories.find(
  (c) => c.name === props.categoryName
);
const selected = ref(category?.videos[0]);
const lyrics = computed(
  () =>
    selected.value?.lyrics.replaceAll("\n", "<br />") ||
    `No lyrics for
      ${selected.value!.title}`
);
</script>
<style scoped>
@media screen and (min-width: 1200px) {
  .song-display {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  #lyrics {
    width: 30%;
  }
}
.song-display {
  width: 100%;
}
#lyrics {
  margin: 10px;
  /* font-weight: bold; */
}
</style>
