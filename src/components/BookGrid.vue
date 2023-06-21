<script setup lang="ts">
import type { Book } from '../types';
import StandardGrid from './cardgrid/StandardGrid.vue';
import data from '../data.json';
import { computed } from 'vue';

const props = defineProps<{ songs?: boolean }>();

const items = computed(() =>
    data.filter(p => !props.songs || p.songs.length > 0).sort((a, b) => a.playlistTitle.localeCompare(b.playlistTitle))
);

function bookId(pId: string): string {
    const title = data.find(b => b.playlistId === pId)!.playlistTitle;
    return title.includes("2nd Edition") ? 
        title.match(/Book (\d+(?:\.\d)?)/)![1] + '.2' :
        title.match(/Book (\d+(?:\.\d)?)/)![1];
}
function getBookCover(book: Book) {
    const regex = /Book (.+) -/;
    const cover = `/bookCovers/M${book.playlistTitle.match(regex)![1]}.jpg`;
    return cover;
}

</script>

<template>
    <StandardGrid :items="items" v-slot="{ item }" @select="(book) => $router.push(bookId(book.playlistId) + '/')">
        <img :src="getBookCover(item as any)" alt="Book cover" />
        <div class="book-card_content">
            <h3 class="book-card_title">{{ (item as any).playlistTitle.split(" - ")[0] }}</h3>
        </div>
    </StandardGrid>
</template>
<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1em;
    border-radius: 0.5em;
    background-color: var(--card-color);
    box-shadow: 0 0 0.5em #00000033;
    border: var(--card-color) 1px solid;
    transition: all 300ms;
    /* min-width: 250px; */
}
@media (max-width: 650px) {
    .grid {
        grid-template-columns: repeat(2, calc(50% - .5em)) !important;
        grid-gap: 3em 1em !important;
    }
}
.grid_item {
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
.book-card_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.book-card_title {
    margin: 0;
    font-size: 1.5em;
    font-weight: 600;
    text-align: center;
}
.card img {
    width: 100%;
    height: auto;
    max-width: 200px;
    object-fit: cover;
}
</style>