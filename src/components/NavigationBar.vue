<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const routes = computed<string[]>(() => {
  if (router.currentRoute.value.fullPath === "/") {
    return [];
  }
  switch (router.currentRoute.value.fullPath.split("/")[1]) {
    case "activities":
      const activ = ["Activities"];
      const gParam = router.currentRoute.value.params.game as string;
      if (gParam)
        activ.push(
          gParam
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ")
        );
      return activ;
    case "supplement-books":
      return ["Supplement Books"];
    case "phonics":
      const phon = ["Phonics"];
      switch (router.currentRoute.value.fullPath.split("/")[2]) {
        case "documents":
          phon.push("Documents");
          break;
        case "videos":
          phon.push("Videos");
          break;
      }
      return phon;
    case "manipulatives":
      const manip = ["Manipulatives"];
      if (router.currentRoute.value.params.book)
        manip.push("Book " + router.currentRoute.value.params.book);
      return manip;
    case "supplement-audio":
      const vocabSupplement = ["Supplement Audio"];
      if (router.currentRoute.value.params.book) {
        vocabSupplement.push(`Book ${router.currentRoute.value.params.book}`);
      } else return vocabSupplement;
      if (router.currentRoute.value.params.unit) {
        vocabSupplement.push(`Unit ${router.currentRoute.value.params.unit}`);
      } else return vocabSupplement;
      return vocabSupplement;
    case "songs":
      const songs = ["Songs"];
      if (router.currentRoute.value.params.category) {
        songs.push(router.currentRoute.value.params.category as string);
      }
      return songs;
    case "textbook-audio":
      const vocab = ["Textbook Audio"];
      if (router.currentRoute.value.params.book) {
        vocab.push(`Book ${router.currentRoute.value.params.book}`);
      } else return vocab;
      if (router.currentRoute.value.params.unit) {
        vocab.push(`Unit ${router.currentRoute.value.params.unit}`);
      } else return vocab;
      if (router.currentRoute.value.params.lesson) {
        vocab.push(`Lesson ${router.currentRoute.value.params.lesson}`);
      } else return vocab;
      return vocab;
    case "books":
      return ["Books"];
    case "sample-lessons":
      const sampleLessons = ["Sample Lesson Videos"];
      if (router.currentRoute.value.params.category) {
        sampleLessons.push(router.currentRoute.value.params.category as string);
      }
      return sampleLessons;
    default:
      return ["Not Found"];
  }
});
function goToPart(part: number) {
  router.push(
    router.currentRoute.value.fullPath
      .split("/")
      .slice(0, part + 1)
      .join("/") + "/"
  );
}
</script>
<template>
  <div>
    <span @click="goToPart(0)">Home</span>
    <span
      v-for="(r, index) in routes"
      :key="index"
      class="arrow"
      @click="goToPart(index + 1)"
    >
      <span>{{ r }}</span>
    </span>
  </div>
</template>
<style scoped>
span.arrow::before {
  content: " > ";
  text-decoration: none;
}
div {
  text-align: start;
  padding: 1em;
}
span:not(.arrow) {
  text-decoration: underline;
  cursor: pointer;
}
</style>
