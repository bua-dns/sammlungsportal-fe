<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme");
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });

// const { data } = await useFetchPage(slug)
// const page = data.value.data[0]

const results = ref([]);
const wdEntities = computed(() => {
  // if (!results.value.length) return [];
  return results.value 
    ? results.value.data
    : [];
});

// testweise
const term = ref(null);


async function searchWdEntities(input) {
  const url = `https://ikb-lbs-hub.bua-dns.de/items/wd_entities?limit=-1&search=${input}`;
  results.value = await $fetch(url);
}

// Initial fetch when the component is mounted
if (process.client) {
  searchWdEntities(term)
};
// Watch the term variable and call searchWdEntities whenever it changes
watch(term, (newTerm) => {
  // if (!newTerm.value.length === 0) results.value = [];
  // if (!newTerm.value.length < 3) return;
  if (newTerm.length > 2) {
    searchWdEntities(newTerm);
  };
  if (newTerm.length === 2) {
    results.value = [];
  }
  
});
</script>

<template>

  <Head>
    <Title>{{ w.page_data_inspector_ikb }}</Title>
  </Head>
  <div class="page p_dns-page" v-if="true">
    <h1 class="page-header text-center">Data Inspector Lehrbildsammlung IKB</h1>
    <div class="intro">Hier ein Intro</div>
    <div class="results" v-if="results">
      <input type="text" v-model="term" placeholder="Suche">
      <div v-for="result in wdEntities" :key="result.id">
        <div>{{ result.handle }}</div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.person {
  h4 {
    font-size: var(--font-size-text);
  }

  p {
    margin-bottom: .5rem;
  }
}

.p_dns-page {
  .page-container {
    display: block;

    .page-content {}

    .sidebar {
      font-size: var(--font-size-text-small);

      .sidebar-header {
        display: none;

        img {}
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .p_dns-page {
    .page-container {
      display: flex;
      gap: 2.5rem;

      .page-content {
        flex: 2;
      }

      .sidebar {
        .sidebar-header {
          display: block;
        }

        flex: 1;
      }
    }
  }

}
</style>
