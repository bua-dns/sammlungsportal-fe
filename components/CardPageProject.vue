<script setup>
/* Used auto-imported composables: projectConfig */

const props = defineProps({
  'cardContent': {
    type: Object,
  },
});

</script>

<template>
  <div class="page-card-projects page-card">
    <div class="card-image">
      <NuxtLink :to="`/projects/${cardContent.slug}`">
        <img v-if="cardContent.preview_image && cardContent.preview_image?.filename_disk"
          :src="`${projectConfig.imageBaseUrl}/${cardContent.preview_image?.filename_disk}?key=feature-card`" alt="">
      </NuxtLink>
    </div>
    <div class="card-body">
      <div class="card-body-content">
        <h3 class="card-title">{{ cardContent.title }}</h3>
        <div class="card-text">{{ cardContent.sub_line }}</div>
        <!-- <div class="mb-2 card-text" v-html="truncateText(cardContent.card_text,240)" /> -->
      </div>
      <div class="card-footer">
        <NuxtLink :to="`/projects/${cardContent.slug}`" class="card-link">
          mehr zu diesem Projekt
        </NuxtLink>
    </div>
    </div>
  </div>
</template>

<style lang="scss">
.page-card-projects {
  .card-body {
    min-height: 12rem;
  }
}
</style>