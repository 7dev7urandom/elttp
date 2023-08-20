<template>
  <h2>M1-M7 Teaching Aids</h2>
  <StandardGrid
    v-slot="{ item }"
    :items="teachingAids"
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
  <h2>ELTTP Supplements</h2> 
  <StandardGrid
    v-slot="{ item }"
    :items="elttpSupplements"
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
  <h2>Teaching Reading/Phonics</h2> 
  <PhonicsGrid />
</template>
<script setup lang="ts">
import StandardGrid from '../components/cardgrid/StandardGrid.vue';
import { mdiBookPlus, mdiDraw, mdiMusic, mdiRun, mdiVolumeHigh, mdiWaveform } from '@mdi/js';
// @ts-ignore
import SvgIcon from '@jamescoyle/vue-icon';
import { useRouter } from 'vue-router';
import PhonicsGrid from '../components/phonics/PhonicsGrid.vue';

const teachingAids: { title: string, icon: string, path: string }[] = [];
teachingAids.push({ title: "Audio for M1-M7 Textbooks", icon: mdiVolumeHigh, path: "/textbook-audio" });
teachingAids.push({ title: "Activities", icon: mdiRun, path: "/activities" });
teachingAids.push({ title: "Manipulatives", icon: mdiDraw, path: "/manipulatives" });
teachingAids.push({ title: "Songs", icon: mdiMusic, path: "/songs" });

const elttpSupplements: { title: string, icon: string, path: string }[] = [];
elttpSupplements.push({ title: "Supplement Lesson Plans", icon: mdiBookPlus, path: "/lesson-plans" });
elttpSupplements.push({ title: "Audio for Supplement", icon: mdiWaveform, path: "/supplement-audio" });

const router = useRouter();
function open(item: {path: string}) {
    router.push(item.path + "/");
}
</script>