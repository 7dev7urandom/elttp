<template>
  <StandardGrid
    :items="pdfFiles"
    :download-button-on-mobile="true"
    @select="loadPdf"
    @select-mobile="loadPdfMobile"
    @download="downloadMobile"
  />
</template>
<script setup lang="ts">
import StandardGrid from '../cardgrid/StandardGrid.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function downloadMobile(data: any) {
    window.location.assign(data.link + ".pdf");
}
function loadPdfMobile(data: any) {
  router.push("/mobile-viewer/lesson-plans/" + data.link);
}
function loadPdf(data: any) {
  window.location.assign(data.link + ".pdf");
}

const pdfFiles = ["1", "2", "3", "4"].map(n => ({ link: "M" + n, title: "Book " + n }));
</script>
