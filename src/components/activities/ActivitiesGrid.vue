<template>
  <StandardGrid
    :items="[{ title: 'Activities Document' }]"
    :download-button-on-mobile="true"
    @select="openDoc"
    @select-mobile="clickMobile"
    @download="openDoc"
  >
    <svg-icon 
      :path="mdiFileDocument"
      type="mdi"
      size="48"
      style="margin: 5px;"
    />
    <h3>Activities Document</h3>
  </StandardGrid>
  <h2>Games</h2>
  <StandardGrid
    :items="games"
    @select="game => $router.push(game.link + '/')"
  />
</template>
<script setup lang="ts">
import StandardGrid from "../cardgrid/StandardGrid.vue";
import jsonData from '../../data.json';
import { YoutubeData } from "../../types";
import { useRouter } from "vue-router";
import { mdiFileDocument } from '@mdi/js';
// @ts-ignore
import SvgIcon from '@jamescoyle/vue-icon';

const games = (jsonData as YoutubeData).activities.games.map(game => ({
  title: game.gameTitle.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" "),
  link: game.gameTitle
}));

function openDoc() {
  window.location.assign("Activities.pdf");
}
const router = useRouter();
function clickMobile() {
  router.push("/mobile-viewer/activities/Activities");
}
</script>