<script setup>
const { data: themeContent } = await useFetch('https://sammlungsportal.bua-dns.de/items/theme_content');
const { data: backgroundImages } = await useFetch('https://sammlungsportal.bua-dns.de/items/background_images');
const theme = useState('theme', () => themeContent);
useState('background_images', () => backgroundImages);
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