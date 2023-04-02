<script setup lang="ts">
import { computed } from 'vue';
import { Book } from '../types';

defineProps<{ book: Book }>();
defineEmits(['click']);

function getBookCover(book: Book) {
    const regex = /Book (.+) -/;
    const cover = `elttp/bookCovers/M${book.playlistTitle.match(regex)![1]}.jpg`;
    return cover;
}
</script>
<template>
    <div class="book-card" @click="$emit('click')">
        <img :src="getBookCover(book)" alt="Book cover" />
        <div class="book-card__content">
            <h3 class="book-card__title">{{ book.playlistTitle.split(" - ")[0] }}</h3>
        </div>
    </div>
</template>
<style scoped>
.book-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1em;
    border-radius: 0.5em;
    background-color: #444;
    box-shadow: 0 0 0.5em #00000033;
    border: #444 1px solid;
    transition: all 300ms;
    /* min-width: 250px; */
}

.book-card:hover {
    box-shadow: 0 0 1em #00000033;
    transform: scale(1.02);
    cursor: pointer;
    border: #aaa 1px solid;
}
.book-card img {
    width: 100%;
    height: auto;
    max-width: 200px;
    object-fit: cover;
}
.book-card__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.book-card__title {
    margin: 0;
    font-size: 1.5em;
    font-weight: 600;
    text-align: center;
}
</style>
