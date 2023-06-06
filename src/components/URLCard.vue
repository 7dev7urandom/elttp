<script setup lang="ts">
import StandardCard from './cardgrid/StandardCard.vue';

const props = defineProps<{ link: string, title: string }>();
function goToVideo() {
    window.location.assign(props.link);
}
</script>

<template>
    <StandardCard :title="title" @click="goToVideo" />
</template>
