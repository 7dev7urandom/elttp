<template>
    <StandardGrid :items="items" @select="(l: any) => $router.push(`${l.lessonNumber}/`)" />
</template>
<script setup lang="ts">
import StandardGrid from '../cardgrid/StandardGrid.vue';
import { computed } from 'vue';
import { Book } from '../../types';

const props = defineProps<{ book: Book, unit: string }>();

const items = computed(() =>
    props.book.lessons
            .filter(l => l.unitNumber === parseInt(props.unit))
            .map(l => ({ ...l, title: `M${l.bookNumber} Unit ${l.unitNumber} Lesson ${l.lessonNumber}` }))
);
</script>
