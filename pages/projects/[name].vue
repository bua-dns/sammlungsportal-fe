<script setup>
const route = useRoute();
const projectName = ref(route.params.name);

const projects = useState('projects');
const project = computed(() => {
  return projects.value.data.find((project) => project.slug === projectName.value);
});
const imageBasePath = "https://sammlungsportal.bua-dns.de/assets/";
const showLightbox = ref(false);

</script>

<template>
  <Head>
    <Title>Projekte</Title>
  </Head>
  <div class="page">
    <h1 class="text-center">{{ project.title }}</h1>
    <h3 class="text-center mb-4">{{ project.sub_line }}</h3>
    <div class="description" v-html="project.description" />
    <div class="image-gallery" v-if="project.images && project.images.length">
      <div v-for="(image, index) in project.images" :key="`image-${index}`" class="image-container">
        <img @click="showLightbox = true" 
          :src="imageBasePath + image.directus_files_id.filename_disk + '?key=preview-image'" alt=""
          class="preview-image"
        >
        <Teleport to="body">
          <LightBox v-if="showLightbox" :imageBasePath="imageBasePath" :images="[image]"
            @close="showLightbox = false" />
        </Teleport>
      </div>
    </div>
    <pre v-if="false">{{ project }}</pre>
  </div>
</template>

<style scoped lang="scss">
.page {
  .description {
    margin-top: 2rem;
  }
  .image-gallery {
    margin: 1rem 0;
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
}

</style>