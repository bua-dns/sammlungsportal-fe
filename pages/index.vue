<script setup>
const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/bua_collections?limit=-1&sort=label&meta=total_count');
const theme = useState('theme');
const w = theme.value.data.wording.de;
const settings = theme.value.data.settings;
const tagNames = theme.value.data.names.tags;
const cardType = ref("grid");
function toggleCardType() {
  cardType.value = cardType.value == "list" ? "grid" : "list";
}

// add display property to collections
data.value.data.forEach((collection) => {
  collection.display = true;
});

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

const showFilters = ref(false);
function toggleFilters() {
  showFilters.value = !showFilters.value;
}

// tags
const tags = computed(() => {
  const tags = {};
  data.value.data.forEach((collection) => {
    settings.tags.forEach((tag) => {
      if (collection[tag] && collection[tag].length > 0) {
        if (!tags[tag]) {
          tags[tag] = [];
        }
        if (!Array.isArray(collection[tag])) {
          if (!tags[tag].find((item) => item.label === collection[tag])) {
            tags[tag].push({ label: collection[tag], count: 1 });
          } else {
            tags[tag].find((item) => item.label === collection[tag]).count++;
          }
        } else {
          collection[tag].forEach((item) => {
            if (!tags[tag].find((tagItem) => tagItem.label === item.label)) {
              tags[tag].push({ label: item.label, count: 1 });
            } else {
              tags[tag].find((tagItem) => tagItem.label === item.label).count++;
            }
          });

        }
      }
    });
  });
  // sort tags by label
  Object.keys(tags).forEach((tag) => {
    tags[tag].sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });
  });
  return tags;
});

function getTagLabelName(tag) {
  return tagNames[tag] ? tagNames[tag] : tag;
}

const tagFilter = ref({});
function setFilter(type, tag) {
  if (tagFilter.value[type] && tagFilter.value[type].includes(tag)) {
    tagFilter.value[type] = tagFilter.value[type].filter((item) => item !== tag);
  } else {
    if (!tagFilter.value[type]) {
      tagFilter.value[type] = [];
    }
    tagFilter.value[type].push(tag);
  }
  data.value.data.forEach((collection) => {
    collection.display = true;
    settings.tags.forEach((tagType) => {
      if (tagFilter.value[tagType] && tagFilter.value[tagType].length > 0) {
        if (!Array.isArray(collection[tagType])) {
          if (!tagFilter.value[tagType].includes(collection[tagType])) {
            collection.display = false;
          }
        } else {
          let found = false;
          collection[tagType].forEach((item) => {
            if (tagFilter.value[tagType].includes(item.label)) {
              found = true;
            }
          });
          if (!found) {
            collection.display = false;
          }
        }
      }
    });
  });
  scrollToResults();
}

function activeTag(type, tag) {
  if (tagFilter.value[type] && tagFilter.value[type].includes(tag)) {
    return " active";
  }
  return "";
}

function hasTagTypeActiveTag(type) {
  if (tagFilter.value[type] && tagFilter.value[type].length > 0) {
    return true;
  }
  return false;
}

function isFilterDetailsOpen(type) {
  if (type === 'current_keeper' || hasTagTypeActiveTag(type)) {
    return true;
  }
  return false;
}

