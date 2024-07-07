<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme");
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });


const results = ref([]);
const wdEntities = computed(() => {
  if (!results.value || !results.value.data || results.value.data.length === 0) return [];
  return results.value.data
    // .filter((entry) => {
    //   return entry.search_pool.includes(term.value.toLowerCase());
    // });
});

// testweise
const term = ref(null);
const normalizedTerm = computed(() => {
  if (!term.value) return null;
  return normalizeStringForSearch({
      str: term.value,
      caseTo: 'lower'
    });
});


async function searchWdEntities() {
  

  const url = `https://ikb-lbs-hub.bua-dns.de/items/wd_entities?limit=-1&search=${normalizedTerm.value}`;
  const searchResponse = await $fetch(url);
  return results.value = searchResponse;
}

// Initial fetch when the component is mounted
if (process.client) {
  // searchWdEntities()
};
// Watch the term variable and call searchWdEntities whenever it changes
watch(term, (newTerm) => {
  // if (!newTerm.length === 0) results.value = [];
  // if (!newTerm.length < 3) return;
  if (newTerm.length > 2) {
    searchWdEntities();
  };
  if (newTerm.length === 2) {
    results.value = [];
  }
});



const selectedEntities = ref([]);
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

function addEntity(entity) {
  if (selectedEntities.value.includes(entity)) {
    selectedEntities.value = selectedEntities.value.filter((entry) => entry !== entity);
  } else {
    selectedEntities.value.push(entity);
  }
}
function deselectEntity(entity) {
  selectedEntities.value = selectedEntities.value.filter((entry) => entry !== entity);
}

function clearEntitiesSelection() {
  term.value = "";
  selectedEntities.value = [];
}
/* Import

*/



</script>

<template>

  <Head>
    <Title>{{ w.page_data_inspector_ikb }}</Title>
  </Head>
  <div class="page p_dns-page" v-if="true">
    <h1 class="page-header text-center">Data Inspector Lehrbildsammlung IKB</h1>
    <div class="intro">Hier ein Intro</div>
    <div class="results" v-if="results">

      <div class="search-box">
        <input type="text" v-model="term" placeholder="dargestelltes Objekt" />
        <input type="submit" value="auswählen" class="submit search-box-submit"
          v-if="selectedEntities?.length > 0 && term" @click="selectEntity()" />
        <!-- <div>current term: {{ normalizedTerm }}</div> -->
        <div class="dev-output" v-if="false">
          term.length: {{ term?.length }}<br>
          {{ wdEntities }}
        </div>
        <div class="suggestions" v-if="true && term?.length > 2">
          <label class="suggestion-list-item">
            <input type="checkbox" value="" :checked="allEntitiesSelected" @click="selectAllEntities()" />
            <span v-if="wdEntities && wdEntities.length">alle markieren ({{ wdEntities.length}})</span>
          </label>
          <hr>
          <div class="suggestion clickable" v-for="entry in wdEntities" :key="entry">
            <label class="suggestion-list-item">
              <input type="checkbox" :value="entry" :checked="selectedEntities.includes(entry)"
                @click="addEntity(entry)" />
              {{ entry.handle }} - {{ entry.q_number }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
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
      opacity: 0.5;
      text-transform: uppercase;
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
    background-color: green;
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
</style>
