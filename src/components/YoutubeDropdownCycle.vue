<script setup lang="ts" generic="T extends SimpleVideo">
import { computed, ref } from "vue";
import { CategorizedVideos, SimpleVideo } from "../types";

// Takes in a CategorizedVideos type and embeds the first video in that category
// using a dropdown menu to cycle through the videos.

const props = defineProps<{
  category: CategorizedVideos<T>["categories"][0];
}>();

defineEmits(["select"]);

const currentVideo = ref(props.category.videos[0].videoId);
const currentVideoObj = computed(
  () => props.category.videos.find((v) => v.videoId === currentVideo.value)!
);
</script>
<template>
  <!-- Embed Youtube video -->
  <div class="outer">
    <div class="wrapper">
      <div class="inner">
        <iframe
          :src="`https://www.youtube.com/embed/${currentVideo}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&cc_load_policy=1`"
          :title="currentVideoObj.title"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <!-- Dropdown menu to cycle through videos -->
    <div v-if="props.category.videos.length > 1">
      <select
        id="videoSelection"
        v-model="currentVideo"
        @change="$emit('select', currentVideoObj)"
      >
        <option
          v-for="video in props.category.videos"
          :key="video.videoId"
          :value="video.videoId"
        >
          {{ video.title }}
        </option>
      </select>
    </div>
  </div>
</template>
<style scoped>
.wrapper > .inner {
  /* width: calc(50vh * 1.76);
  min-height: 50vh; */
  /* width: 100%; */
  /* height: calc(99vw / 1.76); */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}
iframe {
  width: 100%;
  height: 100%;
}
.outer {
  max-width: 1000px;
  flex-grow: 1;
}
.wrapper {
  width: 100%;
  padding-bottom: 56.25%;
  /* background: blue; */
  position: relative;
}
#videoSelection {
  margin: 20px 0 0 0;
  width: 100%;
}
</style>
