<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme")
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });

const slug = 'impressum'
const titleWording = 'page_imprint'

const { data } = await useFetchPage(slug)
const pageContent = data.value.data[0].page_content
</script>

<template>
  <Head>
    <Title>{{ w.page_imprint }}</Title>
  </Head>
  <div class="page" v-if="data">
    <h1 class="text-center">{{ w[titleWording] }}</h1>
    <div class="page-content" v-html="pageContent"/>
  </div>
</template>
