<script setup lang="ts">
import StandardCard from './StandardCard.vue';
type Titleable<T> = T & { title: string };
const props = defineProps<{ items: Titleable<unknown>[] }>();

function animDur(index: number, total: number) {
    const TIME = 300;
    return {
        animationDelay: `${index / total * TIME}ms`,
    };
}

</script>

<template>
    <div class="grid">
        <div class="grid_item" v-for="(item, index) in props.items" :key="index" :style="animDur(index, props.items.length)">
            <StandardCard :title="item.title" @select="$emit('select', item)">
                <slot :item="item"></slot>
            </StandardCard>
        </div>
    </div>
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(0, 1fr));
    grid-gap: 2em 1.5em;
    padding: 1em;
}
.grid_item {
    display: flex;
    align-items: center;
    justify-content: center;
    /* Allow to take up full space */
    width: 100%;
    height: 100%;
    opacity: 0;
    animation: fadeIn 300ms forwards;
    animation-timing-function: ease-in;
    animation-delay: 100ms;
    position: relative;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
        top: 1em;
    }
    100% {
        opacity: 1;
        top: 0;
    }
}
</style>