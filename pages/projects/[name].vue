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
    <pre v-if="true">{{ project }}</pre>
  </div>
</template>

<style scoped lang="scss">

</style>