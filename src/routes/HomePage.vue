<template>
  <div class="backtint">
    <h2>M1-M7 Sample Lesson Videos</h2>
    <StandardGrid v-slot="{ item }" :items="sampleLessonVideos" @select="open">
      <!-- Include title and icon -->
      <img v-if="item.image" :src="item.image" :alt="item.title" height="128" />
      <svg-icon v-else :path="(item as any).icon" type="mdi" size="128" />
      <h3 class="book-card_title">
        {{ item.title }}
      </h3>
    </StandardGrid>
  </div>
  <div class="backtint">
    <h2>M1-M7 Teaching Aids</h2>
    <StandardGrid v-slot="{ item }" :items="teachingAids" @select="open">
      <!-- Include title and icon -->
      <img v-if="item.image" :src="item.image" :alt="item.title" height="128" />
      <svg-icon v-else :path="(item as any).icon" type="mdi" size="128" />
      <h3 class="book-card_title">
        {{ item.title }}
      </h3>
    </StandardGrid>
  </div>
  <div class="backtint">
    <h2>ELTTP Supplements</h2>
    <StandardGrid v-slot="{ item }" :items="elttpSupplements" @select="open">
      <!-- Include title and icon -->
      <img v-if="item.image" :src="item.image" :alt="item.title" height="128" />
      <svg-icon v-else :path="(item as any).icon" type="mdi" size="128" />
      <h3 class="book-card_title">
        {{ item.title }}
      </h3>
    </StandardGrid>
  </div>
  <div class="backtint">
    <h2>Teaching Reading</h2>
    <PhonicsGrid />
  </div>
</template>
<script setup lang="ts">
import StandardGrid from "../components/cardgrid/StandardGrid.vue";
// @ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";
import { useRouter } from "vue-router";
import PhonicsGrid from "../components/phonics/PhonicsGrid.vue";

const sampleLessonVideos: {
  title: string;
  icon?: string;
  image?: string;
  path: string;
}[] = [];
sampleLessonVideos.push({
  title: "Sample Lesson Videos",
  // icon: mdiPlay,
  image: "/samplelessonscover.jpg",
  path: "/sample-lessons",
});
const teachingAids: {
  title: string;
  icon?: string;
  image?: string;
  path: string;
}[] = [];
teachingAids.push({
  title: "Audio for M1-M7 Textbooks",
  // icon: mdiVolumeHigh,
  image: "/bookCovers/sectioncover.png",
  path: "/textbook-audio",
});
teachingAids.push({
  title: "Activities",
  image: "/activities/cover.jpg",
  path: "/activities",
});
teachingAids.push({
  title: "Manipulatives",
  // icon: mdiDraw,
  image: "/manipulativescover.jpg",
  path: "/manipulatives",
});
teachingAids.push({ title: "Songs", image: "/songscover.jpg", path: "/songs" });

const elttpSupplements: {
  title: string;
  icon?: string;
  image?: string;
  path: string;
}[] = [];
elttpSupplements.push({
  title: "Supplement Books",
  // icon: mdiBookPlus,
  image: "/bookCovers/lesson-plans/sectioncover.png",
  path: "/supplement-books",
});
elttpSupplements.push({
  title: "Audio for Supplements",
  // icon: mdiVolumeHigh,
  image: "/supplementaudiocover.jpg",
  path: "/supplement-audio",
});

const router = useRouter();
function open(item: { path: string }) {
  router.push(item.path + "/");
}
</script>
<style scoped>
h2 {
  font-size: 2.5em;
  line-height: 1;
  padding-left: 0.3em;
  margin-block: 0.5em;
}
.backtint {
  background-color: var(--backtint-color);
  border-radius: 10px;
  padding: 3px;
  padding-bottom: 7px;
  margin: 10px 0 10px 0;
}
h3 {
  margin-block-end: 0.5em;
}
</style>
