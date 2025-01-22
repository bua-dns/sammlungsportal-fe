<script setup>
/* Used auto-imported composables: projectConfig */

const props = defineProps({
  'cardContent': {
    type: Object,
  },
});

</script>

<template>
  <div class="feature-card page-card">
    <div class="card-image">
      <NuxtLink :to="cardContent.more_button_link" v-if="cardContent.card_image">
        <img :src="`${projectConfig.imageBaseUrl}/${cardContent.card_image.filename_disk}?key=feature-card`" alt="">
      </NuxtLink>
    </div>
    <div class="card-body">
      <div class="card-body-content">
        <h3 class="card-title">{{ cardContent.title }}</h3>
        <div class="card-text" v-html="truncateText(cardContent.card_text,240)" />
      </div>
      <div class="card-footer">
        <NuxtLink :to="cardContent.more_button_link" class="card-link">
          {{ cardContent.more_button_label}}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style  lang="scss">
.feature-card {
  .card-body {
    min-height: 13rem;
  }
}

</style>