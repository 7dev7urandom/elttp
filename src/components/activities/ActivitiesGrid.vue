<template>
  <StandardGrid
    :items="[{ title: 'Activities Document' }]"
    :download-button-on-mobile="true"
    :min-width="335"
    @select="openDoc"
  >
    <span
      id="activitydoc"
      @click="openDoc"
    >
      <svg-icon 
        :path="mdiFileDocument"
        type="mdi"
        size="48"
        style="margin: 5px;"
      />
      <h3>Activities Document</h3>
    </span>
    <div
      v-if="isMobile()"
      id="divider"
    />
    <svg-icon
      v-if="isMobile()"
      :path="mdiDownload"
      type="mdi"
      size="32"
      class="downloadicon"
      @click="downloadMobile"
    />
  </StandardGrid>
  <h2>Games</h2>
  <StandardGrid
    :items="games"
    :min-width="335"
    @select="game => $router.push(game.link + '/')"
  />
</template>
<script setup lang="ts">
import StandardGrid from "../cardgrid/StandardGrid.vue";
import jsonData from '../../data.json';
import { YoutubeData } from "../../types";
import { useRouter } from "vue-router";
import { mdiFileDocument, mdiDownload } from '@mdi/js';
// @ts-ignore
import SvgIcon from '@jamescoyle/vue-icon';
import { isMobile } from '../../util';

const games = (jsonData as YoutubeData).activities.games.map(game => ({
  title: game.gameTitle.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" "),
  link: game.gameTitle
}));

function openDoc() {
  // setTimeout(() => {
    if(isMobile()) clickMobile();
    else window.location.assign("Activities.pdf");
  // }, 10);
}
function downloadMobile() {
  window.location.assign("Activities.pdf");
}
const router = useRouter();
function clickMobile() {
  router.push("/mobile-viewer/activities/Activities");
}
</script>
<style setup>
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
#activitydoc {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>