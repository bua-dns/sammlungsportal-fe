<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme")
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });

// config for specific page

// DEV: replace by slug from path
const slug = 'online-ressourcen'
const titleWording = 'page_online-ressourcen'

const { data } = await useFetchPage(slug)
const page = data.value.data[0]

const resourcesData = useState('resources');
const resources = resourcesData.value.data;

</script>

<template>

  <Head>
    <Title>{{ w.page_projekte }}</Title>
  </Head>
  <div class="page p_dns-page" v-if="data && page.status === 'published'">
    <pre v-if="false">{{ projects }}</pre>
    <h1 class="mb-4 text-center">{{ page.title }}</h1>
    <template v-if="!page.display_sidebar">
      <div class="page-content" v-html="page.page_content" />
    </template>
    <template v-if="page.display_sidebar">
      <div class="page-container">
        <div class="page-content" v-html="page.page_content" />
        <pre v-if="false">{{ page }}</pre>
        <div class="sidebar">
          <div class="mt-3 mb-5 sidebar-header" v-if="page.sidebar_header_image">
            <img :src="projectConfig.imageBaseUrl + '/' + page.sidebar_header_image + '?key=sidebar-header'"
              alt="sidebar image" />
          </div>
          <div class="sidebar-content" v-if="page.sidebar_content" v-html="page.sidebar_content" />
        </div>
      </div>
    </template>
    <div class="resources-listing">
      <div class="resource-entry" v-for="resource in resources" :key="resource.id">
        <h2>
          <a :href="resource.url" :alt="`Link zu ${resource.name}`" target="_blank">
            {{ resource.name }}
          </a>
        </h2>
        <div class="main-container">
          <div class="content">
            <div class="resource-description" v-html="resource.description" />
            <a :href="resource.url" target="_blank">{{ resource.name }} aufrufen ...</a>
          </div>
          <div class="screenshot">
            <a :href="resource.url" target="_blank">
              <img class="main-screenshot"
                :src="`${ projectConfig.imageBaseUrl }/${resource.main_screenshot}?key=sidebar-header`" alt="">
            </a>
          </div>
        </div>
        <div class="collection-listing">
          <h3>{{ w.collections_in_bua_resource }}</h3>
          <ul>
            <li v-for="collection in resource.bua_collections" :key="collection.bua_collections_id.id">
              <NuxtLink :to="`/sammlungen?acid=${collection.bua_collections_id.id}`">
                {{ collection.bua_collections_id.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="dev-output">
      <pre v-if="false">{{ resources }}</pre>
    </div>
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
  .resources-listing {
    margin-top: 2rem;
    .resource-entry {
      h2 {
        margin-bottom: 0.5rem;
      }
      .main-container {
        display: flex;
        gap: 1.5rem;
        justify-content: space-between;
        .content {
          flex: 3;
        }
        .screenshot {
          display: none;
          flex: 1;
          .main-screenshot {
            width: 36rem;
            height: auto;
          }
          @media screen and (min-width: 768px){
            display: flex;
          }
        }
      }
      .collection-listing {
        h3 {
          margin-bottom: 0.75rem;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          li {
            margin-bottom: 0.125rem;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 768px){
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
