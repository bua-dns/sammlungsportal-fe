<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState('theme');
const taxonomyTerms = useState('taxonomyTerms');
const w = theme.value.data.wording.de;

const fields = [
  'title',
  // cardsets
  'cardset_collections.navigation_cards_id.*.*',
  'cardset_featured.navigation_cards_id.*.*',
  
  // intros
  'intro',
  'cardset_collections_intro',
  'subject_selection_intro',
  'object_type_selection_intro',
  'cardset_featured_intro',
].join(',');

const { data: homepage } = await useFetch(`${projectConfig.dataBaseUrl}/homepage`, {
  query: {
    fields
  },
});
const subjects = computed(() => {
  return taxonomyTerms.value.data.filter((term) => term.spws_taxonomy === 'subjects');
});
const objectTypes = computed(() => {
  return taxonomyTerms.value.data.filter((term) => term.spws_taxonomy === 'genre');
});


</script>
<template>
  <Head>
    <Title>{{ taxonomyTerms }}</Title>
  </Head>
  <div class="page">
    <pre v-if="false">{{ subjects }}</pre>
    <pre v-if="false">{{ homepage.data }}</pre>
    <h1 class="text-center">{{ homepage.data.title }}</h1>
    <div class="intro" v-html="homepage.data.intro"></div>
    <div class="cardset-intro" v-html="homepage.data.cardset_collections_intro"/>
    <!-- University cards -->
    <div class="mt-4 cards d-flex flex-wrap flex-column flex-lg-row gap-2">
      <div v-for="(card, idx) in homepage.data.cardset_collections" :key="idx" class="card dns-card university-card"
        :style="'border-color:' + card.navigation_cards_id.background_color + ';'">
        <NuxtLink :to="card.navigation_cards_id.more_button_link" class="card-link large light">
          {{ card.navigation_cards_id.title }}
        </NuxtLink>
      </div>
    </div>
    <!-- Subjects cards -->
    <div class="intro" v-html="homepage.data.subject_selection_intro"/>
    <div class="subject-grid">
      <div v-for="(subject, idx) in subjects" :key="idx" class="card dns-card selection-card">
        <NuxtLink :to="`/sammlungen/?dns_taxonomy_subjects=${subject.label}`" class="card-link medium">
          {{ subject.label }}
        </NuxtLink>
      </div>
    </div>
    <!-- Object type cards -->
    <div class="intro" v-html="homepage.data.object_type_selection_intro"/>
    <div class="subject-grid">
      <div v-for="(type, idx) in objectTypes" :key="idx" class="card dns-card selection-card">
        <NuxtLink :to="`/sammlungen/?dns_taxonomy_genre=${type.label}`" class="card-link medium">
          {{ type.label }}
        </NuxtLink>
      </div>
    </div>
    <!-- Featured cards -->
    <div class="intro" v-html="homepage.data.cardset_featured_intro"/>
    <div class="features-grid">
      <div v-for="(card, idx) in homepage.data.cardset_featured" :key="idx" class="feature-card">
        <CardFeatured :cardContent="card.navigation_cards_id"/>
      </div>
  </div>

  </div>
</template>
<style scoped lang="scss">
.dns-card {
  flex: 1;
  border-radius: 4px;
  border-left: 1px;
  border-left: .6rem solid black;
  background-color: hsl(0, 0%, 40%);
  
  cursor: pointer;
  &.university-card {
    flex: 1 1 14%;
    // flex-basis: 20%;
    min-height: 5rem;
  }

}
.subject-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
  gap: .5rem;
  .selection-card {
    border: none;
    background-color: #ccc;
    min-height: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  
  }
}
.features-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: .5rem;

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