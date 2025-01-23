<script setup>
/* Used auto-imported composables: projectConfig */

const props = defineProps({
  'cardContent': {
    type: Object,
  },
});

</script>

<template>
  <div class="page-card-online-resources page-card                                    ">
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
          <h3 class="card-title">{{ cardContent.collection }}</h3>
        </NuxtLink>
        <div class="card-text" v-if="cardContent.description" v-html="cardContent.description" />
      </div>
      <div class="card-footer">
        <a :href="`${cardContent.link}`" target="_blank" class="card-link"
          alt="Objekte der Sammlung in der Online-Ressource" title="Objekte der Sammlung in der Online-Ressource">
          zur Ressource (ca. {{ formatNumberWithPeriods(cardContent.amount_of_objects) }} Objekte)
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.page-card-online-resources {
  .card-body {
    min-height: 17rem;
  }
}
</style>