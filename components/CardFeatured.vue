<script setup>
/* Used auto-imported composables: projectConfig */

const props = defineProps({
  'cardContent': {
    type: Object,
  },
});

</script>

<template>
  <div class="feature-card">
    <div class="card-image">
      <img 
        :src="`${projectConfig.imageBaseUrl}/${cardContent.card_image.filename_disk}?key=feature-card`" 
        alt=""
      >
    </div>
    <div class="card-body">
      <div class="card-body-content">
        <div class="mt-2 card-title">{{ cardContent.title }}</div>
        <div class="card-text" v-html="cardContent.card_text"/>
      </div>
      <NuxtLink :to="cardContent.more_button_link" class="card-link">
        {{ cardContent.more_button_label}}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">

.feature-card {
  color: var(--color-feature-card-text);
  border: 2px solid var(--color-feature-card-border);
  background-color: var(--color-feature-card-fill);
  min-height: var(--feature-card-height);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  .card-image {
    overflow: hidden;
    flex: 0 0 calc(var(--feature-card-height) * 0.42);
    img {
      display: block;
      width: 100%;
      object-fit: cover;
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
        font-size: .85rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      .card-text {
        font-size: 0.85rem;
        margin-bottom: 1rem;
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