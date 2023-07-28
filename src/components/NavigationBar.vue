<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const routes = computed<string[]>(() => {
    if(router.currentRoute.value.fullPath === '/') {
        return [];
    }
    switch(router.currentRoute.value.fullPath.split('/')[1]) {
        case 'lesson-plans':
            return ["Lesson Plans"];
        case 'phonics':
            return ["Phonics"];
        case 'manipulatives':
            return ["Manipulatives"];
        case 'vocabulary-supplement':
            const vocabSupplement = ["Vocabulary Supplement"];
            if(router.currentRoute.value.params.book) {
                vocabSupplement.push(`Book ${router.currentRoute.value.params.book}`);
            } else return vocabSupplement;
            if(router.currentRoute.value.params.unit) {
                vocabSupplement.push(`Unit ${router.currentRoute.value.params.unit}`);
            } else return vocabSupplement;
            return vocabSupplement;
        case 'songs':
            const songs = ['Songs'];
            if(router.currentRoute.value.params.book) {
                songs.push(`Book ${router.currentRoute.value.params.book}`);
            }
            return songs;
        case 'textbook-audio':
            const vocab = ['Textbook Audio'];
            if(router.currentRoute.value.params.book) {
                vocab.push(`Book ${router.currentRoute.value.params.book}`);
            } else return vocab;
            if(router.currentRoute.value.params.unit) {
                vocab.push(`Unit ${router.currentRoute.value.params.unit}`);
            } else return vocab;
            if(router.currentRoute.value.params.lesson) {
                vocab.push(`Lesson ${router.currentRoute.value.params.lesson}`);
            } else return vocab;
            return vocab;
        case 'books':
            return ['Books'];
        default:
            return ["Not Found"];
    }
});
function goToPart(part: number) {
    router.push(router.currentRoute.value.fullPath.split('/').slice(0, part + 1).join('/') + '/');
}
</script>
<template>
  <div>
    <span @click="goToPart(0)">Home</span>
    <span
      v-for="(r, index) in routes"
      :key="index"
      class="arrow"
      @click="goToPart(index + 1)"
    >
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