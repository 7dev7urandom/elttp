<script setup lang="ts">
import type { Book } from '../types';
import LessonCard from './LessonCard.vue';

const props = defineProps<{ book: Book, unit: number }>();

const lessons = props.book.lessons.filter(lesson => lesson.unitNumber === props.unit);

function animDur(index: number) {
    return {
        animationDelay: `${100 + index * 50}ms`,
    };
}

</script>

<template>
    <div class="lesson-grid">
        <div class="lesson-grid__item" v-for="(lesson, index) in lessons" :key="lesson.videoId" :style="animDur(index)">
            <LessonCard :lesson="lesson" :playlist-id="book.playlistId" />
        </div>
    </div>
</template>
<style scoped>
.lesson-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(0, 1fr));
    grid-gap: 2em 1.5em;
    padding: 1em;
}
.lesson-grid__item {
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