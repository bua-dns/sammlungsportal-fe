<template>
  <div class="page">
    <h1 class="text-center">{{ w.page_contact }}</h1>
    <ContentRendererMarkdown v-if="content" :value="content" />
  </div>
</template>
<script setup>
  const theme = useState('theme');
  const w = theme.value.data.wording.de;
  import { parseMarkdown } from '~/utils/parseMarkdown';
  const content = ref('');
  const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/pages?filter[slug][_eq]=contact');
  content.value = await parseMarkdown(data.value.data[0].content);
</script>