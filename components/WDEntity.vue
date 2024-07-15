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

const entityUrl = `https://ikb-lbs-hub.bua-dns.de/items/wd_entities/${props.entity.id}`;
console.log(entityUrl);
const { data: fullEntityData } = await useFetch(entityUrl);
const fullEntity = computed(() => {
  return fullEntityData.value.data;
}); 
</script>

<template>
  <div class="wd-entity">
    <div class="wd-entity-info">
      <h2>{{ entity.handle }}</h2>
      <div class="dev-output" v-if="false">
        {{ fullEntity }}
      </div>
      <a :href="`https://wikidata.org/wiki/${entity.q_number}`" class="wd-link" target="_blank">
        <img src="@/assets/img/Wikidata.svg" alt="Wikidata Logo">
        <span>Dieses Objekt auf Wikidata ansehen</span>
      </a>
      <div class="wd-classification" v-if="fullEntity.p31 && fullEntity.p31.length > 0">
        <h4>Klassifikation bei Wikidata (P31)</h4>
        <div class="wd-classification-entry" v-for="classification in fullEntity.p31"
          :key="`classification-${classification.q_number}`">
          <a :href="`https://wikidata.org/wiki/${classification.q_number}`" target="_blank">{{
            classification.handle }}</a>
        </div>
      </div>
    </div>

    <div class="pagination" v-if="relatedItems.length > 6">
      <div class="counter">
        {{ relatedItems.length }} Medien, die dieses Objekt zeigen
      </div>
      <template v-if="numberOfPages > 1">
        <div class="pagination-nav">
          <div class="to-start" @click="setPage('start')" :class="{ 'disabled': page === 1 }">|<< /div>
              <div class="to-prev" @click="setPage('prev')" :class="{ 'disabled': page === 1 }">
                << /div>
                  <div class="indicator">{{ startItemIndex }} - {{ endItemIndex }}</div>
                  <div class="to-next" @click="setPage('next')" :class="{ 'disabled': page === numberOfPages }">></div>
                  <div class="to-end" @click="setPage('end')" :class="{ 'disabled': page === numberOfPages }">>|</div>
              </div>
      </template>
    </div>
    <div class="items-listing">
      <div class="item" v-for="item in getPage(relatedItems)" :key="`item-${item.id}`">
        <IKBItem :item="item" />
      </div>
    </div>
    <div class="pagination-nav" v-if="numberOfPages > 1">
      <div class="to-start" @click="setPage('start')" :class="{ 'disabled': page === 1 }">|<< /div>
          <div class="to-prev" @click="setPage('prev')" :class="{ 'disabled': page === 1 }">
            << /div>
              <div class="indicator">{{ startItemIndex }} - {{ endItemIndex }}</div>
              <div class="to-next" @click="setPage('next')" :class="{ 'disabled': page === numberOfPages }">></div>
              <div class="to-end" @click="setPage('end')" :class="{ 'disabled': page === numberOfPages }">>|</div>
          </div>
      </div>
</template>

<style scoped lang="scss">
.wd-entity {
  .wd-entity-info {
    .wd-link {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      img {
        display: block;
        width: 3rem;
      }
    }
    .wd-classification {
      margin-top: 1rem;
      font-size: var(--font-size-text-small);
      h4 {
        font-size: var(--font-size-text-small);
        margin-bottom: 0.5rem;
      }
      .wd-classification-entry {
        
      }
    }
  }
}
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