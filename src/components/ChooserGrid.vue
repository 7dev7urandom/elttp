<script setup lang="ts">
import BookGrid from './BookGrid.vue';
import UnitGrid from './UnitGrid.vue';
import LessonGrid from './LessonGrid.vue';
import Navigation from './Navigation.vue';
import youtubeData from '../data.json';
import { computed, ref } from 'vue';
import { type Book, Page, type Chapter, type Lesson } from '../types';
import SongGrid from './SongGrid.vue';
import StandardGrid from './cardgrid/StandardGrid.vue';

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
            page.value = Page.Home;
            if(book) {
                currentBook.value = (youtubeData.find((b) => b.playlistTitle.includes("Book " + book)) ?? youtubeData.find((b) => b.playlistTitle.includes("2nd Edition"))!).playlistId;
                page.value = Page.Book;
            }
            if(unit) {
                currentUnit.value = unit;
                page.value = Page.Unit;
            }
            if(lesson) {
                currentLesson.value = lesson;
                page.value = Page.Lesson;
            }
            if(window.location.hash.match(/#M\d+(?:\.\d)?S/)) {
                page.value = Page.Songs;
                // currentBook.value = (youtubeData.find(b => b.playlistTitle.includes("Book " + book)) ?? youtubeData.find(b => b.playlistTitle.includes("2nd Edition"))!).playlistId;
            }

            // if(lesson) {
            //     page.value = Page.Lesson;
            //     currentUnit.value = unit;
            //     currentBook.value = (youtubeData.find(b => b.playlistTitle.includes("Book " + book)) ?? youtubeData.find(b => b.playlistTitle.includes("2nd Edition"))!).playlistId;
            //     currentLesson.value = lesson;
            // } else if (unit) {
            //     page.value = Page.Unit;
            //     currentUnit.value = unit;
            //     currentBook.value = (youtubeData.find(b => b.playlistTitle.includes("Book " + book)) ?? youtubeData.find(b => b.playlistTitle.includes("2nd Edition"))!).playlistId;
            // } else if (window.location.hash.match(/#M\d+(?:\.\d)?S/)) {
            //     page.value = Page.Songs;
            //     currentBook.value = (youtubeData.find(b => b.playlistTitle.includes("Book " + book)) ?? youtubeData.find(b => b.playlistTitle.includes("2nd Edition"))!).playlistId;
            // } else if (book) {
            //     page.value = Page.Book;
            //     currentBook.value = (youtubeData.find(b => b.playlistTitle.includes("Book " + book)) ?? youtubeData.find(b => b.playlistTitle.includes("2nd Edition"))!).playlistId;
            // } else {
            //     page.value = Page.Home;
            // }
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

function loadChapter(chapter: Chapter) {
    window.location.assign("https://www.youtube.com/watch?v=" + theLesson!.value!.videoId + "&list=" + theBookData.value.playlistId + "&t=" + chapter.time);
}
function loadLesson(lesson: Lesson) {
    const bookTitleArray = theBookData.value.playlistTitle.split(' - ')[0].split(' ');
    const book = bookTitleArray[1] + (bookTitleArray[2] === "2nd" ? ".2" : "");
    window.location.hash = "#M" + book + "U" + lesson.unitNumber + "L" + lesson.lessonNumber;
}
function goToVideo(videoId: string) {
    window.location.assign("https://www.youtube.com/watch?v=" + videoId + "&list=" + theBookData.value.playlistId);
}

</script>

<template>
    <Navigation :page="page" :book="currentBook" :unit="currentUnit" :lesson="currentLesson" :youtube-data="youtubeData" />
    <BookGrid :data="youtubeData" v-if="page === Page.Home" />
    <UnitGrid :unit="theBookData" v-else-if="page === Page.Book"/>
    <!-- <SongGrid :book="theBookData" v-else-if="page === Page.Songs"/> -->
    <StandardGrid 
        :items="theBookData.songs?.map(s => ({ ...s, title: `Unit ${s.unitNumber} - ${s.songName}` }))!"
        v-else-if="page === Page.Songs"
        @select="s => goToVideo(s.videoId)"
    />
    <!-- <LessonGrid :book="theBookData" :unit="parseInt(currentUnit)" v-else-if="page === Page.Unit"/> -->
    <StandardGrid 
        :items="theBookData.lessons
            .filter(l => l.unitNumber === parseInt(currentUnit))
            .map(l => ({ ...l, title: `M${l.bookNumber} Unit ${l.unitNumber} Lesson ${l.lessonNumber}` }))"
        v-else-if="page === Page.Unit" @select="loadLesson"
    />
    <StandardGrid :items="theLesson?.chapters ?? []" v-else-if="page === Page.Lesson" @select="loadChapter" />
    <!-- <ChapterGrid :book="theBookData" :lesson="theLesson!" v-else-if="page === Page.Lesson"/> -->
</template>
