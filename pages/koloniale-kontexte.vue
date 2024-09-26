<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme")
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });

// config for specific page

// DEV: replace by slug from path
const slug = 'koloniale-kontexte'
const titleWording = 'page_koloniale_kontexte'

const { data } = await useFetchPage(slug)
const page = data.value.data[0]

const { data: collectionInfoData } = await useFetch(`${projectConfig.colonialContextsUrl}/bua_collections`, {
  query: {
    fields: projectConfig.fields.colonialContexts.join(','),
    limit: -1,
  }
});
const collectionInfo = collectionInfoData.value.data
  .filter((info) => info.status === 'published' || info.status === 'draft')
  // .sort((a, b) => a.position - b.position);

// utitlity to split collections by institution
function affiliateCollection(collection, institution) {
  if (!collection.spws_collections || !collection.spws_collections.length === 0) return false;
  const affiliations = collection.spws_collections.map((entries) => entries.spws_institution)
  return affiliations.includes(institution);
}

const institutionIndex = {
  fu: {
    label: 'Freie Universität Berlin',
    collections: collectionInfo.filter(collection => affiliateCollection(collection, 'FU'))
  },
  hu: {
    label: 'Humboldt-Universität zu Berlin',
    collections: collectionInfo.filter(collection => affiliateCollection(collection, 'HU'))
  },
  tu: {
    label: 'Technische Universität Berlin',
    collections: collectionInfo.filter(collection => affiliateCollection(collection, 'TU'))
  },
  ch: {
    label: 'Charité - Universitätsmedizin Berlin',
    collections: collectionInfo.filter(collection => affiliateCollection(collection, 'CH'))
  },
}
const expandedCollection = ref(null);
function toggleExpansion(index, trigger) {
  if (expandedCollection.value === index) {
    expandedCollection.value = null;
  } else {
    expandedCollection.value = index;
    showTriggerWarning.value = true;
  }
}
const showTriggerWarning = useState('showTriggerWaring', () => false)
</script>
<template>

  <Head>
    <Title>{{ w.page_projekte }}</Title>
  </Head>
  <div class="page p_dns-page" v-if="data && page.status === 'published'">
    <div class="dev-output">
      <pre v-if="false">{{ resources }}</pre>
    </div>

    <h1 class="mb-4 text-center">{{ page.title }}</h1>
    <template v-if="!page.display_sidebar">
      <div class="page-content" v-html="page.page_content" />
    </template>
    <template v-if="page.display_sidebar">
      <div class="page-container">
        <div class="page-content" v-html="page.page_content" />
        <pre v-if="false">{{ page }}</pre>
        <div class="sidebar" v-if="page.display_sidebar === '1'">
          <div class="mt-3 mb-5 sidebar-header" v-if="page.sidebar_header_image">
            <img :src="projectConfig.imageBaseUrl + '/' + page.sidebar_header_image + '?key=sidebar-header'"
              alt="sidebar image" />
          </div>
          <div class="sidebar-content" v-if="page.sidebar_content" v-html="page.sidebar_content" />
        </div>
      </div>
    </template>

    <div class="collections-listing">
      <div class="institution"
        v-for="(institution, instIndex) in Object.values(institutionIndex)"
        :key="`institution-${instIndex}`"
      >
        <h4>{{ institution.label }}</h4>

        <div class="collection"
          v-for="(collection, index) in institution.collections"
          :key="`collection-${instIndex}-${index}`"
        >
          <div class="header"
            @click="toggleExpansion(`${instIndex}-${index}`)"
            :class="{'expanded': `${instIndex}-${index}` === expandedCollection}"
          >
            <h5 class="title">{{ collection.title }}</h5>
            <div class="icon">
              <img src="@/assets/img/icons/chevron_dns_right.svg" alt="">
            </div>
          </div>
          <div class="body" :class="{'expanded': `${instIndex}-${index}` === expandedCollection}">
            <div class="description" v-html="collection.description" />
          </div>
        </div>
      </div>
    </div>
    <TriggerWarning 
      v-if="showTriggerWarning"
    />
  </div>
</template>

<style lang='scss'>

.p_dns-page {
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
  .collections-listing {
    .institution {
      margin-top: 2rem;
      h4 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
      .collection {
        margin-top: .5rem;
        .header {
          cursor: pointer;
          padding: .25rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid gray;
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
          &.expanded {
            border-bottom: none;
            .icon {
              transform: rotate(-90deg);
            }
          } 
        }
        .body {
          display: none;
          padding: .25rem 1rem;
          border: 1px solid gray;
          border-top: none;

          &.expanded {
            display: block;
          }
          .description {
            h1, h2, h3, h4, h5, h6 {
              font-size: 1.125rem;
              margin-bottom: 0.5rem;
            }
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
