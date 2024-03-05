<script setup>
/* Used auto-imported composables: projectConfig */

const collectionsFetchFields = [
  // 1st level
  'id', 'label', 'spws_id', 'current_keeper', 'description', 'used_in_activity', 'address', 
  // nested
  'address.*',
  'collection_image_main.*.*',
  'collection_images.directus_files_id.*.*',
  'dns_taxonomy_subjects.taxonomy_terms_id.id',
  'dns_taxonomy_subjects.taxonomy_terms_id.label',
  'dns_taxonomy_genre.taxonomy_terms_id.id',
  'dns_taxonomy_genre.taxonomy_terms_id.label',
]

/**
 * The 'data' reference is used to store the data collections and the meta data.
 */
const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/bua_collections', {
  query: {
    fields: collectionsFetchFields.join(','),
    limit: -1,
    sort: 'label',
    meta: 'total_count',
  },
});
const router = useRouter();
const route = useRoute();
const theme = useState('theme');
const w = theme.value.data.wording.de;

const universities = theme.value.data.names.keepers;
const settings = theme.value.data.settings;
// REFACTOR: es müsste taxonomies heißen, nicht terms
// const terms = theme.value.data.settings.terms;
const cardType = ref("grid");

// add display property to collections
data.value.data.forEach((collection) => {
  collection.display = true;
});

// SORT         ----------------------------------------------------------------

// By now, the value ist fixed to "label" and can't be changed.

const sortby = ref("label");
const order = ref("asc");

// Based on the sortby and order values.
const sortedData = computed(() => {
  return data.value.data
  .sort((a, b) => {
    if (a[sortby.value] < b[sortby.value]) {
      return order.value == "asc" ? -1 : 1;
    }
    if (a[sortby.value] > b[sortby.value]) {
      return order.value == "asc" ? 1 : -1;
    }
    return 0;
  });
});

// FILTER      -----------------------------------------------------------------

/**
 * The showFilters constant declares a reactive reference and initializes it with the boolean value true.
 * The 'showFilters' reference is used to determine if the filter control bar is open.
 */
const showFilters = ref(true);

/**
 * The toggleFilters function toggles the value of the 'showFilters' reference.
 */
function toggleFilters() {
  showFilters.value = !showFilters.value;
}

/**
 * The terms constant declares a reactive reference and initializes it with an empty object.
 * The 'terms' object will be used to store the terms for each taxonomy from the data collections.
 * The terms are added to the object in the setupTerms function.
 *
 * The structure of the terms object is as follows:
 * {
 *   "taxonomy1": [
 *     { label: "term1", count: 1 },
 *     { label: "term2", count: 1 }
 *   ],
 *   "taxonomy2": [
 *     { label: "term3", count: 1 },
 *     { label: "term4", count: 1 }
 *   ]
 * }
 *
 */
const terms = ref({});

/**
 * The setupTerms function sets up the terms for each taxonomy in the data collections.
 * It iterates over each collection and each taxonomy, and adds the terms from
 * the collection to the terms list for the taxonomy.
 *
 * If collection[taxonomy] is not an array it is a string representing the label
 * name of a single term (e.g. as for current_keeper).
 * If it is an array, it is a list of terms where each term has a taxonomy_terms_id.label.
 * This means each term is represented as an object with a "taxonomy_terms_id" key,
 * which itself is an object with a "label" key.
 * The "label" key holds the name of the term.
 *
 * If a term is already present in the list, it increments the count value for the term;
 * otherwise, it adds the term with a count of 1.
 *
 * After all terms have been added, it sorts the terms for each taxonomy
 * alphabetically by label.
 */