const scrollToResultsAfterSelect = ref(true);
function scrollToResults(always = false) {
  if (scrollToResultsAfterSelect.value || always) {
    const scrollTarget = document.getElementById("collections_display");
    setTimeout(() => {
      scrollTarget.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}

const activeCollectionId = ref(null);
function setActiveCollectionId(id) {
  activeCollectionId.value = id;
  if (id !== null) {
    scrollToResults(true);
  }
}

function getCollectionById(id) {
  return data.value.data.find((collection) => collection.id === id);
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
  <div class="grid-control-bar" id="grid-control-bar">
    <div class="basic-controls">
      <div class="collections-counter">{{ w.num_collections }}: {{ data.meta.total_count }}</div>
      <div class="sort-controls">
        <div class="gws-input-group">
          <label for="tag-cloud-sort-select" class="sort-label">
            <svg class="icon-sm me-1" width="16" height="16" fill="currentColor">
              <use xlink:href="@/assets/img/bootstrap-icons.svg#list-ol"></use>
            </svg>
            <span class="description">{{ w.sortby }}</span>
          </label>
          <select id="tag-cloud-sort-select" class="sort-select" v-model="sortby">
            <option value="label">{{ w.label }}</option>
            <option value="current_keeper">{{ w.current_keeper }}</option>
          </select>
        </div>
        <div class="gws-input-group">
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
          <button :class="(showFilters) ? 'gws-btn btn-filter active' : 'gws-btn btn-filter'" @click="toggleFilters">
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
    <!-- <pre>{{ tags }}</pre> -->
    <div v-if="showFilters" class="filter-control-bar">
      <div class="form-check form-switch gws-form-switch-right d-flex justify-content-end align-items-center">
        <label class="form-check-label small" for="flexSwitchCheckChecked">{{
          w.scroll_to_results_after_select }}</label>
        <input @click="scrollToResultsAfterSelect = !scrollToResultsAfterSelect" class="form-check-input" type="checkbox"
          role="switch" id="flexSwitchCheckChecked" :checked="(scrollToResultsAfterSelect) ? true : null">
      </div>
      <details v-for="(tagCloud, tagType) in tags" :id="'filter-card-' + tagType" :key="'filter-card-' + tagType"
        class="filter-card" :open="isFilterDetailsOpen(tagType) ? true : null">
        <summary class="tag-title">{{ w[tagType] }}</summary>
        <div class="tags">
          <button v-for="(tag, tagIdx) in tagCloud" :key="'filter-card-' + tagType + '-' + tagIdx"
            @click="setFilter(tagType, tag.label)" :class="'tag' + activeTag(tagType, tag.label)">
            <span class="tag-name">{{ getTagLabelName(tag.label) }}</span>
            <span class="tag-count">{{ tag.count }}</span>
          </button>
        </div>
      </details>
    </div>
  </div>
  <!-- <pre>{{ data }}</pre> -->
  <!-- <pre>{{ sortedData }}</pre> -->
  <!-- <pre>{{ activeCollectionId }}</pre> -->
  <div class="collections_display" id="collections_display">
    <div v-if="cardType == 'list'" class="collection_cards_wrapper">
      <CollectionCard v-for="collection in sortedData" :key="collection.id" :entry="collection" :tagFilter="tagFilter"
        :activeCollectionId="activeCollectionId" @set-filter="setFilter"
        @set-active-collection-id="setActiveCollectionId" />
    </div>
    <div v-if="cardType == 'grid' && activeCollectionId" class="collection_cards_wrapper single-card">
      <CollectionCard :entry="getCollectionById(activeCollectionId)" :tagFilter="tagFilter"
        :activeCollectionId="activeCollectionId" @set-filter="setFilter"
        @set-active-collection-id="setActiveCollectionId" />
    </div>
    <div v-if="cardType == 'grid'" class="collection_cards_wrapper card-grid">
      <CollectionCardGrid v-for="collection in sortedData" :key="collection.id" :entry="collection"
        @set-active-collection-id="setActiveCollectionId" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.collections_display {
  scroll-margin-top: 48px;
}

.collection_cards_wrapper {
  width: min(100%, 1200px);
  margin-inline: auto;
  padding: 1rem 0;

  &.single-card {
    padding-bottom: 0;
  }
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  // grid-template-columns: repeat(5,1fr);
  grid-gap: 1rem;
  // grid-gap: 0.5rem;
}

.grid-control-bar {
  // display: flex;
  // flex-wrap: wrap;
  // align-items: center;
  // justify-content: space-between;
  // gap: 0.5rem;
  width: min(100%, 1200px);
  margin: 132px auto 0;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.basic-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.collections-counter {
  font-size: 0.85rem;
}

.sort-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  // gap: 1rem;
  gap: 0.5rem;
  font-size: 0.85rem;
}

// .filter-label,
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

.filter-control-bar {
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-nav-brd);
}

.filter-card {
  // margin: 1rem 0;
  margin: 0.5rem 0;

  // padding: 0.5rem;
  // border: 1px solid #ccc;
  // border-radius: 8px;
  &:last-child {
    margin-bottom: 0;
  }

  .tag-name {
    display: inline-block;
  }

  .tag-count {
    display: inline-block;
    margin-left: 0.5rem;
    color: var(--color-text);
    background-color: var(--color-nav-bg-marked);
    min-width: 1.9rem;
    border-radius: 4px;
    font-size: .85rem;
    padding: 0.15em 0.5em;
  }
}

details {
  position: relative;
}

summary {
  display: block;
  position: relative;
  cursor: pointer;

  &::before,
  &::after {
    width: .75em;
    height: 2px;
    position: absolute;
    top: 50%;
    right: 0;
    content: '';
    background-color: var(--color-text);
    text-align: right;
    transform: translateY(-50%);
    transition: transform .2s ease-in-out;
  }

  &::after {
    transform: translateY(-50%) rotate(90deg);

    [open] & {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  &::-webkit-details-marker {
    display: none;
  }

}

.gws-input-group {
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

.gws-form-switch-right {
  margin: 0;
  padding-left: 0;

  .form-check-input {
    margin-left: 0.75em;
    margin-right: 0.25em;
    float: none;
    cursor: pointer;
  }
}
</style>