<script setup>
const theme = useState('theme');
const taxonomyTerms = useState('taxonomyTerms');
const w = theme.value.data.wording.de;
const { data: homepage } = await useFetch('https://sammlungsportal.bua-dns.de/items/homepage', {
  query: {
    fields: '*.navigation_cards_id.*.*',
  },
});
const subjects = computed(() => {
  return taxonomyTerms.value.data.filter((term) => term.spws_taxonomy === 'subjects');
});

</script>
<template>
  <Head>
    <Title>{{ taxonomyTerms }}</Title>
  </Head>
  <div class="page">
    <!-- {{ homepage.data }} -->
    <pre v-if="false">{{ subjects }}</pre>
    <h1 class="text-center">{{ homepage.data.title }}</h1>
    <div class="intro" v-html="homepage.data.intro"></div>
    <div class="cardset-intro" v-html="homepage.data.cardset_collections_intro"/>
    <!-- University cards -->
    <div class="mt-4 cards d-flex flex-wrap flex-column flex-lg-row gap-2">
      <div v-for="(card, idx) in homepage.data.cardset_collections" :key="idx" class="card university-card"
        :style="'border-color:' + card.navigation_cards_id.background_color + ';'">
        <NuxtLink :to="card.navigation_cards_id.more_button_link" class="card-link large light">
          {{ card.navigation_cards_id.title }}
        </NuxtLink>
      </div>
    </div>
    <!-- Subjects cards -->
    <div class="intro">
      
    </div>
    <div class="subject-grid">
      <div v-for="(subject, idx) in subjects" :key="idx" class="card subject-card">
        <NuxtLink :to="`/sammlungen/?dns_taxonomy_subjects=${subject.label}`" class="card-link medium">
          {{ subject.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card {
  flex: 1;
  border-radius: 4px;
  border-left: 1px;
  border-left: .6rem solid black;
  background-color: hsl(0, 0%, 40%);
  
  cursor: pointer;
  &.university-card {
    flex-basis: 22%;
    min-height: 5rem;
  }

}
.subject-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 1rem;
  .subject-card {
    border: none;
    background-color: #ccc;
    min-height: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  
  }
}
.card-link {
  height: 100%;
  color: var(--color-text);
  &.medium {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .75rem;
    padding: .5rem;
    text-align: center;
  }
  &.large {
    display: block;
    padding: 1rem;
    font-size: 1.125rem;
    color: var(--color-text);
  }
  &.light {
    color: var(--color-text-inv);
  }
}

</style>