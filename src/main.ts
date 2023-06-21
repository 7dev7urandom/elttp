import { createApp } from 'vue'
import './style.css'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeVue from './routes/Home.vue'
import BookGridVue from './components/vocab-supplement/BookGrid.vue'
import UnitGridVue from './components/vocab-supplement/UnitGrid.vue'
import LessonGridVue from './components/vocab-supplement/LessonGrid.vue'
import ChapterGridVue from './components/vocab-supplement/ChapterGrid.vue'
import youtubeData from './data.json';

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
            book: (youtubeData.find((b) => b.playlistTitle.includes("Book " + params.book + " -")) ?? youtubeData.find((b) => b.playlistTitle.includes("2nd Edition"))!)
        })
    },
    {
        path: '/vocab-supplement/:book/:unit',
        component: LessonGridVue,
        props: ({ params }) => ({
            book: (youtubeData.find((b) => b.playlistTitle.includes("Book " + params.book + " -")) ?? youtubeData.find((b) => b.playlistTitle.includes("2nd Edition"))!),
            unit: params.unit
        })
    },
    {
        path: '/vocab-supplement/:book/other/:videoId',
        component: ChapterGridVue,
        props: ({ params }) => ({
            book: (youtubeData.find((b) => b.playlistTitle.includes("Book " + params.book + " -")) ?? youtubeData.find((b) => b.playlistTitle.includes("2nd Edition"))!),
            videoId: params.videoId
        })
    },
    {
        path: '/vocab-supplement/:book/:unit/:lesson',
        component: ChapterGridVue,
        props: ({ params }) => ({
            book: (youtubeData.find((b) => b.playlistTitle.includes("Book " + params.book + " -")) ?? youtubeData.find((b) => b.playlistTitle.includes("2nd Edition"))!),
            unit: params.unit,
            lesson: params.lesson
        })
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


createApp(App).use(router).mount('#app')
