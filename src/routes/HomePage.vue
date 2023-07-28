<template>
  <StandardGrid
    v-slot="{ item }"
    :items="routes"
    @select="open"
  >
    <!-- Include title and icon -->
    <svg-icon
      :path="(item as any).icon"
      type="mdi"
      size="128"
    />
    <h3 class="book-card_title">
      {{ item.title }}
    </h3>
  </StandardGrid>
</template>
<script setup lang="ts">
import StandardGrid from '../components/cardgrid/StandardGrid.vue';
import { mdiAlphabetical, mdiBookPlus, mdiDraw, mdiMusic, mdiPencil, mdiVolumeHigh, mdiWaveform } from '@mdi/js';
// @ts-ignore
import SvgIcon from '@jamescoyle/vue-icon';
import { useRouter } from 'vue-router';

const routes: { title: string, icon: string, path: string }[] = [];
routes.push({ title: "Supplement Lesson Plans", icon: mdiBookPlus, path: "/lesson-plans" });
routes.push({ title: "Vocabulary Supplement", icon: mdiWaveform, path: "/vocabulary-supplement" });
routes.push({ title: "Manipulatives", icon: mdiDraw, path: "/manipulatives" });
routes.push({ title: "Phonics", icon: mdiAlphabetical, path: "/phonics" });
routes.push({ title: "Songs", icon: mdiMusic, path: "/songs" });
routes.push({ title: "Audio for Textbooks", icon: mdiVolumeHigh, path: "/textbook-audio" });
const router = useRouter();
function open(item: {path: string}) {
    router.push(item.path + "/");
}
</script>