<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme");
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });
const slug = 'data-inspector-lehrbildsammlung-ikb'

const { data } = await useFetchPage(slug)
const page = data.value.data[0]


const sampleMediaSmallSlides = ref([]);
const sampleMediaGlassSlides = ref([]);
const sampleMediaPrints = ref([]);
async function getMediaSamples() {
  const sampleMediaUrl = `https://ikb-lbs-hub.bua-dns.de/items/ikb_items`;
  // Glasdias
  const sampleMediaGlassSlidesResponse = await $fetch(sampleMediaUrl, {
    query: {
      limit: 5,
      page: Math.floor(Math.random() * 4000),
      fields: '*.*',
      // DEV: Filterfunktion noch nicht korrekt
      filter: {
        'dns_medium_type': {
          '_eq': 'Glasdia'
        }
      }
    }
  });
  sampleMediaGlassSlides.value = sampleMediaGlassSlidesResponse.data;
  // Kleinbilddias
  const sampleMediaSmallSlidesResponse = await $fetch(sampleMediaUrl, {
    query: {
      limit: 5,
      page: Math.floor(Math.random() * 4000),
      fields: '*.*',
      // DEV: Filterfunktion noch nicht korrekt
      filter: {
        'dns_medium_type': {
          '_eq': 'Kleinbilddia'
        }
      }
    }
  });
  sampleMediaSmallSlides.value = sampleMediaSmallSlidesResponse.data;
  
  const sampleMediaPrintsResponse = await $fetch(sampleMediaUrl, {
    query: {
      limit: 5,
      page: Math.floor(Math.random() * 100),
      fields: '*.*',
      // DEV: Filterfunktion noch nicht korrekt
      filter: {
        'dns_medium_type': {
          '_eq': 'Fotoabzug'
        }
      }
    }
  });
  sampleMediaPrints.value = sampleMediaPrintsResponse.data;
}



const results = ref([]);
const wdEntities = computed(() => {
  if (!results.value || !results.value.data || results.value.data.length === 0) return [];
  return results.value.data
});

const term = ref(null);
const normalizedTerm = computed(() => {
  if (!term.value) return null;
  return normalizeStringForSearch({
      str: term.value,
      caseTo: 'lower'
    });
});

async function searchWdEntities() {
  const termArray = term.value
    .split(" ")
    .map((entry) => {
      const normalizedEntry = normalizeStringForSearch({
        str: entry,
        caseTo: 'lower'
      });
       return {
        search_pool: {
           _contains: normalizedEntry
        }
      }
    });
  const query = {
    limit: -1,
    fields: 'handle, q_number',
    filter: {
      '_and': termArray
    }
  };
  const url = `https://ikb-lbs-hub.bua-dns.de/items/wd_entities`;
  const searchResponse = await $fetch(url, {
    query
  });
  return results.value = searchResponse;
}
// Watch the term variable and call searchWdEntities whenever it changes
watch(term, (newTerm) => {
  if (newTerm.length > 2) {
    displayMode.value = "search";
    searchWdEntities();
  };
  if (newTerm.length <= 2) {
    results.value = [];
  }
});

onMounted(async () => {
  await getMediaSamples();
});

onUnmounted(() => {
  // Clean up any resources here
});

const selectedEntities = ref([]);
const selectedEntitiesForDisplay = ref([]);
const allEntitiesSelected = computed(() => {
  return selectedEntities.value.length === wdEntities?.length;
});
function selectAllEntities() {
  if (allEntitiesSelected.value) {
    selectedEntities.value = [];
  } else {
    selectedEntities.value = wdEntities.value;
  }
}
function clearSearch() {
  term.value = "";
  selectedEntities.value = [];
  selectedEntitiesForDisplay.value = [];
  displayMode.value = "search";
}
function addEntity(entity) {
  if (selectedEntities.value.includes(entity)) {
    selectedEntities.value = selectedEntities.value.filter((entry) => entry !== entity);
  } else {
    selectedEntities.value.push(entity);
  }
}

const displayMode = ref("search");

function displaySelectedEntities() {
  selectedEntitiesForDisplay.value = selectedEntities.value;
  selectedEntities.value = [];
  displayMode.value = "display";
  term.value = '';
}
const markAllLimit = 100;

function deselectEntity(entity) {
  selectedEntities.value = selectedEntities.value.filter((entry) => entry !== entity);
}

function clearEntitiesSelection() {
  term.value = "";
  selectedEntities.value = [];
}
</script>

