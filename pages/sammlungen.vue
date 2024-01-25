<script setup>
const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/bua_collections?limit=-1&sort=label&meta=total_count');
const router = useRouter();
const theme = useState('theme');
const w = theme.value.data.wording.de;
const settings = theme.value.data.settings;
const tagNames = theme.value.data.names.tags;
const cardType = ref("grid");
async function toggleCardType() {
  cardType.value = cardType.value == "list" ? "grid" : "list";
  if (cardType.value == "list" && activeCollectionId.value !== null) {
    await nextTick();
    const scrollTarget = document.getElementById("collection-" + activeCollectionId.value);
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  }
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
const tags = ref({});
function setTags() {
  data.value.data.forEach((collection) => {
    settings.tags.forEach((tag) => {
      if (!tags.value[tag]) {
        tags.value[tag] = [];
      }
      if (collection[tag] && collection[tag].length > 0) {
        if (!Array.isArray(collection[tag])) {
          if (!tags.value[tag].find((item) => item.label === collection[tag])) {
            tags.value[tag].push({ label: collection[tag], count: 1 });
          } else {
            tags.value[tag].find((item) => item.label === collection[tag]).count++;
          }
        } else {
          collection[tag].forEach((item) => {
            if (!tags.value[tag].find((tagItem) => tagItem.label === item.label)) {
              tags.value[tag].push({ label: item.label, count: 1 });
            } else {
              tags.value[tag].find((tagItem) => tagItem.label === item.label).count++;
            }
          });
        }
      }
    });
  });
  // sort tags by label
  Object.keys(tags.value).forEach((tag) => {
    tags.value[tag].sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });
  });
}
setTags();

function getTagLabelName(tag) {
  return tagNames[tag] ? tagNames[tag] : tag;
}

