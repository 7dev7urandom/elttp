<template>
    <StandardGrid :items="pdfFiles" @select="loadPdf" />
</template>
<script setup lang="ts">
import StandardGrid from '../cardgrid/StandardGrid.vue'

function loadPdf(data: any) {
    window.location.assign(data.link);
}

const pdfFiles = ["1", "2", "3", "4"].map(n => ({ link: "/lesson-plans/M" + n + ".pdf", title: "Book " + n }));
</script>