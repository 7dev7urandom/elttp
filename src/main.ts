import { createApp } from 'vue'
import './style.css'
import VocabSupplement from './routes/VocabSupplement.vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
    { path: '/', component: VocabSupplement },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


createApp(App).use(router).mount('#app')