const tagFilter = ref({});
function setFilter(type, tag) {
  if (type && tag) {
    if (tagFilter.value[type] && tagFilter.value[type].includes(tag)) {
      tagFilter.value[type] = tagFilter.value[type].filter((item) => item !== tag);
    } else {
      if (!tagFilter.value[type]) {
        tagFilter.value[type] = [];
      }
      tagFilter.value[type].push(tag);
    }
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
  setQueryParams();
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

const filterDetails = ref({});
function isFilterDetailsOpen(type) {
  if (type === 'current_keeper' || hasTagTypeActiveTag(type) || filterDetails.value[type]) {
    return true;
  }
  return false;
}

function toggleDetail(type, { target }) {
  filterDetails.value[type] = target.open;
}

function resetFilters() {
  Object.keys(tagFilter.value).forEach((tagType) => {
    tagFilter.value[tagType] = [];
  });
  filterDetails.value = {};
  data.value.data.forEach((collection) => {
    collection.display = true;
  });
  setQueryParams();
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
  setQueryParams();
  if (id !== null) {
    // scrollToResults(true);
    setTimeout(() => {
      // const scrollTarget = document.getElementById("collection-" + id);
      const scrollTarget = document.getElementById("active-card-container");
      scrollTarget.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}

function getCollectionById(id) {
  return data.value.data.find((collection) => collection.id === id);
}

const errors = ref([]);

function setQueryParams() {
  const params = {};
  Object.keys(tagFilter.value).forEach((tagType) => {
    if (tagFilter.value[tagType] && tagFilter.value[tagType].length > 0) {
      params[tagType] = tagFilter.value[tagType].join(",");
    }
  });
  if (activeCollectionId.value !== null) {
    params.activeCollectionId = activeCollectionId.value;
  }
  router.push({ query: params });
}

function closeErrorDisplay() {
  errors.value = [];
}

const route = useRoute();
onMounted(() => {
  let hasFilter = false;
  Object.keys(route.query).forEach((tagType) => {
    if (tagType === "activeCollectionId") {
      if (route.query[tagType] && getCollectionById(route.query[tagType])) {
        setActiveCollectionId(route.query[tagType]);
      } else {
        errors.value.push("error_activeCollectionId");
      }
    } else {
      if (!settings.tags.includes(tagType)) {
        errors.value.push("error_tagType");
      } else {
        if (!tagFilter.value[tagType]) {
          tagFilter.value[tagType] = [];
        }
        route.query[tagType].split(",").forEach((tag) => {
          if (!tags.value[tagType].find((item) => item.label === tag)) {
            errors.value.push("error_tagLabel");
          } else {
            hasFilter = true;
            tagFilter.value[tagType].push(tag);
          }
        });
      }
    }
  });
  if (hasFilter) {
    setFilter();
  }
});

</script>
<template>
  <Head>
    <Title>{{ w.page_collections }}</Title>
  </Head>
  <!--
  <div class="hero">
    <img style="width:100%;height:auto;" src="@/assets/img/Collage_01.png" alt="hero image" />
  </div>
  -->
  <!-- <div v-if="cardType == 'grid' && activeCollectionId" class="collection_cards_wrapper single-card">
    <CollectionCard :entry="getCollectionById(activeCollectionId)" :tagFilter="tagFilter"
      :activeCollectionId="activeCollectionId" @set-filter="setFilter"
      @set-active-collection-id="setActiveCollectionId" />
  </div> -->
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
            <span :title="w.show_filters">
              <svg class="icon" width="16" height="16" fill="currentColor">
                <use xlink:href="@/assets/img/bootstrap-icons.svg#filter"></use>
              </svg>
            </span>
          </button>
        </div>
        <div class="grid-controls gws-group-element">
          <button class="gws-btn btn-switch" @click="toggleCardType">
            <span v-if="cardType == 'list'" :title="w.change_to_grid_view">
              <svg class="icon" width="16" height="16" fill="currentColor">
                <use xlink:href="@/assets/img/bootstrap-icons.svg#grid"></use>
              </svg>
            </span>
            <span v-if="cardType == 'grid'" :title="w.change_to_list_view">
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
      <div class="filter-control-bar-controls">
        <div class="form-check form-switch gws-form-switch-right d-flex justify-content-end align-items-center">
          <label class="form-check-label small" for="flexSwitchCheckChecked">
            {{ w.scroll_to_results_after_select }}
          </label>
          <input @click="scrollToResultsAfterSelect = !scrollToResultsAfterSelect" class="form-check-input"
            type="checkbox" role="switch" id="flexSwitchCheckChecked"
            :checked="(scrollToResultsAfterSelect) ? true : null">
        </div>
        <button class="gws-btn btn-filter" @click="resetFilters">
          <span :title="w.reset_all_filters">
            <svg class="icon" width="16" height="16" fill="currentColor">
              <use xlink:href="@/assets/img/bootstrap-icons.svg#arrow-counterclockwise"></use>
            </svg>
          </span>
        </button>
      </div>
      <details v-for="(tagCloud, tagType) in tags" :id="'filter-card-' + tagType" :key="'filter-card-' + tagType"
        class="filter-card" @toggle="toggleDetail(tagType, $event)" :open="isFilterDetailsOpen(tagType) ? true : null">
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
  <div v-if="cardType == 'grid' && activeCollectionId" class="active-card-container" id="active-card-container">
    <div class="collection_cards_wrapper single-card">
      <CollectionCard :entry="getCollectionById(activeCollectionId)" :tagFilter="tagFilter"
        :activeCollectionId="activeCollectionId" @set-filter="setFilter"
        @set-active-collection-id="setActiveCollectionId" />
    </div>
  </div>
  <div class="collections_display" id="collections_display">
    <div v-if="errors.length > 0" class="url_errors_wrapper">
      <div class="url_errors">
        <div @click="closeErrorDisplay" :title="w.close" class="card-deselect card-deselect-inverse"></div>
        <h4 class="sans-serif mt-0">{{ w.url_errors }}</h4>
        <ul>
          <li v-if="errors.includes('error_activeCollectionId')">
            {{ w.error_activeCollectionId }}
          </li>
          <li v-if="errors.includes('error_tagType')">
            {{ w.error_tagType }}
          </li>
          <li v-if="errors.includes('error_tagLabel')">
            {{ w.error_tagLabel }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="cardType == 'list'" class="collection_cards_wrapper">
      <CollectionCard v-for="collection in sortedData" :key="collection.id" :entry="collection" :tagFilter="tagFilter"
        :activeCollectionId="activeCollectionId" @set-filter="setFilter"
        @set-active-collection-id="setActiveCollectionId" />
    </div>
    <!-- <div v-if="cardType == 'grid' && activeCollectionId" class="collection_cards_wrapper single-card">
      <CollectionCard :entry="getCollectionById(activeCollectionId)" :tagFilter="tagFilter"
        :activeCollectionId="activeCollectionId" @set-filter="setFilter"
        @set-active-collection-id="setActiveCollectionId" />
    </div> -->
    <div v-if="cardType == 'grid'" class="collection_cards_wrapper card-grid">
      <CollectionCardGrid v-for="collection in sortedData" :key="collection.id" :entry="collection"
        @set-active-collection-id="setActiveCollectionId" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.active-card-container {
  scroll-margin-top: 48px;
}

.collections_display {
  scroll-margin-top: 48px;
  // scroll-margin-top: 96px;
  margin-bottom: -1rem;
}

.url_errors_wrapper,
.collection_cards_wrapper {
  width: min(100%, 1200px);
  margin-inline: auto;
  padding: 1rem 0;
  position: relative;

  &.single-card {
    padding-bottom: 0;
    // margin-bottom: -116px;
  }
}

.url_errors_wrapper {
  padding-bottom: 0;
}

.url_errors {
  padding: 1rem;
  border: 1px solid #6a0000;
  border-radius: 8px;
  background-color: #942932;
  color: #ffffff;
  position: relative;
  scroll-margin-top: 64px;
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
  // margin: 1rem auto 0;
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

.filter-control-bar-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
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