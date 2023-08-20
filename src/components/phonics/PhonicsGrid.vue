<template>
  <StandardGrid
    v-slot="{ item }"
    :items="phonics"
    @select="it => $router.push(it.path + '/')"
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
// @ts-ignore
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountVoice, mdiAlphabetical } from '@mdi/js';
import StandardGrid from '../cardgrid/StandardGrid.vue';

const phonics: { title: string, icon: string, path: string }[] = [];
phonics.push({ title: "Documents", icon: mdiAlphabetical, path: "/phonics/documents" });
phonics.push({ title: "Videos", icon: mdiAccountVoice, path: "/phonics/videos"});

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