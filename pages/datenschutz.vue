<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme")
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });

const slug = 'datenschutz'
const titleWording = 'page_privacy_policy'

const { data } = await useFetchPage(slug)
const page = data.value.data[0]
</script>

<template>
  <Head>
    <Title>{{ w.page_privacy_policy }}</Title>
  </Head>
  <div class="page" v-if="data">
    <h1 class="text-center">{{ page.title }}</h1>
    <div class="page-content" v-html="page.page_content"/>
  </div>
</template>
