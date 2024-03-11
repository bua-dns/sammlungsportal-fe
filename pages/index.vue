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
    <div class="homepage-intro">
      <h1 class="text-center intro-heading">{{ homepage.data.title }}</h1>
      <div class="intro-text" v-html="homepage.data.intro"></div>
    </div>
    <!-- University cards -->
    <section class="university-collections">
      <h3 class="text-center section-heading">{{ w.university_collections_heading }}</h3>
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
    <section class="row taxonomy-cards">
      <div class="select-cards-section subjects col-lg">
        <div class="intro" v-html="homepage.data.subject_selection_intro"/>
        <div class="subject-grid">
          <div v-for="(subject, idx) in subjects" :key="idx" class="card dns-card selection-card">
            <NuxtLink :to="`/sammlungen/?dns_taxonomy_subjects=${subject.label}`" class="card-link medium">
              {{ subject.label }}
            </NuxtLink>
          </div>
        </div>
      </div>      
      <div class="select-cards-section object-types col-lg">
        <div class="intro" v-html="homepage.data.object_type_selection_intro"/>
        <div class="subject-grid">
          <div v-for="(type, idx) in objectTypes" :key="idx" class="card dns-card selection-card">
            <NuxtLink :to="`/sammlungen/?dns_taxonomy_genre=${type.label}`" class="card-link medium">
              {{ type.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <section class="featured-cards">
      <div class="text-center section-heading">{{ w.featured_heading  }}</div>
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
// DEV: Reorganize CSS!
section {
  margin-bottom: 2rem;
}
.homepage-intro {
  padding: 2rem;
  .intro-heading {
    font-size: 2rem;
    line-height: 1.2;
    margin: 0 0 2.5rem;
  }
  .intro-text {
    font-size: 1.25rem;
    line-height: 1.5;
  }
}
.section-heading {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
section.university-collections {
  
}
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
.select-card {
  .select-cards-section {
    flex: 1;

  }
}

.subject-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: .5rem;
  .selection-card {
    border: 1px solid var(--color-subject-card-text);
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
  margin-top: 2rem;
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