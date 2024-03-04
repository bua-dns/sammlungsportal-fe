<script setup>
const route = useRoute();
const projectName = ref(route.params.name);

const projects = useState('projects');
const project = computed(() => {
  return projects.value.data.find((project) => project.slug === projectName.value);
});

</script>

<template>
  <Head>
    <Title>Projekte</Title>
  </Head>
  <div class="page">
    <h1 class="text-center">{{ project.title }}</h1>
    <h3 class="text-center mb-4">{{ project.sub_line }}</h3>
    <div v-html="project.description" />
    <div v-if="collection.collection_image_main" class="card-img-container">
          <img @click="showLightbox = true" :src="imageBasePath + collection.collection_image_main.filename_disk + '?key=240x240'" alt="">
          <Teleport to="body">
            <LightBox v-if="showLightbox" :imageBasePath="imageBasePath" :images="collection.collection_images"
              @close="showLightbox = false" />
          </Teleport>
        </div>
    <pre v-if="true">{{ project }}</pre>
  </div>
</template>

<style scoped lang="scss">

</style>