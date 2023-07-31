<template>
  <StandardGrid 
    :items="[{ title: 'Southeast Asia Map' }]"
    @select="openMap"
  />
  <BookGrid :type="BookGridType.Manipulatives" />
</template>
<script setup lang="ts">
import StandardGrid from '../cardgrid/StandardGrid.vue';
import BookGrid from '../BookGrid.vue';
import { BookGridType } from '../../types';

function openMap() {
  window.location.assign("SE Asia Map.pdf");
}
</script>