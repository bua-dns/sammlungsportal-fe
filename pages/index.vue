<script setup>
  const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/bua_collections');
  const w = useWording();
</script>
<template>
  <Head>
    <Title>{{ w.pageStart }}</Title>
  </Head>
  <h1 class="text-center">{{ w.collection_portal }}</h1>
  <div class="collection_cards_wrapper">
    <CollectionCard v-for="collection in data" :key="collection.id" :collection="collection" />
  </div>
</template>
<style scoped lang="scss">
  .collection_cards_wrapper {
    width: min(100%, 100ch);
    margin-inline: auto;
  }
</style>