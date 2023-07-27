<template>
    <StandardGrid :items="items" @select="itemClicked">

    </StandardGrid>
</template>
<script setup lang="ts">
import StandardGrid from '../cardgrid/StandardGrid.vue';
import jsonData from '../../data.json';
import { YoutubeData } from '../../types';

const wordDocs = ["Phonemes Cards", "Scope and Sequence"].map(n => ({ type: "doc", link: n + ".docx", title: "Doc: " + n }));
const videos = (jsonData as YoutubeData).phonicsPlaylist.videos.map(video => ({ type: "video", link: video.videoId, title: video.title }));

const items = [...wordDocs, ...videos];

function itemClicked(data: any) {
    if(data.type === 'doc') {
        // TODO: mobile device support for docx files?
        window.location.assign(data.link);
    } else if (data.type === 'video') {
        window.location.assign(`https://youtube.com/watch?v=${data.link}&list=${jsonData.phonicsPlaylist.playlistId}`);
    }
}
</script>