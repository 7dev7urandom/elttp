<script setup lang="ts">
import StandardGrid from '../cardgrid/StandardGrid.vue';
import { computed } from 'vue';
import { Book } from '../../types';

const props = defineProps<{ book: Book }>();

const items = computed(() => {
    return props.book.songs?.map(s => ({ ...s, title: s.songName })) ?? [];
});

function openSong(song: any) {
    window.location.assign(`https://www.youtube.com/watch?v=${song.videoId}&list=${props.book.playlistId}`);
}
</script>
<template>
  <StandardGrid
    :items="items"
    @select="(s: any) => openSong(s)"
  />
</template>