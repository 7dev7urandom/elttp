import { createApp } from 'vue'
import './style.css'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeVue from './routes/Home.vue'
import BookGridVue from './components/BookGrid.vue'
import UnitGridVue from './components/vocab-supplement/UnitGrid.vue'
import LessonGridVue from './components/vocab-supplement/LessonGrid.vue'
import ChapterGridVue from './components/vocab-supplement/ChapterGrid.vue'
import SongGridVue from './components/songs/SongGrid.vue'
import youtubeData from './data.json';

function getBookFromNumber(bookNumber: any) {
    return youtubeData.find((b) => b.playlistTitle.includes("Book " + bookNumber + " -")) ?? youtubeData.find((b) => b.playlistTitle.includes("2nd Edition"))!;
}

const routes: RouteRecordRaw[] = [
    { path: '/', component: HomeVue },
    {
        path: '/vocab-supplement',
        component: BookGridVue
    },
    {
        path: '/vocab-supplement/:book',
        component: UnitGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book)
        })
    },
    {
        path: '/vocab-supplement/:book/:unit',
        component: LessonGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book),
            unit: params.unit
        })
    },
    {
        path: '/vocab-supplement/:book/other/:videoId',
        component: ChapterGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book),
            videoId: params.videoId
        })
    },
    {
        path: '/vocab-supplement/:book/:unit/:lesson',
        component: ChapterGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book),
            unit: params.unit,
            lesson: params.lesson
        })
    },
    {
        path: '/songs',
        component: BookGridVue,
        props: {
            songs: true
        }
    },
    {
        path: '/songs/:book',
        component: SongGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book)
        })
    },

];
if(!window.location.href.endsWith("/")) {
    window.location.href += "/";
}

const router = createRouter({
    history: createWebHistory(),
    routes,
})


createApp(App).use(router).mount('#app')
