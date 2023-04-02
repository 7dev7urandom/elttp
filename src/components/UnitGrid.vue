<script setup lang="ts">
import { computed } from 'vue';
import type { Book } from '../types';
import LessonCard from './LessonCard.vue';
import UnitCard from './UnitCard.vue';

const props = defineProps<{ unit: Book }>();

const units = computed(() => {
    const units = new Set(props.unit.lessons.map((lesson) => lesson.unitNumber ? "Unit " + lesson.unitNumber : lesson.title!));
    return [...units];
});

function animDur(index: number) {
    return {
        animationDelay: `${100 + index * 50}ms`,
    };
}

function openUnit(unit: string) {
    window.location.hash = `${window.location.hash}U${unit.match(/Unit (\d+)/)![1]}`;
}
</script>

<template>
    <div class="unit-grid">
        <div class="unit-grid__item" v-for="(unitI, index) in units" :key="unitI" :style="animDur(index)">
            <UnitCard :name="unitI" v-if="unitI.startsWith('Unit')" @click="openUnit(unitI)"/>
            <LessonCard :lesson="unit.lessons.find(l => l.title === unitI)!" :playlist-id="unit.playlistId" :is-edgecase="true" v-else />
        </div>
    </div>
</template>
<style scoped>
.unit-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(0, 1fr));
    grid-gap: 2em 1.5em;
    padding: 1em;
}
@media (max-width: 650px) {
    .unit-grid {
        grid-template-columns: repeat(2, calc(50% - .5em));
        grid-gap: 2em 1em;
    }
}
.unit-grid__item {
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