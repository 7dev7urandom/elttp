import { createApp } from 'vue';
import './style.css';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomeVue from './routes/HomePage.vue';
import BookGridVue from './components/BookGrid.vue';
import UnitGridVue from './components/textbook-audio/UnitGrid.vue';
import LessonGridVue from './components/textbook-audio/LessonGrid.vue';
import ChapterGridVue from './components/textbook-audio/ChapterGrid.vue';
import VocabularyUnitGridVue from './components/supplement-audio/UnitGrid.vue';
import VocabularyLessonGridVue from './components/supplement-audio/LessonGrid.vue';
import SongGridVue from './components/songs/SongGrid.vue';
import LessonPlanGridVue from './components/lesson-plans/LessonPlanGrid.vue';
import MobilePdfViewerVue from './components/MobilePdfViewer.vue';
import PageNotFoundVue from './components/PageNotFound.vue';
import youtubeData from './data.json';
import { BookGridType } from './types';
import PhonicsGridVue from './components/phonics/PhonicsGrid.vue';
import ManipulativesGridVue from './components/manipulatives/ManipulativesGrid.vue';
import MainGridVue from './components/manipulatives/MainGrid.vue';
import PhonicsDocumentGridVue from './components/phonics/PhonicsDocumentGrid.vue';
import PhonicsVideosGridVue from './components/phonics/PhonicsVideosGrid.vue';
import ActivitiesGridVue from './components/activities/ActivitiesGrid.vue';
import ActivitiesGameGridVue from './components/activities/ActivitiesGameGrid.vue';

function getBookFromNumber(bookNumber: any, bookAudio = true) {
    if(Number.isNaN(parseFloat(bookNumber))) return null;
    return bookAudio ? youtubeData.bookAudioPlaylists.find((b) => b.playlistTitle.includes("Book " + bookNumber + " -")) ?? youtubeData.bookAudioPlaylists.find((b) => b.playlistTitle.includes("2nd Edition"))!
        : youtubeData.supplementVocabPlaylists.find((b) => b.playlistTitle.includes("Book " + bookNumber + " -")) ?? youtubeData.supplementVocabPlaylists.find((b) => b.playlistTitle.includes("2nd Edition"))!;
}

const routes: RouteRecordRaw[] = [
    { path: '/', component: HomeVue },
    {
        path: '/activities',
        component: ActivitiesGridVue
    },
    {
        path: '/activities/:game',
        component: ActivitiesGameGridVue,
        props: true
    },
    {
        path: '/textbook-audio',
        component: BookGridVue,
        props: {
            type: BookGridType.TextbookAudio
        }
    },
    {
        path: '/textbook-audio/:book',
        component: UnitGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book)
        })
    },
    {
        path: '/textbook-audio/:book/:unit',
        component: LessonGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book),
            unit: params.unit
        })
    },
    {
        path: '/textbook-audio/:book/other/:videoId',
        component: ChapterGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book),
            videoId: params.videoId
        })
    },
    {
        path: '/textbook-audio/:book/:unit/:lesson',
        component: ChapterGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book),
            unit: params.unit,
            lesson: params.lesson
        })
    },
    {
        path: '/supplement-audio',
        component: BookGridVue,
        props: {
            type: BookGridType.VocabSupplement
        }
    },
    {
        path: '/supplement-audio/:book',
        component: VocabularyUnitGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book, false)
        })
    },
    {
        path: '/supplement-audio/:book/:unit',
        component: VocabularyLessonGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book, false),
            unit: params.unit
        })
    },
    {
        path: '/lesson-plans',
        component: LessonPlanGridVue
    },
    // '/lesson-plans/:book' handled automatically by public folder
    {
        path: '/mobile-viewer/:pdfPath*',
        component: MobilePdfViewerVue,
        props: true
    },
    {
        path: '/phonics',
        component: PhonicsGridVue
    },
    {
        path: '/phonics/documents',
        component: PhonicsDocumentGridVue
    },
    {
        path: '/phonics/videos',
        component: PhonicsVideosGridVue
    },
    {
        path: '/manipulatives',
        component: MainGridVue
    },
    {
        path: '/manipulatives/:book',
        component: ManipulativesGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book, false),
            bookNum: params.book
        })
    },
    {
        path: '/songs',
        component: BookGridVue,
        props: {
            type: BookGridType.Songs
        }
    },
    {
        path: '/songs/:book',
        component: SongGridVue,
        props: ({ params }) => ({
            book: getBookFromNumber(params.book)
        })
    },
    {
        path: '/:pathMatch(.*)*',
        component: PageNotFoundVue,
    }

];
if(!window.location.href.endsWith("/")) {
    window.location.href += "/";
}

const router = createRouter({
    history: createWebHistory(),
    routes,
});


createApp(App).use(router).mount('#app');
