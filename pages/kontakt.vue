<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme")
const w = theme.value.data.wording.de
import { parseMarkdown } from "~/utils/parseMarkdown"
const content = ref("")
const { data } = await useFetchPage('contact')
content.value = await parseMarkdown(data.value.data[0].content)
// useHead({ title: data.value.data[0].title });
</script>

<template>
  <Head>
    <Title>{{ w.page_contact }}</Title>
  </Head>
  <div class="page">
    <h1 class="text-center">{{ w.page_contact }}</h1>
    <ContentRendererMarkdown v-if="content" :value="content" />
  </div>
</template>
