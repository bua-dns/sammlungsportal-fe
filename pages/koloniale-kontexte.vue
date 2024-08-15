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

const { data: resourcesData } = await useFetch(`${projectConfig.dataBaseUrl}/online_resources`, {
  query: {
    fields: projectConfig.fields.resources.join(','),
    limit: -1,
  }
});
const resources = resourcesData.value.data
  .filter((resource) => resource.status === 'published')
  .sort((a, b) => a.position - b.position);

function scrollToEntry(entry) {
  const scrollTarget = document.getElementById(entry);
  setTimeout(() => {
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  }, 100);
  console.log('scrolling to', entry);
}
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
  .collections-listing {
    margin-top: 2rem;
  }
  .own-database-listing {
    scroll-margin-top: calc(var(--header-height) + 2.5rem);
  }
}
</style>
