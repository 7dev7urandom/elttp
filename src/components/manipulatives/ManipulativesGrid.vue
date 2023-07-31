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
import { Book } from '../../types';
import manipulativeFileMap from './data.json';

const props = defineProps<{ book: Book, bookNum: keyof typeof manipulativeFileMap }>();

const items = manipulativeFileMap[props.bookNum].map(f => ({ title: /U\dL\d/.test(f) ? f.replace(" ", "\n") : f, link: f }));

const router = useRouter();

function clickMobile(data: any) {
  router.push("/mobile-viewer/manipulatives/" + data.link);
}

function itemClicked(data: any) {
    window.location.assign(data.link + ".pdf");
}
</script>