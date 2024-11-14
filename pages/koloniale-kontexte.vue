<script setup>
/* Used auto-imported composables: projectConfig */
const router = useRouter()
const route = useRoute()
const theme = useState("theme")
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });

// config for specific page

// DEV: replace by slug from path
const slug = "koloniale-kontexte"
const titleWording = "page_koloniale_kontexte"

const { data } = await useFetchPage(slug)
const page = data.value.data[0]

const { data: collectionInfoData } = await useFetch(`${projectConfig.colonialContextsUrl}/bua_collections`, {
  query: {
    fields: projectConfig.fields.colonialContexts.join(","),
    limit: -1,
  },
})
const collectionInfo = collectionInfoData.value.data.filter(
  (info) => info.status === "published" || info.status === "draft"
)
// .sort((a, b) => a.position - b.position);

const { data: projectInfoData } = await useFetch(`${projectConfig.colonialContextsUrl}/project_infos`, {
  query: {
    fields: `*.*`,
    limit: -1,
  },
})
const projectInfos = projectInfoData.value.data

// utitlity to split collections by institution
function affiliateCollection(collection, institution) {
  if (!collection.spws_collections || !collection.spws_collections.length === 0) return false
  const affiliations = collection.spws_collections.map((entries) => entries.spws_institution)
  return affiliations.includes(institution)
}
const { data: spwsCollectionsData } = await useFetch("https://sammlungsportal.bua-dns.de/items/bua_collections", {
  query: {
    // fields: collectionsFetchFields.join(','),
    fields: projectConfig.fields.collectionsShortList.join(","),
    limit: -1,
    sort: "label",
    meta: "total_count",
  },
})
const spwsCollections = spwsCollectionsData.value.data

const institutionIndex = {
  fu: {
    label: "Freie Universität Berlin",
    collections: collectionInfo.filter((collection) => affiliateCollection(collection, "FU")),
  },
  hu: {
    label: "Humboldt-Universität zu Berlin",
    collections: collectionInfo.filter((collection) => affiliateCollection(collection, "HU")),
  },
  tu: {
    label: "Technische Universität Berlin",
    collections: collectionInfo.filter((collection) => affiliateCollection(collection, "TU")),
  },
  ch: {
    label: "Charité - Universitätsmedizin Berlin",
    collections: collectionInfo.filter((collection) => affiliateCollection(collection, "CH")),
  },
}
const expandedCollection = ref(null)
function toggleExpansion(title, trigger) {
  if (expandedCollection.value === title) {
    expandedCollection.value = null
  } else {
    expandedCollection.value = title
    if (trigger && trigger === "1") {
      showTriggerWarning.value = true
    }
  }
}
const projectInfosExpanded = ref(false)
function toggleExpansionProjectInfos() {
  projectInfosExpanded.value = !projectInfosExpanded.value
}
const showTriggerWarning = useState("showTriggerWaring", () => false)

function setQueryParams(params) {
  router.push({ query: params })
}
// setQueryParams({ collection: 'test' })
if (route.query.collection) {
  expandedCollection.value = route.query.collection
}
const spwsCollectionsIndex = computed(() => {
  // if (!spwsCollections || spwsCollections.length) return {};
  return spwsCollections.reduce((acc, collection) => {
    acc[collection.spws_id] = collection.id
    return acc
  }, {})
})

