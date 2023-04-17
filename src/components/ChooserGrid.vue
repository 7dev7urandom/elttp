<script setup lang="ts">
import BookGrid from './BookGrid.vue';
import UnitGrid from './UnitGrid.vue';
import LessonGrid from './LessonGrid.vue';
import ChapterGrid from './ChapterGrid.vue';
import Navigation from './Navigation.vue';
import youtubeData from '../data.json';
import { computed, ref } from 'vue';
import { type Book, Page } from '../types';
import SongGrid from './SongGrid.vue';

const currentUnit = ref('');
const currentBook = ref('');
const currentLesson = ref('');

const theBookData = computed(() => (youtubeData as Book[]).find((book) => book.playlistId === currentBook.value)!);

const page = ref<Page>(Page.Home);

// Parse the handle of format #M7.2U2L3
function parseHandle() {
    if(window.location.hash) {
        const regex = /#M(\d+(?:\.\d)?)(?:S|(U(\d+|X)(?:L([A-Za-z0-9\-_]+|\d))?))?/.exec(window.location.hash);
        if(regex) {
            const [, book, , unit, lesson] = regex;
            if(lesson) {
                page.value = Page.Lesson;
                currentUnit.value = unit;
                currentBook.value = (youtubeData.find(b => b.playlistTitle.includes("Book " + book)) ?? youtubeData.find(b => b.playlistTitle.includes("2nd Edition"))!).playlistId;
                currentLesson.value = lesson;
            } else if (unit) {
                page.value = Page.Unit;
                currentUnit.value = unit;
                currentBook.value = (youtubeData.find(b => b.playlistTitle.includes("Book " + book)) ?? youtubeData.find(b => b.playlistTitle.includes("2nd Edition"))!).playlistId;
            } else if (window.location.hash.match(/#M\d+(?:\.\d)?S/)) {
                page.value = Page.Songs;
                currentBook.value = (youtubeData.find(b => b.playlistTitle.includes("Book " + book)) ?? youtubeData.find(b => b.playlistTitle.includes("2nd Edition"))!).playlistId;
            } else if (book) {
                page.value = Page.Book;
                currentBook.value = (youtubeData.find(b => b.playlistTitle.includes("Book " + book)) ?? youtubeData.find(b => b.playlistTitle.includes("2nd Edition"))!).playlistId;
            } else {
                page.value = Page.Home;
            }
            console.log(book, unit, lesson);
        } else {
            page.value = Page.Home;
        }
    } else {
        page.value = Page.Home;
    }
}
parseHandle();
window.addEventListener("hashchange", parseHandle);

const theLesson = computed(() => {
    if(page.value === Page.Lesson) {
        if(currentUnit.value === "X") {
            return theBookData.value.lessons.find(l => l.videoId === currentLesson.value)!;
        }
        return theBookData.value.lessons.find(l => l.unitNumber === parseInt(currentUnit.value) && l.lessonNumber === parseInt(currentLesson.value))!;
    }
    return null;
});

</script>

<template>
    <Navigation :page="page" :book="currentBook" :unit="currentUnit" :lesson="currentLesson" :youtube-data="youtubeData" />
    <BookGrid :data="youtubeData" v-if="page === Page.Home" />
    <UnitGrid :unit="theBookData" v-else-if="page === Page.Book"/>
    <SongGrid :book="theBookData" v-else-if="page === Page.Songs"/>
    <LessonGrid :book="theBookData" :unit="parseInt(currentUnit)" v-else-if="page === Page.Unit"/>
    <ChapterGrid :book="theBookData" :lesson="theLesson!" v-else-if="page === Page.Lesson"/>
</template>
