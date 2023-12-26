<template>
  <StandardGrid :items="[{ title: 'Activities Document' }]" @select="openDoc">
    <div class="book-card_content">
      <img src="/activities/cover.jpg" alt="Activities book cover" />

      <div class="flexhor">
        <h3 class="book-card_title">Activities Document</h3>
        <div v-if="isMobile()" id="divider"></div>
        <svg-icon
          v-if="isMobile()"
          :path="mdiDownload"
          type="mdi"
          size="32"
          class="downloadicon"
          @click="downloadMobile"
        />
      </div>
    </div>
  </StandardGrid>
  <h2>Games</h2>
  <StandardGrid
    :items="items"
    @select="(a: any) => $router.push(encodeURIComponent(a.link))"
  />
</template>
<script setup lang="ts">
import jsonData from "../../data.json";
import { YoutubeData } from "../../types";
import StandardGrid from "../cardgrid/StandardGrid.vue";
import { isMobile } from "../../util";
import { useRouter } from "vue-router";
// @ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiDownload } from "@mdi/js";

const items = (jsonData as YoutubeData).activities.categories.map((game) => ({
  title: game.name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" "),
  link: game.name,
}));
const router = useRouter();
function openDoc() {
  // setTimeout(() => {
  console.log("openDoc", isMobile());
  if (isMobile())
    // Stupid hack to get around the whole button click triggering before the download button click
    setTimeout(() => router.push("/mobile-viewer/activities/Activities"), 100);
  else window.location.assign("Activities.pdf");
  // }, 10);
}
function downloadMobile() {
  window.location.assign("Activities.pdf");
}
</script>
<style scoped>
#divider {
  width: 1px;
  height: 2.5em;
  background-color: var(--card-border-color);
  float: right;
  position: relative;
}
.downloadicon {
  float: right;
  padding: 7px 23px 7px 14px;
}
#activitydoc {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flexhor {
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110%;
  padding-left: 10%;
  padding-right: 10%;
  /* background-color: #666; */
  position: relative;
  top: 10px;
}
.book-card_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.book-card_title {
  margin: 0;
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
  flex-grow: 1;
}
/* .grid_item {
  display: flex;
  align-items: center;
  justify-content: center;
  /* Allow to take up full space 
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: fadeIn 300ms forwards;
  animation-timing-function: ease-in;
  animation-delay: 100ms;
  position: relative;
} */
.card img {
  width: 100%;
  height: auto;
  max-width: 200px;
  object-fit: cover;
}
h3 {
  margin-block-end: 0;
}
</style>
