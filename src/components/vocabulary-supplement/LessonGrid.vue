<template>
  <StandardGrid
    :items="items"
    @select="loadVideo"
  />
</template>
<script setup lang="ts">
import StandardGrid from '../cardgrid/StandardGrid.vue';
import { computed } from 'vue';
import { Book, BookGridType, Lesson } from '../../types';

const props = defineProps<{ book: Book, unit: string }>();

function loadVideo(videoData: Lesson) {
    window.location.assign("https://youtube.com/watch?v=" + videoData.videoId + "&list=" + props.book.playlistId);
}

const items = computed(() =>
    props.book.lessons
            .filter(l => l.unitNumber === parseInt(props.unit))
            .map(l => ({ ...l, title: `Lesson ${l.lessonNumber} - ${l.title}` }))
);
</script>
