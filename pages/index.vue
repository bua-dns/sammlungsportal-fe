<script setup>
const theme = useState('theme');
const w = theme.value.data.wording.de;
const { data: homepage } = await useFetch('https://sammlungsportal.bua-dns.de/items/homepage', {
  query: {
    fields: '*.navigation_cards_id.*.*',
  },
});
</script>
<template>
  <Head>
    <Title>{{ w.page_start }}</Title>
  </Head>
  <div class="page">
    <!-- {{ homepage.data }} -->
    <h1 class="text-center">{{ homepage.data.title }}</h1>
    <div class="intro" v-html="homepage.data.intro"></div>
    <div class="mt-4 cards d-flex flex-wrap flex-column flex-lg-row gap-3">
      <div v-for="(card, idx) in homepage.data.cardset_collections" :key="idx" class="card">
        <NuxtLink :to="card.navigation_cards_id.more_button_link" class="card-keeper"
          :style="'border-bottom-color:' + card.navigation_cards_id.background_color + ';'">
          <span class="gws_uni_marker"
            :style="'background-color:' + card.navigation_cards_id.background_color + ';'"></span>
          {{ card.navigation_cards_id.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card {
  flex: 1;
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: #fff;
  flex-basis: 33%;
  cursor: pointer;
}

.card-keeper {
  // border-bottom: 2px solid #333;
  font-size: 1.125rem;
  color: var(--color-text);
}
</style>