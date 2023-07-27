<template>
    <StandardGrid :items="items" @select="itemClicked">

    </StandardGrid>
</template>
<script setup lang="ts">
import StandardGrid from '../cardgrid/StandardGrid.vue';

const items = ["SE Asia Map.pdf", "M3U9L2 PICS What is this made of.docx", "M3U1L2 PICS family.docx", "M3U6L1 PICS While I was . . ..docx"]
    .map(n => ({ link: n, title: n.replace(".docx", "").replace(".pdf", "") }));


function itemClicked(data: any) {
    // TODO: mobile device support for docx files?
    window.location.assign(data.link);
}
</script>