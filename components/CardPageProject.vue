<script setup>
/* Used auto-imported composables: projectConfig */

const props = defineProps({
  'cardContent': {
    type: Object,
  },
});

</script>

<template>
  <div class="page-card">
    <div class="card-image">
      <NuxtLink :to="`/projects/${cardContent.slug}`">
        <img v-if="cardContent.preview_image && cardContent.preview_image.filename_disk"
          :src="`${projectConfig.imageBaseUrl}/${cardContent.preview_image.filename_disk}?key=feature-card`" alt="">
      </NuxtLink>
    </div>
    <div class="card-body">
      <div class="card-body-content">
        <h5 class="mt-1 card-title">{{ cardContent.title }}</h5>
        <h6 class="">{{ cardContent.sub_line }}</h6>
        <!-- <div class="mb-2 card-text" v-html="truncateText(cardContent.card_text,240)" /> -->
      </div>
      <NuxtLink :to="`/projects/${cardContent.slug}`" class="card-link">
        mehr zu diesem Projekt ...
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">


.page-card {
  color: var(--color-feature-card-text);
  border: 1px solid var(--color-feature-card-border);
  background-color: var(--color-feature-card-fill);
  min-height: var(--page-card-height);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  // &:hover {
  //   background-color: var(--color-feature-card-fill-hover);
  // }
  h5, h6 {
    margin: 0;
  }
  .card-image {
    overflow: hidden;
    flex: 0 0 calc(var(--page-card-height) * 0.425);
    cursor: pointer;
    img {
      display: block;
      width: 100%;
      object-fit: cover;
      border-radius: 6px;
    }
    &:hover {
      img {
        transform: scale(1.05);
      }
    }
  }
  .card-body {
    flex: 1;
    padding: .5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .card-body-content {

      .card-title {
        min-height: 3.5rem;
      }
      .card-subline {
        font-size: var(--font-size-extra-small);
        min-height: 3.75rem;
      }
      .card-text {
        font-size: var(--font-size-extra-small);
      }
    }
    .card-link {
      display: block;
      color: var(--color-link);
      text-align: right;
    }
  }
}
</style>