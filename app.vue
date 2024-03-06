<script setup>
/* Used auto-imported composables: projectConfig */
const { data: themeContent } = await useFetch(`${projectConfig.dataBaseUrl}/theme_content`);
const { data: backgroundImages } = await useFetch(`${projectConfig.dataBaseUrl}/background_images`);
const { data: taxonomyTermsData } = await useFetch(`${projectConfig.dataBaseUrl}/taxonomy_terms`, {
  query: {
    fields: 'id, label, spws_taxonomy',
    limit: -1,
    meta: 'total_count',
  }
});
const { data: projectsData } = await useFetch(`${projectConfig.dataBaseUrl}/projects`, {
  query: {
    fields: '*, title, id, slug, sub_line, description, affiliation, images.directus_files_id.*',
    limit: 3,
  }
});


const theme = useState('theme', () => themeContent);
useState('taxonomyTerms', () => taxonomyTermsData);
useState('background_images', () => backgroundImages);
useState('projects', () => projectsData);
const w = theme.value.data.wording.de;
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${w.collection_portal}` : w.collection_portal;
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- <div>{{ theme.data }}</div> -->
</template>