<script setup lang="ts">
import { computed } from 'vue';
import { Book } from '../../types';
import StandardGrid from '../cardgrid/StandardGrid.vue';

const props = defineProps<{ book: Book }>();

const units = computed(() => {
    const units = new Set(props.book.lessons.map((lesson) => lesson.unitNumber ?? lesson.title!));
    return [...units];
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
</script>

<template>
  <StandardGrid
    :items="items"
    :min-width="150"
    @select="(item: any) => $router.push(`${item.unit ?? 'other/' + props.book.lessons.find(l => l.title === item.title)?.videoId}/`)"
  />
</template>
