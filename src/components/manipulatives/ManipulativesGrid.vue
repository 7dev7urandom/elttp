<template>
  <StandardGrid
    :items="items"
    :download-button-on-mobile="true"
    @select="itemClicked"
    @select-mobile="clickMobile"
    @download="itemClicked"
  />
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import StandardGrid from '../cardgrid/StandardGrid.vue';

const items = ["SE Asia Map", "M3U9L2 PICS What is this made of", "M3U1L2 PICS family", "M3U6L1 PICS While I was . . ."]
  .map(n => ({ link: n, title: n }));

const router = useRouter();

function clickMobile(data: any) {
  router.push("/mobile-viewer/manipulatives/" + data.link);
}

function itemClicked(data: any) {
    window.location.assign(data.link + ".pdf");
}
</script>