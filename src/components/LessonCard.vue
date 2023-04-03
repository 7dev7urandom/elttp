<script setup lang="ts">
import { Lesson } from '../types';

const props = defineProps<{ lesson: Lesson, playlistId: string, isEdgecase?: boolean }>();

function goToVideo() {
    if(props.isEdgecase) window.location.hash = `${window.location.hash}UXL${props.lesson.videoId}`;
    else window.location.hash = `${window.location.hash}L${props.lesson.lessonNumber}`;
}
</script>

<template>
    <div class="lesson-card" @click="goToVideo">
        <div class="lesson-card__content">
            <h3 class="lesson-card__title">M{{ lesson.bookNumber }} {{ lesson.unitNumber ? `Unit ${lesson.unitNumber} Lesson ${lesson.lessonNumber}` : lesson.title }}</h3>
        </div>
    </div>
</template>

<style scoped>
.lesson-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: .5em;
    border-radius: 0.5em;
    background-color: var(--card-color);
    box-shadow: 0 0 0.5em #00000033;
    border: var(--card-color) 1px solid;
    transition: all 300ms;
}

.lesson-card:hover {
    box-shadow: 0 0 1em #00000033;
    transform: scale(1.02);
    cursor: pointer;
    border: var(--card-border-color) 1px solid;
}
.lesson-card img {
    width: 100%;
    height: auto;
    max-width: 200px;
    object-fit: cover;
}
.lesson-card__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.lesson-card__title {
    margin: 0;
    font-size: 1.5em;
    font-weight: 600;
    text-align: center;
}
</style>
