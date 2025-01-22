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
      <a :href="`${cardContent.link}`" target="_blank" alt="Objekte der Sammlung in der Online-Ressource"
        title="Objekte der Sammlung in der Online-Ressource">
        <img v-if="cardContent.screenshot"
          :src="`${projectConfig.imageBaseUrl}/${cardContent.screenshot}?key=related-collection-card`" alt="">
      </a>
    </div>
    <div class="card-body">
      <div class="card-body-content">
        <NuxtLink :to="`/sammlungen/?acid=${cardContent.id}`">
          <h5 class="mt-1 card-title">{{ cardContent.collection }}</h5>
        </NuxtLink>
        <div class="mb-2 card-text" v-if="cardContent.description" v-html="truncateText(cardContent.description,640)" />
      </div>
      <a :href="`${cardContent.link}`" target="_blank" class="card-link"
        alt="Objekte der Sammlung in der Online-Ressource" title="Objekte der Sammlung in der Online-Ressource">
        zur Ressource (ca. {{ formatNumberWithPeriods(cardContent.amount_of_objects) }} Objekte) ...
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">


.page-card {
  color: var(--color-feature-card-text);
  border: 1px solid var(--color-feature-card-border);
  background-color: var(--color-feature-card-fill);
  min-height: 26rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  h5, h6 {
    margin: 0;
  }
  h6 {
    font-weight: 400;
  }
  p {
    margin: 0 0 0.25rem 0;
  }
  .card-image {
  overflow: hidden;
  height: 9.5rem;
  cursor: pointer;
  max-width: 100%;

  img {
    display: block;
    margin: 0 auto;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; // Ensures the image covers its container neatly
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
    min-height: 16rem;
    .card-body-content {

      .card-title {
        margin-bottom: .25rem;
        font-size: .7rem;
        @media screen and (min-width: 768px) {
          font-size: 1rem;
        }
      }
      .card-text {
        font-size: .6rem;
        @media screen and (min-width: 576px) {
          font-size: .75rem;
        }
      }
    }
    .card-link {
      display: block;
      color: var(--color-link);
      text-align: right;
      font-size: .6rem;
      @media screen and (min-width: 576px) {
        font-size: .75rem;
      }
    }
  }
}
</style>