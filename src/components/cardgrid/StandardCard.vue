<template>
    <div class="card" @click="$emit('select')">
        <div class="card_content">
            <slot>
                <h3 class="card_title">{{ title }}</h3>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{ title?: string }>();

</script>
<style scoped>
.card {
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

.card:hover {
    box-shadow: 0 0 1em #00000033;
    transform: scale(1.02);
    cursor: pointer;
    border: var(--card-border-color) 1px solid;
}
.card img {
    width: 100%;
    height: auto;
    max-width: 200px;
    object-fit: cover;
}
.card_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.card_title {
    margin: 0;
    font-size: 1.5em;
    font-weight: 600;
    text-align: center;
}
</style>
