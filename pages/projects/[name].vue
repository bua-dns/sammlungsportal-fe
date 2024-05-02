<script setup>
const route = useRoute();
const projectName = route.params.name;

const projects = useState('projects');
const project = projects.value.data.find((project) => project.slug === projectName);

// extract image filenames from images property of project
const images = project.images.map((image) => {
  return image.directus_files_id.filename_disk;
}) ;
</script>
<template>
  <div class="page projects" :class="{'with-sidebar': project.display_sidebar === '1'}">

    <Head>
      <Title>Projekte</Title>
    </Head>
    <div class="output">
      <pre v-if="false">{{ project }}</pre>
    </div>
    <h1 class="page-header-with-subtitle text-center">{{ project.title }}</h1>
    <h2 class="page-header-subtitle text-center">{{ project.sub_line }}</h2>
    <div class="projects-content-container">
      <div class="main-content">
        <div class="description" v-html="project.description"></div>
      </div>
      <div class="sidebar" v-if="project.display_sidebar">
        <div class="partners" v-if="project.cooperation_partners?.length">
          <h4>Kooperationspartner</h4>
          <ul>
            <li v-for="partner in project.cooperation_partners">
              <a :href="partner.institutions_id.website" target="_blank">
                <img v-if="partner.institutions_id.logo"
                :src="`${projectConfig.imageBaseUrl}/${partner.institutions_id.logo}?key=sidebar-logo`"
                :alt="`Logo ${partner.institutions_id.name_short}`" />
              </a>
            </li>
          </ul>
        </div>
        <div class="sidebar-content" v-html="project.sidebar_content" v-if="project.sidebar_content"></div>
      </div>
    </div>
    <div class="images mt-4">
      <ImageViewer :images="images" previewMode="gallery" previewImageWidth="240"></ImageViewer>
    </div>
  </div>
</template>
<style lang="scss">
.page.projects {
  .projects-content-container {
    display: block;
    h4 {
      margin: 0 0 1rem;
    }
  }
  .sidebar {
    display: none;
    font-size: var(--font-size-extra-small);
    h4, h5 {
      font-size: var(--font-size-small);
      margin: 0 0 .5rem;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        display: block;
        margin: 1rem 0;
      }
    }
  }
  &.with-sidebar {

    .projects-content-container {
      display: grid;
      grid-template-columns: 2.5fr 1fr;
      gap: 3rem;
      
      @media screen and (max-width: 768px){
        grid-template-columns: 1fr;
      }
    }
    .main-content {
    }
    .sidebar {
      display: block;
    }
  }
}

.description {
  
}

.image-gallery {
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;

  .image-container {
    flex-basis: 12rem;

    img {
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>