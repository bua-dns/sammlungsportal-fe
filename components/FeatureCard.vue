<script setup>

const props = defineProps({
  'cardContent': {
    type: Object,
    required: true,
  },
});


</script>

<template>
  <div class="feature-card">
    <div class="card-body">
      {{ Object.keys(cardContent) }}
      {{ cardContent.title }}
      {{ cardContent.card_text }}
      {{ cardContent.card_image.filename_disk }}
      <NuxtLink :to="cardContent.more_button_link" class="card-link large">
        link
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">

  .feature-card {
    color: var(--color-text);
    border: none;
    min-height: 20rem;
    border: 2px solid #ccc;
  }
</style>