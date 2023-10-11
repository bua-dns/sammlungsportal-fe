<script setup>
  const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/bua_collections?limit=-1&sort=label&meta=total_count');
  const theme = useState('theme');
  const w = theme.value.data.wording.de;
  const cardType = ref("grid");
  function toggleCardType() {
    cardType.value = cardType.value == "list" ? "grid" : "list";
  }
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-list"
              viewBox="0 0 16 16">
              <path
                d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z">
              </path>
              <path
                d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z">
              </path>
            </svg>
            <span class="description">sort by</span>
          </label>
          <select id="tag-cloud-sort-select" class="sort-select">
            <option value="name">name</option>
            <option value="count">count</option>
          </select>
        </div>
        <div class="input-group">
          <label for="tag-cloud-sort-order" class="order-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z">
              </path>
              <path
                d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z">
              </path>
            </svg>
            <span class="description">
              order
            </span>
          </label>
          <select id="tag-cloud-sort-order" class="order-select">
            <option value="asc">ascending</option>
            <option value="desc">descending</option>
          </select>
        </div>
    </div>
    <div class="grid-controls">
      <button class="btn-switch" @click="toggleCardType">
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
  <!-- <pre>{{ data }}</pre> -->
  <div v-if="cardType == 'list'" class="collection_cards_wrapper">
    <CollectionCard v-for="collection in data.data" :key="collection.id" :entry="collection" />
  </div>
  <div v-if="cardType == 'grid'" class="collection_cards_wrapper card-grid">
    <CollectionCardGrid v-for="collection in data.data" :key="collection.id" :entry="collection" />
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
}

.grid-control-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
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

.btn-switch {
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
}

.sort-controls {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}

.filter-label,
.sort-label,
.order-label {
  display: flex;
  align-items: center;
  margin: 0;
  padding: .5rem;
  line-height: 1;
  // background-color: var(--clr-base-d550);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  // border: 1px solid var(--clr-base-d400);
  border-right: 0;
}

.sort-select,
.order-select {
  flex-grow: 1;
  margin: 0;
  padding: .5rem .25rem .5rem .25rem;
  font-size: .85rem;
  // color: var(--clr-base-l200);
  line-height: 1;
  // background-color: var(--clr-base-d550);
  // border: 1px solid var(--clr-base-d400);
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

// main.scrolled .gws-grid-control-bar{
//   margin-top: 80px;
// }</style>