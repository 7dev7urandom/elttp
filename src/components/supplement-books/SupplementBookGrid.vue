<template>
  <StandardGrid v-slot="{ item }" :items="pdfFiles" @select="loadPdf">
    <div class="book-card_content">
      <img :src="getBookCover(item)" :alt="`${item.title} cover`" />
      <div class="flexhor">
        <h3 class="book-card_title">
          {{ item.title }}
        </h3>
        <div v-if="isMobile()" id="divider" />
        <svg-icon
          v-if="isMobile()"
          :path="mdiDownload"
          type="mdi"
          size="32"
          class="downloadicon"
          @click="downloadMobile(item)"
        />
      </div>
    </div>
  </StandardGrid>
</template>
<script setup lang="ts">
import StandardGrid from "../cardgrid/StandardGrid.vue";
import { useRouter } from "vue-router";
import { isMobile } from "../../util";
import { mdiDownload } from "@mdi/js";
// @ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";

const router = useRouter();

let isClicking = false;
function downloadMobile(data: any) {
  window.location.assign(data.link + ".pdf");
  isClicking = true;
}
function loadPdfMobile(data: any) {
  router.push("/mobile-viewer/supplement-books/" + data.link);
}
function loadPdf(data: any) {
  if (isMobile())
    // Stupid hack to get around the whole button click triggering before the download button click
    setTimeout(() => {
      if (!isClicking) {
        loadPdfMobile(data);
      }
      isClicking = false;
    }, 100);
  else window.location.assign(data.link + ".pdf");
}
function getBookCover(item: any) {
  return `/bookCovers/supplement-books/${item.link}.jpg`;
}
const pdfFiles = ["1", "2", "3", "4"].map((n) => ({
  link: "M" + n,
  title: "Book " + n,
}));
</script>
<style scoped>
h3 {
  min-height: 1.7em;
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
@media (max-width: 650px) {
  .grid {
    grid-template-columns: repeat(2, calc(50% - 0.5em)) !important;
    grid-gap: 2em 1em !important;
  }
}
.grid_item {
  display: flex;
  align-items: center;
  justify-content: center;
  /* Allow to take up full space */
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: fadeIn 300ms forwards;
  animation-timing-function: ease-in;
  animation-delay: 100ms;
  position: relative;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    top: 1em;
  }
  100% {
    opacity: 1;
    top: 0;
  }
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
.card img {
  width: 100%;
  height: auto;
  max-width: 200px;
  object-fit: cover;
}
#divider {
  width: 1px;
  height: 2.5em;
  background-color: var(--card-border-color);
  float: right;
  position: relative;
}
.downloadicon {
  float: right;
  padding: 7px 16px 7px 14px;
}
</style>
