<template>
    <iframe id="pdfViewer" :src="frameSource" sandbox="allow-scripts allow-same-origin"></iframe>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ pdfName: string }>();
const frameSource = computed(() => `https://docs.google.com/viewerng/viewer?url=https://elttp.org/lesson-plans/${props.pdfName}.pdf&embedded=true`);

</script>
<style scoped>
iframe {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}
</style>