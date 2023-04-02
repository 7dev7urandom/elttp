<script setup lang="ts">
import type { Book, Lesson } from '../types';
import BookCard from './BookCard.vue';
import ChapterCard from './ChapterCard.vue';

const props = defineProps<{ book: Book, lesson: Lesson }>();

const chapters = props.lesson.chapters.length ? props.lesson.chapters : [{ time: 0, title: props.lesson.title! }];
if(chapters.length === 1) {
    window.location.assign("https://www.youtube.com/watch?v=" + props.lesson.videoId + "&list=" + props.book.playlistId + "&t=" + chapters[0].time)
}
console.log(props.lesson, chapters);

function animDur(index: number) {
    return {
        animationDelay: `${100 + index * 50}ms`,
    };
}

</script>

<template>
    <div class="chapter-grid">
        <div class="chapter-grid__item" v-for="(chapter, index) in chapters" :key="chapter.time" :style="animDur(index)">
            <ChapterCard :chapter="chapter" :playlist-id="book.playlistId" :lesson="lesson" />
        </div>
    </div>
</template>
<style scoped>
.chapter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(0, 1fr));
    grid-gap: 3em 1.5em;
    padding: 1em;
}
.chapter-grid__item {
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