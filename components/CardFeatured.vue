<script setup>

const props = defineProps({
  'cardContent': {
    type: Object,
    required: true,
  },
});
const imageBasePath = "https://sammlungsportal.bua-dns.de/assets/";


</script>

<template>
  <div class="feature-card">
    <div class="card-image">
      <img :src="imageBasePath + cardContent.card_image.filename_disk + '?key=feature-card'" alt="">
    </div>
    <div class="card-body">
      
      <div class="card-title"><span>{{ cardContent.title }}</span></div>
      <div class="card-text" v-html="cardContent.card_text"/>
      <NuxtLink :to="cardContent.more_button_link" class="card-link large">
        {{ cardContent.more_button_label}}
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
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .card-image {
    position: relative;
    height: 10rem;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      max-height: 12rem;
      object-fit: cover;
    }
  }
  .card-body {
    padding: .25rem;
    .card-title {

    }
    .card-text {
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
  }
}
</style>