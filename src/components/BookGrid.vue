<script setup lang="ts">
import type { YoutubeData } from '../types';
import BookCard from './BookCard.vue';

const props = defineProps<{ data: YoutubeData }>();

function animDur(index: number) {
    return {
        animationDelay: `${100 + index * 50}ms`,
    };
}

function emits(pId: string) {
    const title = props.data.find(b => b.playlistId === pId)!.playlistTitle;
    if(title.includes("2nd Edition"))
        window.location.hash = `#M${title.match(/Book (\d+(?:\.\d)?)/)![1]}.2`;
    else
        window.location.hash = `#M${title.match(/Book (\d+(?:\.\d)?)/)![1]}`;
}

</script>

<template>
    <div class="book-grid">
        <div class="book-grid__item" v-for="(book, index) in data.sort((a, b) => a.playlistTitle.localeCompare(b.playlistTitle))" :key="book.playlistId" :style="animDur(index)">
            <BookCard :book="book" @click="emits(book.playlistId)"/>
        </div>
    </div>
</template>
<style scoped>
.book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(0, 1fr));
    grid-gap: 3em 1.5em;
    padding: .5em;
}
@media (max-width: 600px) {
    .book-grid {
        grid-template-columns: repeat(2, calc(50% - .5em));
        grid-gap: 3em 1em;
    }
}
.book-grid__item {
    display: flex;
    align-items: center;
    justify-content: center;
    /* Allow to take up full space */
    width: 100%;
    height: 100%;
    opacity: 0;
    animation: fadeIn 300ms forwards;
    animation-timing-function: ease-in;
    animation-delay: 100ms;
    position: relative;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
        top: 1em;
    }
    100% {
        opacity: 1;
        top: 0;
    }
}
</style>