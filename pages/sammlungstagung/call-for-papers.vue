<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme")
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });

// config for specific page

// DEV: replace by slug from path
const slug = 'call-for-papers'
const titleWording = 'page_dns'

const { data } = await useFetchPage(slug)
const page = data.value.data[0]
</script>

<template>
  <Head>
    <Title>Call for Papers</Title>
  </Head>
  <div class="page p_dns-page call-for-papers" v-if="data">
    <pre v-if="false">{{ page }}</pre>
    <h3>Jahrestagung für Universitätssammlungen</h3>
    <h1 class="page-header text-center mb-5">{{ page.title }}</h1>
    <template v-if="!page.display_sidebar">
      <div class="page-content" v-html="page.page_content" />
    </template>
    <template v-if="page.display_sidebar">
      <div class="page-container">
        <div class="page-content" v-html="page.page_content" />
        <div class="sidebar">
          <div class="mb-5 sidebar-header" v-if="page.sidebar_header_image">
            <img :src="projectConfig.imageBaseUrl + '/' + page.sidebar_header_image + '?key=sidebar-header-contain'"
              alt="sidebar image" />
          </div>
          <div class="sidebar-content" v-if="page.sidebar_content" v-html="page.sidebar_content" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang='scss'>

.p_dns-page {
  h1 {
    font-size: 1.25rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  h3 {
    font-size: 1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .page-container {
    display: block;
    .page-content {
    }
    .sidebar {
      font-size: var(--font-size-text-small);
      .sidebar-header {
        display: block;
        img {
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
          flex: 1;
          .sidebar-header {
            display: block;
          }
        }
      }
  }
}

</style>
