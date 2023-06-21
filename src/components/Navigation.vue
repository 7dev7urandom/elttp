<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const routes = computed<string[]>(() => {
    if(router.currentRoute.value.fullPath === '/') {
        return [];
    }
    switch(router.currentRoute.value.fullPath.split('/')[1]) {
        case 'vocab-supplement':
            const ret = ['Vocabulary Supplement'];
            if(router.currentRoute.value.params.book) {
                ret.push(`Book ${router.currentRoute.value.params.book}`);
            } else return ret;
            if(router.currentRoute.value.params.unit) {
                ret.push(`Unit ${router.currentRoute.value.params.unit}`);
            } else return ret;
            if(router.currentRoute.value.params.lesson) {
                ret.push(`Lesson ${router.currentRoute.value.params.lesson}`);
            } else return ret;
            return ret;
        case 'songs':
            return ['Songs'];
        case 'books':
            return ['Books'];
        default:
            return [];
    }
});
function goToPart(part: number) {
    router.push(router.currentRoute.value.fullPath.split('/').slice(0, part + 1).join('/') || '/');
}
</script>
<template>
    <div>
        <span @click="goToPart(0)">Home</span>
        <span class="arrow" v-for="(r, index) in routes" @click="goToPart(index + 1)">
            <span>{{ r }}</span>
        </span>
    </div>
</template>
<style scoped>
span.arrow::before {
    content: ' > ';
    text-decoration: none;
}
div {
    text-align: start;
    padding: 1em;
}
span:not(.arrow) {
    text-decoration: underline;
    cursor: pointer;
}
</style>