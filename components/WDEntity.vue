<script setup>

const props = defineProps({
  entity: { 
    type: Object
  }
});
const { data: relatedItemsData } = await useFetch('https://ikb-lbs-hub.bua-dns.de/items/ikb_items', {
  query: {
    //'filter[object_name_wikidata_refs_list][_contains]': `-${props.entity.q_number}-`,
    search: `-${props.entity.q_number}-`,
    limit: -1,
    // zum Testen der Paginierung
    // limit: 755,
    // page: 1
  }
});

const relatedItems = computed(() => {
  return relatedItemsData.value?.data
    .sort((a, b) => {
      if (a.dns_date_medium_earliest < b.dns_date_medium_earliest) return -1;
      if (a.dns_date_medium_earliest > b.dns_date_medium_earliest) return 1;
      return 0;
    })
});
const pageSize = 250;
const page = ref(1);
const numberOfPages = computed(() => {
  return Math.ceil(relatedItems.value.length / pageSize);
});
function getPage(items) {
  return items.slice((page.value - 1) * pageSize, page.value * pageSize);
}
function setPage(target) {
  if (target === 'start') {
    page.value = 1;
  }
  if (target === 'prev') {
    page.value = Math.max(page.value - 1, 1);
  }
  if (target === 'next') {
    page.value = Math.min(page.value + 1, numberOfPages.value);
  }
  if (target === 'end') {
    page.value = numberOfPages.value;
  }
}
// Compute the range of items displayed
const startItemIndex = computed(() => (page.value - 1) * pageSize + 1);
const endItemIndex = computed(() => Math.min(page.value * pageSize, relatedItems.value.length));
</script>

<template>
  <div class="wd-entity">
    <h2>{{ entity.handle }}</h2>
    <div class="pagination">
      <div class="counter">{{ relatedItems.length }} Medien, die dieses Objekt zeigen</div> 
      <div class="pagination-nav" v-if="numberOfPages > 1">
          <div class="to-start" @click="setPage('start')" :class="{ 'disabled': page === 1 }">|<</div>
          <div class="to-prev" @click="setPage('prev')" :class="{ 'disabled': page === 1 }"><</div>
          <div class="indicator">{{ startItemIndex }} - {{ endItemIndex }}</div>
          <div class="to-next" @click="setPage('next')" :class="{ 'disabled': page === numberOfPages }">></div>
          <div class="to-end" @click="setPage('end')" :class="{ 'disabled': page === numberOfPages }">>|</div>
      </div>
    </div>
    <div class="items-listing">
      <div class="item" v-for="item in getPage(relatedItems)" :key="`item-${item.id}`">
        <IKBItem :item="item" />
      </div>
    </div>
    <div class="pagination-nav" v-if="numberOfPages > 1">
        <div class="to-start" @click="setPage('start')" :class="{ 'disabled': page === 1 }">|<</div>
        <div class="to-prev" @click="setPage('prev')" :class="{ 'disabled': page === 1 }"><</div>
        <div class="indicator">{{ startItemIndex }} - {{ endItemIndex }}</div>
        <div class="to-next" @click="setPage('next')" :class="{ 'disabled': page === numberOfPages }">></div>
        <div class="to-end" @click="setPage('end')" :class="{ 'disabled': page === numberOfPages }">>|</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  margin: 2rem auto;
  .counter {
    text-align: center;
    padding: 0.5rem;
  }
}
.pagination-nav {
  margin: 0 auto;
  max-width: 14rem;
  display: flex;
  gap: 0.5rem;
  .to-start, .to-prev, .to-next, .to-end {
    cursor: pointer;
    flex-basis: 1.5rem;
    &.disabled {
      opacity: 0.2;
      cursor: default;
    }
    
  }
  .indicator {
    flex-basis: 8rem;
    text-align: center;
  } 
}
.items-listing {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 220px;
    margin: 10px;
    img {
      width: 100%;
    }
    .basic-info {
      font-size: 0.8rem;
    } 
  }
}
</style>