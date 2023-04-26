<script setup>
const w = useWording();
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Sammlungsportal ` : 'Sammlungsportal';
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>