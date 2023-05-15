<script setup>
  const { data } = await useFetch('https://sammlungsportal.bua-dns.de/items/bua_collections?limit=-1&meta=total_count');
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
  <div class="collection_count">{{ w.num_collections }}: {{ data.meta.total_count }}</div>
  <!-- <pre>{{ data }}</pre> -->
  <div class="collection_cards_wrapper">
    <CollectionCard v-for="collection in data.data" :key="collection.id" :entry="collection" />
  </div>
</template>
<style scoped lang="scss">
  .collection_cards_wrapper {
    width: min(100%, 100ch);
    margin-inline: auto;
  }
  .collection_count {
    // text-align: center;
    width: min(100%, 100ch);
    margin: 1rem auto;
  }
</style>