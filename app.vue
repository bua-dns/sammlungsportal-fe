<script setup>
/* Used auto-imported composables: projectConfig */
const { data: themeContent } = await useFetch(`${projectConfig.dataBaseUrl}/theme_content`);
const { data: institutionsContent } = await useFetch(`${projectConfig.dataBaseUrl}/institutions`);
const { data: backgroundImages } = await useFetch(`${projectConfig.dataBaseUrl}/background_images`,
  {
    query: {
      fields: '*,object_from_collection.id,object_from_collection.label,object_from_collection.current_keeper',
      limit: -1
    }
  });
const { data: taxonomyTermsData } = await useFetch(`${projectConfig.dataBaseUrl}/taxonomy_terms`, {
  query: {
    fields: 'id, label, spws_taxonomy',
    limit: -1,
    meta: 'total_count',
  }
});
const { data: projectsData } = await useFetch(`${projectConfig.dataBaseUrl}/projects`, {
  query: {
    fields: '*, title, id, slug, sub_line, description, affiliation, images.directus_files_id.*, preview_image.*.*, display_sidebar, sidebar_content, cooperation_partners.institutions_id.name_short,cooperation_partners.institutions_id.logo',
    limit: -1,
  }
});


const theme = useState('theme', () => themeContent);
useState('institutions', () => institutionsContent);
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