<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme")
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });

// config for specific page

// DEV: replace by slug from path
const slug = 'projekte'
const titleWording = 'page_projekte'

const { data } = await useFetchPage(slug)
const page = data.value.data[0]

const projectsData = useState('projects');
const projects = projectsData.value.data
  .filter(project => project.show_on_projects_page === 'true');

</script>

<template>

  <Head>
    <Title>{{ w.page_projekte }}</Title>
  </Head>
  <div class="page p_dns-page" v-if="data && page.status === 'published'">
    <pre v-if="false">{{ projects }}</pre>
    <h1 class="mb-4 text-center">{{ w[titleWording] }}</h1>
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
    <div v-if="true" class="projects-listing page-card-grid">
      <!-- <pre>{{ projects.data[0] }}</pre> -->
      <div class="project-display" 
        v-for="(project, idx) in projects" :key="`page-card-${idx}`"
      >
        <CardPageProject :cardContent="project" />
      </div>
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
        img {
          
        }
      }
    }
  }
  .page-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--feature-card-width), 1fr));
    gap: 1.5rem;
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
