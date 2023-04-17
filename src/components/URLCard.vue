<script setup lang="ts">
const props = defineProps<{ link: string, title: string }>();
function goToVideo() {
    window.location.assign(props.link);
}
</script>

<template>
    <div class="chapter-card" @click="goToVideo">
        <div class="chapter-card__content">
            <h3 class="chapter-card__title">{{ title }}</h3>
        </div>
    </div>
</template>

<style scoped>
.chapter-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: .5em;
    border-radius: 0.5em;
    background-color: var(--card-color);
    box-shadow: 0 0 0.5em #00000033;
    border: var(--card-color) 1px solid;
    transition: all 300ms;
}

.chapter-card:hover {
    box-shadow: 0 0 1em #00000033;
    transform: scale(1.02);
    cursor: pointer;
    border: var(--card-border-color) 1px solid;
}
.chapter-card img {
    width: 100%;
    height: auto;
    max-width: 200px;
    object-fit: cover;
}
.chapter-card__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.chapter-card__title {
    margin: 0;
    font-size: 1.5em;
    font-weight: 600;
    text-align: center;
}
</style>
