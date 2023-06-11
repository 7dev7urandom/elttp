<script setup lang="ts">
import { computed } from 'vue';
import type { Book } from '../types';
import StandardGrid from './cardgrid/StandardGrid.vue';

const props = defineProps<{ unit: Book }>();

const units = computed(() => {
    const units = new Set(props.unit.lessons.map((lesson) => lesson.unitNumber ? "Unit " + lesson.unitNumber : lesson.title!));
    return [...units];
});

const items = computed(() => {
    const item: { title: string, callback: () => void }[] = [];
    if(props.unit.songs && props.unit.songs.length > 0) {
        item.push({ title: "Songs", callback: openSongs });
    }
    for(const unit of units.value) {
        if(unit.startsWith("Unit")) {
            item.push({ title: unit, callback: () => openUnit(unit) });
        } else {
            item.push({ title: unit, callback: () => openEdgeCase(unit) });
        }
    }
    return item;
});

function openUnit(unit: string) {
    window.location.hash = `${window.location.hash}U${unit.match(/Unit (\d+)/)![1]}`;
}

function openSongs() {
    window.location.hash = `${window.location.hash}S`;
}

function openEdgeCase(unitName: string) {
    const lesson = props.unit.lessons.find(l => l.title === unitName);
    if(lesson?.chapters && lesson.chapters.length > 0) {
        window.location.hash = `M${lesson.bookNumber}UXL${lesson.videoId}`;
    } else {
        window.location.assign(`https://www.youtube.com/watch?v=${props.unit.lessons.find(l => l.title === unitName)!.videoId}&list=${props.unit.playlistId}`);
    }
}
</script>

<template>
    <StandardGrid :items="items" @select="(item: any) => item.callback()" />
</template>
