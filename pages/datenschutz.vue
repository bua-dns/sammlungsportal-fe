<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme")
const w = theme.value.data.wording.de
import { parseMarkdown } from "~/utils/parseMarkdown"
const content = ref("")
const { data } = await useFetch(`${projectConfig.dataBaseUrl}/pages?filter[slug][_eq]=datenschutz`)
content.value = await parseMarkdown(data.value.data[0].content)
// useHead({ title: data.value.data[0].title });
</script>

<template>
  <Head>
    <Title>{{ w.page_privacy_policy }}</Title>
  </Head>
  <div class="page">
    <h1 class="text-center">{{ w.page_privacy_policy }}</h1>
    <ContentRendererMarkdown v-if="content" :value="content" />
  </div>
</template>