function setupTerms() {
  data.value.data.forEach((collection) => {
    settings.taxonomies.forEach((taxonomy) => {
      terms.value[taxonomy] = terms.value[taxonomy] || [];
      if (collection[taxonomy] && collection[taxonomy].length > 0) {
        if (!Array.isArray(collection[taxonomy])) {
          if (!terms.value[taxonomy].find((term) => term.label === collection[taxonomy])) {
            terms.value[taxonomy].push({ label: collection[taxonomy], count: 1 });
          } else {
            terms.value[taxonomy].find((term) => term.label === collection[taxonomy]).count++;
          }
        } else {
          collection[taxonomy].forEach((taxonomyTerm) => {
            if (!terms.value[taxonomy].find((term) => term.label === taxonomyTerm.taxonomy_terms_id.label)) {
              terms.value[taxonomy].push({ label: taxonomyTerm.taxonomy_terms_id.label, count: 1 });
            } else {
              terms.value[taxonomy].find((term) => term.label === taxonomyTerm.taxonomy_terms_id.label).count++;
            }
          });
        }
      }
    });
  });
  Object.keys(terms.value).forEach((taxonomy) => {
    terms.value[taxonomy].sort((a, b) => a.label.localeCompare(b.label));
  });
}
setupTerms();

/**
 * The const termFilter declares a reactive reference and initializes it with an empty object.
 * The 'termFilter' object is used to store the current filter values for each taxonomy.
 * The filter values are added to the object in the setTermFilter function.
 *
 * The filter values are used for the following
 * - to filter the data collections,
 * - to set the active CSS class for a specific term in a taxonomy,
 * - to check if a taxonomy has an active term,
 * - to check if the filter details for a taxonomy are open,
 * - to reset the filter,
 * - to scroll to the results after selecting a term,
 * - to update the query parameters,
 * - to scroll to the active collection.
 *
 * The structure of the termFilter object is as follows:
 * {
 *   "taxonomy1": ["term1", "term2"],
 *   "taxonomy2": ["term1", "term2"]
 * }
 *
 */
const termFilter = ref({});

/**
 * The setTermFilter function sets the termFilter for a given taxonomy.
 * If the term is already present in the filter for the taxonomy, it is removed; otherwise, it is added.
 * After updating the filter, it applies the filter to the data collections.
 * Each collection is set to display true initially.
 * If the filter value list for the given taxonomy is not empty, it checks if the collection has the term;
 * if it does not, it sets the collection to display false.
 * Finally, it updates the query parameters and scrolls to the results.
 *
 * @param {string} taxonomy - The name of the taxonomy.
 * @param {string} term - The term to be added or removed from the filter.
 */
function setTermFilter(taxonomy, term) {
  // toggle term (add or remove when already present)
  if (taxonomy && term) {
    termFilter.value[taxonomy] = termFilter.value[taxonomy] || [];
    if (termFilter.value[taxonomy] && termFilter.value[taxonomy].includes(term)) {
      termFilter.value[taxonomy] = termFilter.value[taxonomy].filter((item) => item !== term);
    } else {
      termFilter.value[taxonomy].push(term);
    }
  }
  // apply filter
  data.value.data.forEach((collection) => {
    collection.display = settings.taxonomies.every((settingTaxonomy) => {
      if (!termFilter.value[settingTaxonomy] || termFilter.value[settingTaxonomy].length === 0) {
        return true;
      }
      return termFilter.value[settingTaxonomy].some((filterValue) =>
        (Array.isArray(collection[settingTaxonomy])
          ? collection[settingTaxonomy].map((term) => term.taxonomy_terms_id.label)
          : [collection[settingTaxonomy]]
        ).includes(filterValue)
      );
    });
  });
  setQueryParams();
  scrollToResults();
}

/**
 * The activeCollectionsNum constant declares a computed reference.
 * The 'activeCollectionsNum' reference is used to determine the number of collections that are displayed.
 */
const activeCollectionsNum = computed(() => {
  return data.value.data.filter((collection) => collection.display).length;
});

/**
 * The setActiveTermClass function sets the active css class for a specific term in a taxonomy.
 * If the term is included in the current filter value list for the given taxonomy,
 * the function returns " active" to set the CSS class for the active state.
 * If the term is not included in the list, the function returns an empty string.
 *
 * @param {string} taxonomy - The name of the taxonomy.
 * @param {string} term - The term for which the active class should be set.
 * @returns {string} - Returns " active" if the term is included in the filter value list, otherwise "".
 */
