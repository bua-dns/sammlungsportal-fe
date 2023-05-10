<script setup>
const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/theme_content');
const theme = useState('theme', () => data);
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
  <!-- {{ theme.data.wording.de }} -->
</template>