<script setup lang="ts">
import StandardGrid from '../cardgrid/StandardGrid.vue';
import { computed } from 'vue';
import { Book, YoutubeData } from '../../types';
import data from '../../data.json';

const props = defineProps<{ book: Book }>();

const items = computed(() => {
    if(!props.book) return (data as YoutubeData).justForFunSongs.videos;
    return props.book.songs?.map(s => ({ ...s, title: s.songName })) ?? [];
});

function openSong(song: any) {
    window.location.assign(`https://www.youtube.com/watch?v=${song.videoId}&list=${(props.book ?? data.justForFunSongs).playlistId}`);
}
</script>
<template>
  <StandardGrid
    :items="items"
    @select="(s: any) => openSong(s)"
  />
</template>