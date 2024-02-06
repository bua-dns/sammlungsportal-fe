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
      <div 
        v-for="(card, idx) in homepage.data.cardset_collections" :key="idx" 
        class="card"
        :style="'background-color:' + card.navigation_cards_id.background_color + ';'"
      >
        <NuxtLink :to="card.navigation_cards_id.more_button_link" class="card-keeper">
          <span :class="{'light': card.navigation_cards_id.text_color === 'light'}">
            {{ card.navigation_cards_id.title }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card {
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  flex-basis: 33%;
  cursor: pointer;
}

.card-keeper {
  // border-bottom: 2px solid #333;
  font-size: 1.125rem;
  color: var(--color-text);
  .light {
    color: var(--color-text-inv);
  }
}
</style>