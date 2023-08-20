<template>
  <StandardGrid
    :items="wordDocs"
    :download-button-on-mobile="true"
    @select="click"
    @select-mobile="clickMobile"
    @download="download"
  />
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import StandardGrid from "../cardgrid/StandardGrid.vue";

const wordDocs = ["Phonemes Cards", "Scope and Sequence"].map(n => ({ link: n, title: n }));

const router = useRouter();

function clickMobile(data: any) {
  router.push("/mobile-viewer/phonics/" + data.link);
}
function click(data: any) {
  window.location.assign(data.link + ".pdf");
}
function download(data: any) {
  window.location.assign(data.link + ".pdf");
}
</script>