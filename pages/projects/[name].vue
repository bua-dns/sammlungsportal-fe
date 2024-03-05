<script setup>
const route = useRoute();
const projectName = ref(route.params.name);

const projects = useState('projects');
const project = computed(() => {
  return projects.value.data.find((project) => project.slug === projectName.value);
});

// extract image filenames from images property of project
const images = project.value.images.map((image) => {
  return image.directus_files_id.filename_disk;
});
</script>

<template>
  <Head>
    <Title>Projekte</Title>
  </Head>
  <div class="page">
    <h1 class="text-center">{{ project.title }}</h1>
    <h3 class="text-center mb-4">{{ project.sub_line }}</h3>
    <div class="description" v-html="project.description" />
    <pre v-if="false">{{ images }}</pre>
    <ImageViewer :images="images" previewMode="gallery" previewImageWidth="240"/>

    <pre v-if="false">{{ images }}</pre>
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