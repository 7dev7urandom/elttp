<template>
    <StandardGrid :items="routes" v-slot="{ item }" @select="open">
        <!-- Include title and icon -->
        <svg-icon :path="(item as any).icon" type="mdi" size="128" />
        <h3 class="book-card_title">{{ item.title }}</h3>
    </StandardGrid>
</template>
<script setup lang="ts">
import StandardGrid from '../components/cardgrid/StandardGrid.vue';
import { mdiBookPlus, mdiMusic } from '@mdi/js';
// @ts-ignore
import SvgIcon from '@jamescoyle/vue-icon';
import { useRouter } from 'vue-router';

const routes: { title: string, icon: string, path: string }[] = [];
routes.push({ title: "Vocabulary Supplement", icon: mdiBookPlus, path: "/vocab-supplement" });
routes.push({ title: "Songs", icon: mdiMusic, path: "/songs" });
const router = useRouter();
function open(item: {path: string}) {
    router.push(item.path + "/");
}
</script>