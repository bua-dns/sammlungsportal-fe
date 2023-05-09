<script setup>
const w = useWording();
const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/theme_content');
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Sammlungsportal der Berlin University Alliance` : 'Sammlungsportal der Berlin University Alliance';
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- {{ data }} -->
</template>