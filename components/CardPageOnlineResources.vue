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
  .card-image {
    overflow: hidden;
    height: 8.5rem;
    // flex: 0 0 calc(var(--page-card-height) * 0.425);
    cursor: pointer;
    max-width: 100%;
    img {
      display: block;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      max-width: 100%;
      height: auto;
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
      }
      .card-text {
        font-size: var(--font-size-extra-small);
      }
    }
    .card-link {
      display: block;
      color: var(--color-link);
      font-size: var(--font-size-extra-small);
      text-align: right;
    }
  }
}
</style>