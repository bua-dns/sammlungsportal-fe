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
    <Title>BUA Sammlungsplattform</Title>
  </Head>
  <div class="page pt-4 pb-1">
    <section class="homepage-intro">
      <h1 class="mb-lg-4  text-center intro-heading">{{ homepage.data.title }}</h1>
      <div class="intro-text dns-text-lead" v-html="homepage.data.intro"></div>
    </section>
    <!-- University cards -->
    <section class="mt-4 university-collections">
      <h2 class="mb-lg-3 text-center section-heading">{{ w.university_collections_heading }}</h2>
      <div class="cardset-intro" v-html="homepage.data.cardset_collections_intro"/>
      <div class="mt-4 cards d-flex flex-wrap flex-column flex-lg-row gap-2">
        <div v-for="(card, idx) in homepage.data.cardset_collections" :key="idx" class="card dns-card university-card"
          :style="'border-color:' + card.navigation_cards_id.background_color + ';'">
          <NuxtLink :to="card.navigation_cards_id.more_button_link" class="card-link large light">
            {{ card.navigation_cards_id.title }}
          </NuxtLink>
        </div>
      </div>
    </section>
    <!-- Taxonomy cards -->
    <section class="mt-lg-4 row taxonomy-cards">
      <div class="select-cards-section subjects col-lg">
        <div class="mb-3 intro" v-html="homepage.data.subject_selection_intro"/>
        <div class="subject-grid">
          <div v-for="(subject, idx) in subjects" :key="idx" class="card dns-card selection-card">
            <NuxtLink :to="`/sammlungen/?dns_taxonomy_subjects=${subject.label}`" class="card-link medium">
              {{ subject.label }}
            </NuxtLink>
          </div>
        </div>
      </div>      
      <div class="select-cards-section object-types col-lg">
        <div class="mb-3 intro" v-html="homepage.data.object_type_selection_intro"/>
        <div class="subject-grid">
          <div v-for="(type, idx) in objectTypes" :key="idx" class="card dns-card selection-card">
            <NuxtLink :to="`/sammlungen/?dns_taxonomy_genre=${type.label}`" class="card-link medium">
              {{ type.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <!-- Featured cards -->
    <section class="mt-4 featured-cards">
      <h2 class=" mb-lg-4 text-center section-heading">{{ w.featured_heading  }}</h2>
      <div class="intro" v-if="homepage.data.cardset_featured_intro" v-html="homepage.data.cardset_featured_intro"/>
      <div class="features-grid">
        <div v-for="(card, idx) in homepage.data.cardset_featured" :key="idx" class="feature-card">
          <CardFeatured :cardContent="card.navigation_cards_id"/>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped lang="scss">

.dns-card {
  flex: 1;
  border-radius: 12px;
  border-left: 1px;
  border-left: .75rem solid black;
  background-color: hsl(0, 0%, 28%);
  
  cursor: pointer;
  &:hover {
    background-color: hsl(0, 0%, 38%);
  }
  &.university-card {
    flex: 1 1 14%;
    // flex-basis: 20%;
    min-height: 5rem;
  }

}
.select-card {
  .select-cards-section {
    flex: 1;
  }
}

.subject-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: .5rem;
  .selection-card {
    border: 1px solid var(--color-subject-card-border);
    background-color: var(--color-subject-card-fill);
    color: var(--color-subject-card-text);
    font-weight: 400;
    font-size: 3rem;
    min-height: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: var(--color-subject-card-fill-hover);
    }
    .card-link {
      color: var(--color-subject-card-text);
    }
  
  }
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--feature-card-width), 1fr));
  gap: 1.5rem;
}
.card-link {
  height: 100%;
  &.medium {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .8rem;
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