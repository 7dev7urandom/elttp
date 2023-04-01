<script setup lang="ts">
defineProps<{ name: string }>();
defineEmits(["click"]);
</script>

<template>
    <div class="unit-card" @click="$emit('click')">
        <div class="unit-card__content">
            <h3 class="unit-card__title">{{ name }}</h3>
        </div>
    </div>
</template>

<style scoped>
.unit-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1em;
    border-radius: 0.5em;
    background-color: #444;
    box-shadow: 0 0 0.5em #00000033;
    border: #444 1px solid;
    transition: all 300ms;
    min-width: 250px;
}

.unit-card:hover {
    box-shadow: 0 0 1em #00000033;
    transform: scale(1.02);
    cursor: pointer;
    border: #aaa 1px solid;
}
.unit-card img {
    width: 100%;
    height: auto;
    max-width: 200px;
    object-fit: cover;
}
.unit-card__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.unit-card__title {
    margin: 0;
    font-size: 1.5em;
    font-weight: 600;
    text-align: center;
}
</style>
