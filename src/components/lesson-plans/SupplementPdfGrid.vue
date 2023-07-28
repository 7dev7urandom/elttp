<template>
  <StandardGrid
    v-slot="{ item }"
    :items="pdfFiles"
    :horizontal="true"
    :no-margin="true"
    @select="clickFull"
  >
    <h3
      class="card_title"
      @click="loadPdf(item)"
    >
      {{ item.title }}
    </h3>
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
      @click="download(item)"
    />
  </StandardGrid>
</template>
<script setup lang="ts">
import StandardGrid from '../cardgrid/StandardGrid.vue';
import { useRouter } from 'vue-router';
// @ts-ignore
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDownload } from '@mdi/js';

const router = useRouter();

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function download(data: any) {
    window.location.assign(data.link + ".pdf");
}
function clickFull(data: any) {
    if(isMobile()) {}
    else loadPdf(data);
}
function loadPdf(data: any) {
    if(isMobile()) {
        // Mobile device. Try using Google PDF Viewer
        router.push("mobile-viewer/" + data.link);
    } else {
        window.location.assign(data.link + ".pdf");
    }
}

const pdfFiles = ["1", "2", "3", "4"].map(n => ({ link: "M" + n, title: "Book " + n }));
</script>
<style scoped>
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
h3 {
    float: left;
    width: 80%;
}
.card_title {
    margin: 0;
    padding: .5em;
    font-size: 1.5em;
    font-weight: 600;
    text-align: center;
}
</style>