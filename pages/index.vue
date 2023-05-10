<script setup>
  const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/bua_collections');
  const theme = useState('theme');
  const w = theme.value.data.wording.de;
</script>
<template>
  <Head>
    <Title>{{ w.page_start }}</Title>
  </Head>
  <!-- <h1 class="text-center">{{ theme.collection_portal }}</h1> -->
  <div class="hero">
    <img style="width:100%;height:auto;" src="@/assets/img/Collage_01.png" alt="hero image" />
  </div>
  <div class="collection_cards_wrapper">
    <CollectionCard v-for="collection in data" :key="collection.id" :collection="collection" />
    <!-- <pre>{{ data }}</pre> -->
  </div>
</template>
<style scoped lang="scss">
  .collection_cards_wrapper {
    width: min(100%, 100ch);
    margin-inline: auto;
  }
</style>