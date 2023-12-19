<template>
  <div
    class="card"
    :style="{
      padding: $slots.insidecard ? '0.5em' : undefined,
    }"
    @click="isMobile() && downloadButtonOnMobile ? 0 : $emit('select')"
  >
    <div
      class="card_content"
      :style="{
        flexDirection: downloadButtonOnMobile ? undefined : 'column',
      }"
    >
      <slot name="insidecard">
        <h3
          class="card_title"
          @click="
            downloadButtonOnMobile && isMobile() ? $emit('selectMobile') : 0
          "
        >
          {{ title }}
        </h3>
      </slot>
      <slot name="downloadButton">
        <div v-if="isMobile() && downloadButtonOnMobile" id="divider" />
        <svg-icon
          v-if="isMobile() && downloadButtonOnMobile"
          :path="mdiDownload"
          type="mdi"
          size="32"
          class="downloadicon"
          @click="$emit('download')"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isMobile } from "../../util";
// @ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiDownload } from "@mdi/js";

defineProps<{
  title?: string;
  downloadButtonOnMobile?: boolean;
}>();

defineEmits<{
  (event: "select"): void;
  (event: "selectMobile"): void;
  (event: "download"): void;
}>();
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* padding: .5em; */
  border-radius: 0.5em;
  background-color: var(--card-color);
  /* box-shadow: 0 0 0.5em #00000033; */
  border: var(--card-color) 1px solid;
  transition: all 300ms;
  overflow: hidden;
  box-shadow: 0 0 1em #00000066;
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
  align-items: center;
  justify-content: center;
  width: 100%;
}

.card_title {
  margin: 0;
  padding: 0.5em;
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
}
#divider {
  width: 1px;
  height: 80%;
  background-color: var(--card-border-color);
  float: right;
  position: relative;
}
.downloadicon {
  float: right;
  padding: 15px 15px 15px 15px;
}
h3 {
  float: left;
  width: 80%;
}
</style>
