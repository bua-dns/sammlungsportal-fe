<template>
  <Head>
    <Title>{{ w.page_imprint }}</Title>
  </Head>
  <div class="page">
    <h1 class="text-center">{{ w.page_imprint }}</h1>
    <ContentRendererMarkdown v-if="content" :value="content" />
  </div>
</template>
<script setup>
const theme = useState('theme');
const w = theme.value.data.wording.de;
import { parseMarkdown } from '~/utils/parseMarkdown';
const content = ref('');
const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/pages?filter[slug][_eq]=imprint');
content.value = await parseMarkdown(data.value.data[0].content);
// useHead({ title: data.value.data[0].title });
</script>