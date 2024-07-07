<script setup>

const props = defineProps({
  entity: { 
    type: Object
  }
});
const { data: relatedItems } = await useFetch('https://ikb-lbs-hub.bua-dns.de/items/ikb_items', {
  query: {
    'filter[object_name_wikidata_refs_list][_contains]': props.entity.q_number,
    limit: -1,
  }
});
</script>

<template>
  <div class="wd-entity">
    {{ relatedItems }}
  </div>
</template>

<style scoped lang="scss">

</style>