function setActiveTermClass(taxonomy, term) {
  if (termFilter.value[taxonomy] && termFilter.value[taxonomy].includes(term)) {
    return " active";
  }
  return "";
}

/**
 * The hasTaxonomyActiveTerm function checks if a taxonomy has an active term.
 * If the filter value list for the given taxonomy is not empty, the function returns true; otherwise, it returns false.
 * The function is used to determine if the filter details for a taxonomy are open.
 *
 * @param {string} taxonomy - The name of the taxonomy.
 * @returns {boolean} - Returns true if the taxonomy has an active term, otherwise false.
 */
function hasTaxonomyActiveTerm(taxonomy) {
  if (termFilter.value[taxonomy] && termFilter.value[taxonomy].length > 0) {
    return true;
  }
  return false;
}

/**
 * The filterDetails constant declares a reactive reference and initializes it with an empty object.
 * The 'filterDetails' object will be used to store the open state of the filter details for each taxonomy.
 * The open state is toggled in the toggleDetail function.
 *
 * The structure of the filterDetails object is as follows:
 * {
 *   "taxonomy1": true,
 *   "taxonomy2": false
 * }
 *
 */
const filterDetails = ref({});

/**
 * The isFilterDetailsOpen function checks if the filter details for a taxonomy are open.
 * If the taxonomy is "current_keeper" or has an active term or the filter details for the taxonomy are open,
 * the function returns true; otherwise, it returns false.
 *
 * @param {string} taxonomy - The name of the taxonomy.
 * @returns {boolean} - Returns true if the filter details for the taxonomy are open, otherwise false.
 */
function isFilterDetailsOpen(taxonomy) {
  if (taxonomy === 'current_keeper' || hasTaxonomyActiveTerm(taxonomy) || filterDetails.value[taxonomy]) {
    return true;
  }
  return false;
}

/**
 * The toggleDetail function toggles the open state of the filter details for a taxonomy.
 * If the filter details for the taxonomy are open, it sets the open state to false; otherwise, it sets it to true.
 *
 * @param {string} taxonomy - The name of the taxonomy.
 * @param {Event} event - The event object.
 */
function toggleDetail(taxonomy, { target }) {
  filterDetails.value[taxonomy] = target.open;
}

/**
 * The resetFilters function resets the filter values for each taxonomy.
 * It sets the filter value list for each taxonomy to an empty array.
 * It sets the display value for each collection to true.
 * It updates the query parameters.
 */
function resetFilters() {
  Object.keys(termFilter.value).forEach((term) => {
    termFilter.value[term] = [];
  });
  filterDetails.value = {};
  data.value.data.forEach((collection) => {
    collection.display = true;
  });
  setQueryParams();
}

// UTILS              ----------------------------------------------------------


/**
 * The scrollToResultsAfterSelect constant declares a reactive reference and initializes it with the boolean value true.
 * The 'scrollToResultsAfterSelect' reference is used to determine if the page should scroll to the results after selecting a term.
 */
const scrollToResultsAfterSelect = ref(true);

/**
 * The scrollToResults function scrolls to the results after selecting a term.
 * If the value of the 'scrollToResultsAfterSelect' reference is true, or the always parameter is true,
 * it scrolls to the results.
 * If the value of the 'scrollToResultsAfterSelect' reference is false, it does not scroll to the results.
 *
 * @param {boolean} always - The always parameter is used to determine if the page should always scroll to the results.
 */
