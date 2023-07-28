<template>
  <StandardGrid
    :items="items"
    @select="(c: any) => loadVideo(c)"
  />
</template>
<script setup lang="ts">
import StandardGrid from '../cardgrid/StandardGrid.vue';
import { computed } from 'vue';
import { Book, Chapter } from '../../types';

const props = defineProps<{ book: Book, unit?: string, lesson?: string, videoId?: string }>();
const lesson = computed(() => {
    if(props.videoId) {
        return props.book.lessons.find(l => l.videoId === props.videoId);
    } else {
        return props.book.lessons.find(l => l.unitNumber === parseInt(props.unit!) && l.lessonNumber === parseInt(props.lesson!));
    }
});
const items = computed(() =>
    lesson.value!.chapters ?? []
            // .map(c => ({ ...c }))
);
if(items.value.length === 0) {
    window.location.assign(`https://www.youtube.com/watch?v=${lesson.value!.videoId}&list=${props.book.playlistId}`);
}
function loadVideo(c: Chapter) {
    window.location.assign(`https://www.youtube.com/watch?v=${lesson.value!.videoId}&list=${props.book.playlistId}&t=${c.time}`);
}
</script>
