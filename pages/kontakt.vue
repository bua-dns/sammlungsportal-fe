<template>
  <h1 class="text-center">{{ w.page_contact }}</h1>
  {{ data.content }}
</template>
<script setup>
  const theme = useState('theme');
  const w = theme.value.data.wording.de;
  const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/pages?filter[slug][_eq]=contact');
</script>