<template>

  <Head>
    <Title>{{ w.page_data_inspector_ikb }}</Title>
  </Head>
  <div class="data-inspector" v-if="true">
    <div class="intro">
      <h1 class="page-header text-center">{{ w.page_data_inspector_ikb}}<span class="badge-beta">beta</span></h1>
      <div class="dev-output" v-if="false">
        <pre>{{ data }}</pre>
      </div>
    </div>

    <div class="intro" v-html="page.page_content" />
    <div class="controls">
      <h3>Suche nach Objekten, die auf den Lehrbildern dargestellt sind</h3>
      <div class="search-box">
        <input type="text" v-model="term" placeholder="dargestelltes Objekt" v-if="displayMode=='search'">
        <input type="text" v-model="term" placeholder="" disabled v-if="displayMode == 'display'">
        <input type="submit" value="markierte anzeigen" class="submit search-box-submit"
          v-if="selectedEntities?.length > 0" @click="displaySelectedEntities()" />
        <input type="button" @click="clearSearch()" v-if="displayMode === 'display'" value="neue Suche"
          class="submit search-box-submit" />
        <div class="suggestions" v-if="displayMode === 'search' && term?.length > 2 ">
          <template v-if="!wdEntities || wdEntities.length < 1">
            Keine passenden Objekte gefunden
          </template>
          <template v-if="wdEntities && wdEntities.length && wdEntities.length < markAllLimit">
            <label class="suggestion-list-item">
              <input type="checkbox" value="" :checked="allEntitiesSelected" @click="selectAllEntities()" />
              <span>alle markieren ({{ wdEntities.length}})</span>
            </label>
            <hr>
          </template>
          <div class="suggestion clickable" v-for="entry in wdEntities" :key="entry">
            <label class="suggestion-list-item">
              <input type="checkbox" :value="entry" :checked="selectedEntities.includes(entry)"
                @click="addEntity(entry)" />
              {{ entry.handle }}

            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="display-entities">
      <template v-if="displayMode === 'display'" {{ selectedEntitiesForDisplay.length }}>
        <WDEntity v-for="entity in selectedEntitiesForDisplay" :key="`entity${entity.id}`" :entity="entity" />
      </template>
    </div>
    <div v-if="displayMode === 'search'">
      <div class="samples" v-if="sampleMediaSmallSlides">
        <h3>Beispiele <strong>Glasdias</strong> aus der Lehrbilder-Datenbank des IKB der HU Berlin</h3>
        <div class="samples-listing">
          <div class="item" v-for="item in sampleMediaGlassSlides" :key="`item-${item.id}`">
            <IKBItem :item="item" />
          </div>
        </div>
        <h3>Beispiele <strong>Kleinbilddias</strong> aus der Lehrbilder-Datenbank des IKB der HU Berlin</h3>
        <div class="samples-listing">
          <div class="item" v-for="item in sampleMediaSmallSlides" :key="`item-${item.id}`">
            <IKBItem :item="item" />
          </div>
        </div>
        <h3>Beispiele <strong>Fotoabzüge</strong> aus der Lehrbilder-Datenbank des IKB der HU Berlin</h3>
        <div class="samples-listing">
          <div class="item" v-for="item in sampleMediaPrints" :key="`item-${item.id}`">
            <IKBItem :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.data-inspector {
  max-width: 90rem;
  margin: 0 auto;
  .intro {
    .badge-beta {
      position: relative;
      top: -1rem;
      background-color: var(--color-taxonomy-button-background);
      font-size: 1rem;
      color: var(--color-bua-blue-dark);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      margin-left: 0.5rem;
    } 
  }
  .display-entities {
    margin-top: 2rem;
  }
  .samples {
    margin-top: 4rem;
    h3 {
      margin-bottom: 1rem;
      font-weight: 500;
      strong {
        font-weight: 700;
      }
    }
    .samples-listing {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }
}
.controls {
  margin-top: 1rem;
  h3 {
    font-weight: 400;
    margin-bottom: 1rem;
  }
  .search-box {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;

    input {
      border: 1px solid var(--color-border);
      border-radius: 0.125rem;
      padding: 0.5rem 1rem;
      font-size: 1.25rem;
      height: 2.25rem;
    }

    input[type="text"] {
      width: 30rem;

      &::placeholder {
        color: var(--color-text);
        opacity: 0.2;
        text-transform: uppercase;
        font-size: 1.125rem;
      }
    }

    input[type="submit"] {
      background-color: lightblue;
      color: var(--color-text);
      cursor: pointer;

      &:hover {
        background-color: var(--color-background-selected);
      }
    }

    .submit {
      padding: 0.5rem 1rem;
      color: var(--color-text);
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        background-color: var(--color-background-selected);
      }
    }

    .suggestions {
      position: absolute;
      top: 3.5rem;
      z-index: 2;
      width: 100%;
      max-height: 80rem;
      max-height: 65vh;
      background-color: hsl(0, 0%, 100%);
      padding: 0.5rem 1rem;
      overflow-x: hidden;
      overflow-y: auto;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

      .suggestion:hover {
        background-color: hsl(0, 0%, 94%);
      }
    }

    .suggestion-list-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      input[type="checkbox"] {
        cursor: pointer;
      }
    }
  }
}

</style>
