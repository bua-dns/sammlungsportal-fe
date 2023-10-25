<script setup>
  const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/bua_collections?limit=-1&sort=label&meta=total_count');
  const theme = useState('theme');
  const w = theme.value.data.wording.de;
  const cardType = ref("grid");
  function toggleCardType() {
    cardType.value = cardType.value == "list" ? "grid" : "list";
  }

  // sort
  const sortby = ref("label");
  const order = ref("asc");
  const sortedData = computed(() => {
    return data.value.data.sort((a, b) => {
      if (a[sortby.value] < b[sortby.value]) {
        return order.value == "asc" ? -1 : 1;
      }
      if (a[sortby.value] > b[sortby.value]) {
        return order.value == "asc" ? 1 : -1;
      }
      return 0;
    });
  });
</script>
<template>
  <Head>
    <Title>{{ w.page_start }}</Title>
  </Head>
  <!--
  <div class="hero">
    <img style="width:100%;height:auto;" src="@/assets/img/Collage_01.png" alt="hero image" />
  </div>
  -->
  <div class="grid-control-bar">
    <div class="collections-counter">{{ w.num_collections }}: {{ data.meta.total_count }}</div>
    <div class="sort-controls">
        <div class="input-group">
          <label for="tag-cloud-sort-select" class="sort-label">
            <svg class="icon-sm me-1" width="16" height="16" fill="currentColor">
              <use xlink:href="@/assets/img/bootstrap-icons.svg#list-ol"></use>
            </svg>
            <span class="description">{{ w.sortby }}</span>
          </label>
          <select id="tag-cloud-sort-select" class="sort-select" v-model="sortby" >
            <option value="label">{{ w.label }}</option>
            <option value="current_keeper">{{ w.current_keeper }}</option>
          </select>
        </div>
        <div class="input-group">
          <label for="tag-cloud-sort-order" class="order-label">
            <svg class="icon-sm me-1" width="16" height="16" fill="currentColor">
              <use xlink:href="@/assets/img/bootstrap-icons.svg#sort-alpha-down"></use>
            </svg>
            <span class="description">{{ w.order }}</span>
          </label>
          <select id="tag-cloud-sort-order" class="order-select" v-model="order">
            <option value="asc">{{ w.ascending }}</option>
            <option value="desc">{{ w.descending }}</option>
          </select>
        </div>
    </div>
    <div class="gws-btn-group">
      <div class="filter-controls gws-group-element">
        <button class="gws-btn btn-filter">
          <span title="filter">
            <svg class="icon" width="16" height="16" fill="currentColor">
              <use xlink:href="@/assets/img/bootstrap-icons.svg#filter"></use>
            </svg>
          </span>
        </button>
      </div>
      <div class="grid-controls gws-group-element">
        <button class="gws-btn btn-switch" @click="toggleCardType">
          <span v-if="cardType == 'list'" :title="w.grid">
            <svg class="icon" width="16" height="16" fill="currentColor">
              <use xlink:href="@/assets/img/bootstrap-icons.svg#grid"></use>
            </svg>
          </span>
          <span v-if="cardType == 'grid'" :title="w.list">
            <svg class="icon" width="16" height="16" fill="currentColor">
              <use xlink:href="@/assets/img/bootstrap-icons.svg#view-list"></use>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
  <!-- <pre>{{ data }}</pre> -->
  <div v-if="cardType == 'list'" class="collection_cards_wrapper">
    <CollectionCard v-for="collection in sortedData" :key="collection.id" :entry="collection" />
  </div>
  <div v-if="cardType == 'grid'" class="collection_cards_wrapper card-grid">
    <CollectionCardGrid v-for="collection in sortedData" :key="collection.id" :entry="collection" />
  </div>
</template>
<style scoped lang="scss">
.collection_cards_wrapper {
  width: min(100%, 1200px);
  margin-inline: auto;
  padding: 1rem 0;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  // grid-template-columns: repeat(5,1fr);
  grid-gap: 1rem;
  // grid-gap: 0.5rem;
}

.grid-control-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: min(100%, 1200px);
  margin: 132px auto 0;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.collections-counter {
  font-size: 0.85rem;
}

// .btn-switch {
//   margin: 0;
//   padding: 0;
//   width: auto;
//   overflow: visible;
//   border: none;
//   background-color: transparent;
//   cursor: pointer;
//   outline: none;
// }

.sort-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  // gap: 1rem;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.filter-label,
.sort-label,
.order-label {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0.25rem;
  line-height: 1;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid var(--color-btn-brd);
  border-right: 0;
}

.sort-select,
.order-select {
  flex-grow: 1;
  margin: 0;
  padding: .5rem .25rem .5rem .25rem;
  // font-size: .85rem;
  line-height: 1;
  border: 1px solid var(--color-btn-brd);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.input-group {
  display: flex;
  flex-grow: 1;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}
.icon-sm {
  width: 1.25rem;
  height: 1.25rem;
}

// main.scrolled .gws-grid-control-bar{
//   margin-top: 80px;
// }</style>