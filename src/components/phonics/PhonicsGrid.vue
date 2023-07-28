<template>
  <StandardGrid
    :items="items"
    :download-button-on-mobile="(item) => item.type === 'doc'"
    @select="click"
    @select-mobile="clickMobile"
    @download="download"
  />
</template>
<script setup lang="ts">
import StandardGrid from '../cardgrid/StandardGrid.vue';
import jsonData from '../../data.json';
import { YoutubeData } from '../../types';
import { useRouter } from 'vue-router';
import { isMobile } from '../../util';
// @ts-ignore
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDownload } from '@mdi/js';

const wordDocs = ["Phonemes Cards", "Scope and Sequence"].map(n => ({ type: "doc", link: n, title: "Doc: " + n }));
const videos = (jsonData as YoutubeData).phonicsPlaylist.videos.map(video => ({ type: "video", link: video.videoId, title: video.title }));

const items = [...wordDocs, ...videos];
const router = useRouter();

function clickMobile(data: any) {
  if(data.type === 'doc') {
    router.push("/mobile-viewer/phonics/" + data.link);
  } else if (data.type === 'video') {
    window.location.assign(`https://youtube.com/watch?v=${data.link}&list=${jsonData.phonicsPlaylist.playlistId}`);
  }

}
function click(data: any) {
  if(data.type === 'doc') {
    window.location.assign(data.link + ".pdf");
  } else if (data.type === 'video') {
    window.location.assign(`https://youtube.com/watch?v=${data.link}&list=${jsonData.phonicsPlaylist.playlistId}`);
  }
}
function download(data: any) {
  window.location.assign(data.link + ".pdf");
}

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