function scrollToResults(always = false) {
  if (scrollToResultsAfterSelect.value || always) {
    const scrollTarget = document.getElementById("collections_display");
    setTimeout(() => {
      scrollTarget.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}

/**
 * The activeCollectionId constant declares a reactive reference and initializes it with the value null.
 * The 'activeCollectionId' reference is used to determine the id of the active collection.
 * The value of the 'activeCollectionId' reference is set in the setActiveCollectionId function.
 */
const activeCollectionId = ref(null);

/**
 * The setActiveCollectionId function sets the active collection id.
 * It sets the value of the 'activeCollectionId' reference to the given id.
 * It updates the query parameters.
 * If the id is not null, it scrolls to the active collection.
 *
 * @param {string} id - The id of the active collection.
 */
function setActiveCollectionId(id) {
  activeCollectionId.value = id;
  setQueryParams();
  if (id !== null) {
    setTimeout(() => {
      const scrollTarget = document.getElementById("active-card-container");
      scrollTarget.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}

/**
 * The getCollectionById function returns the collection with the given id.
 *
 * @param {string} id - The id of the collection.
 * @returns {object} - The collection with the given id.
 */
function getCollectionById(id) {
  return data.value.data.find((collection) => collection.id === id);
}

/**
 * The errors constant declares a reactive reference and initializes it with an empty array.
 * The 'errors' reference is used to store the errors.
 * The errors are added to the array in the onMounted function.
 */
const errors = ref([]);

/**
 * The closeErrorDisplay function closes the error display.
 * It sets the value of the 'errors' reference to an empty array.
 */
function closeErrorDisplay() {
  errors.value = [];
}

/**
 * The setQueryParams function sets the query parameters.
 * It sets the query parameters for each taxonomy with a filter value list that is not empty.
 * It sets the query parameter for the active collection id if it is not null.
 */
function setQueryParams() {
  const params = {};
  Object.keys(termFilter.value).forEach((taxonomy) => {
    if (termFilter.value[taxonomy] && termFilter.value[taxonomy].length > 0) {
      params[taxonomy] = termFilter.value[taxonomy].map((term) => encodeURIComponent(term)).join(",");
    }
  });
  if (activeCollectionId.value !== null) {
    params.acid = encodeURIComponent(activeCollectionId.value);
  }
  router.push({ query: params });
}


/**
 * The onMounted function is called when the Vue.js component is mounted.
 * It checks the query parameters and sets the active collection id and term filter accordingly.
 * If the query parameters contain an active collection id, it checks if the collection exists in the data collections;
 * if it does, it sets the active collection id; otherwise, it adds an error to the errors list.
 * If the query parameters contain a term filter, it sets the term filter accordingly.
 * If the query parameters contain an unknown taxonomy, it adds an error to the errors list.
 * If the query parameters contain an unknown term label, it adds an error to the errors list.
 */
onMounted(() => {
  let hasFilter = false;
  Object.keys(route.query).forEach((taxonomy) => {
    const decoded = decodeURIComponent(route.query[taxonomy]);
    console.log("decoded", decoded);
    if (taxonomy === "acid") {
      if (decoded && getCollectionById(decoded)) {
        setActiveCollectionId(decoded);
      } else {
        errors.value.push("error_activeCollectionId");
      }
    } else {
      if (!settings.taxonomies.includes(taxonomy)) {
        errors.value.push("error_tagType");
      } else {
        if (!termFilter.value[taxonomy]) {
          termFilter.value[taxonomy] = [];
        }
        route.query[taxonomy].split(",").forEach((term) => {
          const decodedTerm = decodeURIComponent(term);
          if (!terms.value[taxonomy].find((item) => item.label === decodedTerm)) {
            errors.value.push("error_tagLabel");
          } else {
            hasFilter = true;
            termFilter.value[taxonomy].push(decodedTerm);
          }
        });
      }
    }
  });
  if (hasFilter) {
    setTermFilter();
  }
});

</script>
<template>
  <Head>
    <Title>{{ w.page_collections }}</Title>
  </Head>
  <div class="grid-control-bar" id="grid-control-bar">
    <div class="basic-controls">
      <h2>Die {{ data.meta.total_count }} digital erfassten Sammlungen der BUA-Universitäten</h2>

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
      </div>
    </div>
    <!-- DEV outputs for inspection -->
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
      <details v-for="(taxonomyTerms, taxonomy) in terms" :id="'filter-card-' + taxonomy"
        :key="'filter-card-' + taxonomy" class="filter-card" @toggle="toggleDetail(taxonomy, $event)"
        :open="isFilterDetailsOpen(taxonomy) ? true : null">
        <summary class="tag-title">{{ w[taxonomy] }}</summary>
        <div class="tags">
          <button v-for="(term, termIdx) in taxonomyTerms" :key="'filter-card-' + taxonomy + '-' + termIdx"
            @click="setTermFilter(taxonomy, term.label)" :class="'tag' + setActiveTermClass(taxonomy, term.label)">
            <span class="tag-name">{{ term.label }}</span>
            <span class="tag-count">{{ term.count }}</span>
          </button>
        </div>
      </details>
    </div>
  </div>
  <div v-if="cardType == 'grid' && activeCollectionId" class="active-card-container" id="active-card-container">
    <div class="collection_cards_wrapper single-card">
      <CardCollectionDetails 
        :collection="getCollectionById(activeCollectionId)" 
        :tagFilter="tagFilter"
        :termFilter="termFilter"
        :termsIndex="termsIndex"
        :termsListing="termsListing"
        :activeCollectionId="activeCollectionId" 
        @set-term-filter="setTermFilter"
        @set-active-collection-id="setActiveCollectionId" />
    </div>
  </div>
  <!-- <div class="grid-control-bar state-and-sort">
    <div class="filter-state-display">
      <div class="display-element"><strong>Sammlungen von:</strong> {{ getCurrentKeeperDisplay()}}</div>
      <div class="display-element" v-html="getFilterTermsDisplay()" />
    </div>
    <div class="controls">
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
  </div> -->
  <div class="grid-control-bar state-and-sort">
    <div class="filter-state">
      <dl class="display-element">
        <dt>{{ w.collections_of }}:</dt>
        <dd v-if="termFilter.current_keeper && termFilter.current_keeper.length > 0"
          v-for="(keeper, idx) in termFilter.current_keeper" :key="'filter-state-keeper-' + idx">
          {{ keeper }}
        </dd>
        <dd v-else>{{ w.all_keepers }}</dd>
      </dl>
      <div class="display-element-container">
        <template v-for="(terms, taxonomy) in termFilter" :key="'filter-state-terms-' + taxonomy">
          <dl v-if="taxonomy !== 'current_keeper' && terms.length > 0" class="display-element">
            <dt>{{ w[taxonomy] }}:</dt>
            <dd v-for="(term, idx) in terms" :key="'filter-state-term-' + idx">
              {{ term }}
            </dd>
          </dl>
        </template>
      </div>
    </div>
    <div class="sort-controls">
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
    <div v-if="cardType == 'grid'" class="collection_cards_wrapper card-grid">
      <CardCollectionGrid v-for="collection in sortedData" :key="collection.id" :collection="collection"
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
  grid-gap: 1rem;
}

// .grid-control-bar {
//   width: min(100%, 1200px);
//   margin: 132px auto 0;
//   padding: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   background-color: #fff;
//   &.state-and-sort {
//     margin-top: 1rem;
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     gap: 2.5rem;
//     .filter-state-display {
//       flex: 1;
//       .display-element {
//         display: flex;
//         gap: .75rem;
//       }
//     }
//     .controls {
//       flex-basis: 1;
//       align-self: flex-end;
//       .gws-input-group {
//         margin-left: auto;
//       }
//     }
//   }
//   .basic-controls {
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     justify-content: space-between;
//     gap: 0.5rem;
//   }
// }
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

  &.state-and-sort {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .filter-state {
    flex: 1 1;

    .display-element-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0.5rem 0 0;
    }

    dl.display-element {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      gap: 0.25rem 0.5rem;
      margin: 0;
      line-height: 1;

      dt {
        // display: inline-block;
        font-weight: bold;
      }

      dd {
        // display: inline-block;
        margin: 0;
        font-size: 0.9rem;
        font-weight: 300;
        line-height: 1;
        padding: 0.4em 0.6em;
        border: 0;
        border-radius: 4px;
        background-color: var(--color-base-d0);
        border-color: var(--color-nav-brd);
        border-style: solid;
        border-width: 1px;
        color: #000;
      }
    }
  }
}

.collections-counter {
  font-size: 0.85rem;
}

.sort-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
}

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
  margin: 0.5rem 0;

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