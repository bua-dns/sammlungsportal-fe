<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme")
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });

// config for specific page

// DEV: replace by slug from path
const slug = 'dns'
const titleWording = 'page_dns'

const { data } = await useFetchPage(slug)
const page = data.value.data[0]
</script>

<template>

  <Head>
    <Title>{{ w.page_dns }}</Title>
  </Head>
  <div class="page p_dns-page" v-if="data">
    <pre v-if="false">{{ page }}</pre>
    <h1 class="page-header text-center">{{ w[titleWording] }}</h1>
    <template v-if="!page.display_sidebar">
      <div class="page-content" v-html="page.page_content" />
    </template>
    <template v-if="page.display_sidebar">
      <div class="page-container">
        <div class="page-content" v-html="page.page_content" />
        <div class="sidebar">
          <div class="mb-5 sidebar-header" v-if="page.sidebar_header_image">
            <img :src="projectConfig.imageBaseUrl + '/' + page.sidebar_header_image + '?key=sidebar-header'"
              alt="sidebar image" />
          </div>
          <div class="sidebar-content" v-if="page.sidebar_content" v-html="page.sidebar_content" />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang='scss'>

.p_dns-page {
  .page-container {
    display: block;
    .page-content {
    }
    .sidebar {
      font-size: var(--font-size-text-small);
      .sidebar-header {
        display: none;
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
