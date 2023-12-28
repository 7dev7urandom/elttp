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
    <div v-if="props.category.videos.length > 1" class="dropdown">
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
      <span>
        Click on
        <svg
          id="Layer_1"
          fill="currentColor"
          width="16px"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xml:space="preserve"
        >
          <path
            id="XMLID_225_"
            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
          />
        </svg>
        for more videos
      </span>
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
  /* margin: 20px 0 0 0; */
  width: 100%;
  margin-right: 5px;
}
select {
  padding: 15px;
  font-size: 1.2em;
}
.dropdown {
  display: flex;
  flex-direction: row;
  margin: 20px 0 0 0;
  width: 100%;
}
img {
  display: inline;
}
svg {
  color: white;
  top: 3px;
  position: relative;
}
@media (prefers-color-scheme: light) {
  svg {
    color: black;
  }
}
</style>
