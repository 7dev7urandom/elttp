<script setup lang="ts">
import { computed, ref } from 'vue';
import { Book, Page } from '../types';

const props = defineProps<{ page: Page, book: string, unit: string, lesson: string, youtubeData: Book[] }>();
const routes = computed<string[]>(() => {
    if(props.page === Page.Home) {
    } else if(props.page === Page.Book) {
        return [props.youtubeData.find(b => b.playlistId === props.book)!.playlistTitle.split(' - ')[0]];
    } else if(props.page === Page.Unit) {
        return [props.youtubeData.find(b => b.playlistId === props.book)!.playlistTitle.split(' - ')[0], "Unit " + props.unit];
    } else if(props.page === Page.Lesson) {
        return [props.youtubeData.find(b => b.playlistId === props.book)!.playlistTitle.split(' - ')[0], "Unit " + props.unit, "Lesson " + props.lesson];
    }
    return [];
});

</script>
<template>
    <span v-for="r in routes">{{ r }}</span>
</template>
<style scoped>
span::before {
    content: '>';
}
span {
    
}
</style>