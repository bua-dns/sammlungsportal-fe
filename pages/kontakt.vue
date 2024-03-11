<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme")
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });

// config for specific page

// DEV: replace by slug from path
const slug = 'kontakt'
const titleWording = 'page_contact'

const { data } = await useFetchPage(slug)
const pageContent = data.value.data[0].page_content
</script>

<template>
  <Head>
    <Title>{{ w.page_contact }}</Title>
  </Head>
  <div class="page" v-if="data">
    <h1 class="text-center">{{ w[titleWording] }}</h1>
    <div class="page-content" v-html="pageContent"/>
  </div>
</template>