watch(expandedCollection, (newCollection) => {
  setQueryParams({ collection: newCollection })
})
</script>
<template>
  <Head>
    <Title>{{ w.page_projekte }}</Title>
  </Head>
  <div class="page p_dns-page" v-if="data && page.status === 'published'">
    <div class="dev-output">
      <pre v-if="false">{{ spwsCollectionsIndex }}</pre>
    </div>

    <h1 class="mb-4 text-center">{{ page.title }}</h1>
    <template v-if="!page.display_sidebar">
      <div class="page-content" v-html="page.page_content" />
    </template>
    <template v-if="page.display_sidebar">
      <div class="page-container">
        <div class="page-content" v-html="page.page_content" />
        <pre v-if="false">{{ page }}</pre>
      </div>
    </template>
    <div class="project-infos" :class="{ expanded: projectInfosExpanded }">
      <div class="header" @click="toggleExpansionProjectInfos()">
        <h5 class="title">Das Projekt "Colonial Collections in Berlin Universities" der Berlin University Alliance</h5>
        <div class="icon">
          <img src="@/assets/img/icons/chevron_dns_right.svg" alt="" />
        </div>
      </div>
      <div class="body">
        <div class="project-title" v-if="projectInfos.project_title" v-html="projectInfos.project_title" />
        <div class="project-description" v-if="projectInfos.project_description" v-html="projectInfos.project_description" />
        <div class="icon" @click="toggleExpansionProjectInfos()">
          <img src="@/assets/img/icons/chevron_dns_right.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="collections-listing">
      <div
        class="institution"
        v-for="(institution, instIndex) in Object.values(institutionIndex)"
        :key="`institution-${instIndex}`"
      >
        <h4>{{ institution.label }}</h4>

        <div
          class="collection"
          v-for="(collection, index) in institution.collections"
          :key="`collection-${instIndex}-${index}`"
          :class="{ expanded: collection.slug === expandedCollection }"
        >
          <div class="header" @click="toggleExpansion(collection.slug, collection.trigger_warning)">
            <h5 class="title">{{ collection.title }}</h5>
            <div class="icon">
              <img src="@/assets/img/icons/chevron_dns_right.svg" alt="" />
            </div>
          </div>
          <div class="body">
            <div
              class="spws-links"
              v-for="(spwsCollection, linkIndex) in collection.spws_collections"
              :key="`spws-link-${linkIndex}`"
            >
              <RouterLink
                v-if="spwsCollectionsIndex"
                :to="`/sammlungen?acid=${spwsCollectionsIndex[spwsCollection.spws_id]}`"
                ><strong>allgemeine Informationen zu dieser Sammlung</strong></RouterLink
              >
            </div>
            <div class="description" v-html="collection.description" />
          </div>
        </div>
      </div>
    </div>
    <TriggerWarning v-if="showTriggerWarning" />
  </div>
</template>

<style lang="scss">
.p_dns-page {
  background-color: #3b856c;
  padding: 2rem;
  color: var(--color-text-inverted);
  a {
    color: orange;
  }
  h1 {
  }
  .page-container {
    display: block;
    .page-content {
    }
    .sidebar {
      .sidebar-header {
        display: none;
      }
    }
  }
  .project-infos {
    margin-top: 0.5rem;
    border: 1px solid var(--color-taxonomy-button-border);
    border-radius: 6px;
    color: var(--color-text);
    background-color: white;
    a {
      color: var(--color-link);
    }
    .header {
      cursor: pointer;
      padding: 0.25rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        position: relative;
        font-size: 1.125rem;
        line-height: 1.75;
      }
      .icon {
        width: 1rem;
        height: 1rem;
        transition: transform 0.3s;
        transform: rotate(90deg);
      }
    }
    .body {
      display: none;
      padding: 0.25rem 1rem;
      padding-top: 2rem;
      padding-bottom: 1rem;
      .icon {
        margin: 1rem auto;
        width: 1rem;
        height: 1rem;
        transition: transform 0.3s;
        transform: rotate(270deg);
      }
    }
    &.expanded {
      border: 2px solid var(--color-bua-blue-mid-dark);
      .header {
        .icon {
          transform: rotate(-90deg);
        }
      }
      .body {
        display: block;
      }
    }
  }
  .collections-listing {
    .institution {
      margin-top: 2rem;
      h4 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--color-text-inverted);
      }
      .collection {
        margin-top: 0.5rem;
        border: 1px solid var(--color-taxonomy-button-border);
        border-radius: 6px;
        color: var(--color-text);
        background-color: white;
        a {
          color: var(--color-link);
        }
        .header {
          cursor: pointer;
          padding: 0.25rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .title {
            position: relative;
            font-size: 1.125rem;
            line-height: 1.75;
          }
          .icon {
            width: 1rem;
            height: 1rem;
            transition: transform 0.3s;
            transform: rotate(90deg);
          }
        }
        .body {
          display: none;
          padding: 0.25rem 1rem;

          .spws-links {
            margin-bottom: 1rem;
          }
          .description {
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              font-size: 1.125rem;
              margin-bottom: 0.5rem;
            }
          }
        }
        &.expanded {
          border: 2px solid var(--color-bua-blue-mid-dark);
          .header {
            .icon {
              transform: rotate(-90deg);
            }
          }
          .body {
            display: block;
          }
        }
      }
    }
  }
  .own-database-listing {
    scroll-margin-top: calc(var(--header-height) + 2.5rem);
  }
}
</style>
