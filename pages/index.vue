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
        :style="'border-color:' + card.navigation_cards_id.background_color + ';'"
      >
        <NuxtLink :to="card.navigation_cards_id.more_button_link" class="card-keeper">
          <span class="light">
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

  border-radius: 4px;
  border-left: 1px;
  border-left: .6rem solid black;
  background-color: hsl(0, 0%, 40%);
  flex-basis: 20%;
  min-height: 7.5rem;
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