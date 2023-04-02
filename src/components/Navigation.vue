<script setup lang="ts">
import { computed, ref } from 'vue';
import { Book, Page } from '../types';

const props = defineProps<{ page: Page, book: string, unit: string, lesson: string, youtubeData: Book[] }>();
const routes = computed<string[]>(() => {
    if(props.page === Page.Home) {
    } else if(props.page === Page.Book) {
        return [props.youtubeData.find(b => b.playlistId === props.book)!.playlistTitle.split(' - ')[0]];
    } else if(props.page === Page.Unit) {
        return [props.youtubeData.find(b => b.playlistId === props.book)!.playlistTitle.split(' - ')[0], "Unit " + props.unit];
    } else if(props.page === Page.Lesson) {
        return [props.youtubeData.find(b => b.playlistId === props.book)!.playlistTitle.split(' - ')[0], "Unit " + props.unit, "Lesson " + props.lesson];
    }
    return [""];
});
function goToPart(part: number) {
    if (part === 0) {
        window.location.hash = "";
    } else if (part === 1) {
        window.location.hash = "#M" + props.youtubeData.find(b => b.playlistId === props.book)!.playlistTitle.split(' - ')[0].split(' ')[1];
    } else if(part === 2) {
        window.location.hash = "#M" + props.youtubeData.find(b => b.playlistId === props.book)!.playlistTitle.split(' - ')[0].split(' ')[1] + "U" + props.unit;
    } else if(part === 3) {
        window.location.hash = "#M" + props.youtubeData.find(b => b.playlistId === props.book)!.playlistTitle.split(' - ')[0].split(' ')[1] + "U" + props.unit + "L" + props.lesson;
    }
}
</script>
<template>
    <div>
        <span @click="goToPart(0)">Home</span>
        <span class="arrow" v-for="(r, index) in routes" @click="goToPart(index + 1)">
            <span>{{ r }}</span>
        </span>
    </div>
</template>
<style scoped>
span.arrow::before {
    content: ' > ';
    text-decoration: none;
}
div {
    text-align: start;
    padding: 1em;
}
span:not(.arrow) {
    text-decoration: underline;
    cursor: pointer;
}
</style>