<script setup lang="ts">
import { computed, ref } from 'vue';
import { Book, Page } from '../types';

const props = defineProps<{ page: Page, book: string, unit: string, lesson: string, youtubeData: Book[] }>();
const theBookData = computed(() => props.youtubeData.find(b => b.playlistId === props.book)!);
const routes = computed<string[]>(() => {
    if(props.page === Page.Home) {
    } else if(props.page === Page.Book) {
        return [theBookData.value.playlistTitle.split(' - ')[0]];
    } else if(props.page === Page.Unit) {
        return [theBookData.value.playlistTitle.split(' - ')[0], "Unit " + props.unit];
    } else if(props.page === Page.Lesson) {
        if(props.unit === "X")
            return [theBookData.value.playlistTitle.split(' - ')[0], theBookData.value.lessons.find(l => l.videoId === props.lesson)!.title!];
        return [theBookData.value.playlistTitle.split(' - ')[0], "Unit " + props.unit, "Lesson " + props.lesson];
    }
    return [];
});
function goToPart(part: number) {
    if (part === 0) {
        window.location.hash = "";
    } else {
        const bookTitleArray = theBookData.value.playlistTitle.split(' - ')[0].split(' ');
        const book = bookTitleArray[1] + (bookTitleArray[2] === "2nd" ? ".2" : "");
        console.log(bookTitleArray, book);
        if (part === 1) {
            window.location.hash = "#M" + book;
        } else if(part === 2) {
            window.location.hash = "#M" + book + "U" + props.unit;
        } else if(part === 3) {
            window.location.hash = "#M" + book + "U" + props.unit + "L" + props.lesson;
        }
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