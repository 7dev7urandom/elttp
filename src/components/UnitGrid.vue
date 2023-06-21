<script setup lang="ts">
import { computed } from 'vue';
import { Book } from '../types';
import StandardGrid from './cardgrid/StandardGrid.vue';
import { mdiPrinterPosEditOutline } from '@mdi/js';

const props = defineProps<{ book: Book }>();

const units = computed(() => {
    const units = new Set(props.book.lessons.map((lesson) => lesson.unitNumber ?? lesson.title!));
    return [...units];
});
const bookId = computed(() => {
    return props.book.playlistTitle.includes("2nd Edition") ? 
        props.book.playlistTitle.match(/Book (\d+(?:\.\d)?)/)![1] + '.2' :
        props.book.playlistTitle.match(/Book (\d+(?:\.\d)?)/)![1];
});

const items = computed(() => {
    const item = [];
    // if(props.book.songs && props.book.songs.length > 0) {
    //     item.push({ title: "Songs" });
    // }
    for(const unit of units.value) {
        if(typeof unit === "number") {
            item.push({ unit, title: "Unit " + unit });
        } else {
            item.push({ title: unit });
        }
    }
    return item;
});

function openUnit(unit: string) {
    window.location.hash = `${window.location.hash}U${unit.match(/Unit (\d+)/)![1]}`;
}

function openEdgeCase(unitName: string) {
    const lesson = props.book.lessons.find(l => l.title === unitName);
    if(lesson?.chapters && lesson.chapters.length > 0) {
        window.location.hash = `M${lesson.bookNumber}UXL${lesson.videoId}`;
    } else {
        window.location.assign(`https://www.youtube.com/watch?v=${props.book.lessons.find(l => l.title === unitName)!.videoId}&list=${props.book.playlistId}`);
    }
}
</script>

<template>
    <StandardGrid :items="items" @select="(item: any) => $router.push(`/vocab-supplement/${bookId}/${item.unit ?? 'other/' + props.book.lessons.find(l => l.title === item.title)?.videoId}`)" />
</template>
