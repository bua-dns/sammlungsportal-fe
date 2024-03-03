<script setup>
const route = useRoute();
const projectName = ref(route.params.name);

const projects = useState('projects');
const project = computed(() => {
  return projects.value.data.find((project) => project.slug === projectName.value);
});

</script>

<template>
  <div class="page">
    project page: {{ projectName }}<br>
    <pre>{{ project }}</pre>
  </div>
</template>

<style scoped lang="scss">

</style>