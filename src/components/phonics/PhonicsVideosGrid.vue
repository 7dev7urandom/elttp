<template>
  <StandardGrid
    :items="videos"
    @select="click"
  />
</template>
<script setup lang="ts">
import jsonData from '../../data.json';
import { YoutubeData } from '../../types';
import StandardGrid from '../cardgrid/StandardGrid.vue';

const videos = (jsonData as YoutubeData).phonicsPlaylist.videos.map(video => ({ vId: video.videoId, title: video.title }));
function click(data: any) {
    window.location.assign(`https://youtube.com/watch?v=${data.vId}&list=${jsonData.phonicsPlaylist.playlistId}`);
}

</script>