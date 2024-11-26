<script setup>
/* Used auto-imported composables and utils:
 * - projectConfig
 * - getLabelUrl
 */
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
  return taxonomyTerms.value.data
    .filter((term) => term.spws_taxonomy === 'subject')
    .sort((a, b) => a.label.localeCompare(b.label));
});
const objectTypes = computed(() => {
  return taxonomyTerms.value.data
    .filter((term) => term.spws_taxonomy === 'genre')
    .sort((a, b) => a.label.localeCompare(b.label));
});

</script>
<template>

  <Head>
    <Title>BUA Sammlungsplattform</Title>
  </Head>
  <div class="page segmented pt-4 pb-1">
    <section class="homepage-intro page-segment">
      <h1 class="mb-lg-4 mt-2 text-center intro-heading" >{{ homepage.data.title }}</h1>
      <div class="intro-text" v-html="homepage.data.intro"></div>
    </section>
    <!-- University cards -->
    <section class="mt-4 university-collections page-segment">
      <h2 class="mb-lg-3 text-center section-heading">{{ w.university_collections_heading }}</h2>
      <!-- <div class="cardset-intro" v-html="homepage.data.cardset_collections_intro" /> -->
      <!-- <pre>
        {{ homepage.data.cardset_collections }}
      </pre> -->
      <!-- <div class="mt-4 cards d-flex flex-wrap flex-column flex-sm-row gap-2"> -->
      <div class="mt-4 university-cards">
        <div v-for="(card, idx) in homepage.data.cardset_collections" :key="idx"
          :class="'card dns-card university-card ' + card.navigation_cards_id.label"
          :style="'border-color:' + card.navigation_cards_id.background_color + ';'">
          <NuxtLink :to="card.navigation_cards_id.more_button_link" class="card-link large light">
            {{ card.navigation_cards_id.title }}
          </NuxtLink>
        </div>
      </div>
    </section>
    <!-- Taxonomy cards -->
    <section class="mt-lg-4 row taxonomy-cards page-segment">
      <div class="select-cards-section subjects col-lg mt-4 mt-lg-0">
        <div class="mb-3 intro" v-html="homepage.data.subject_selection_intro" />
        <div class="subject-grid">
          <div v-for="(subject, idx) in subjects" :key="idx" class="card dns-card selection-card">
            <NuxtLink :to="'/sammlungen?dns_taxonomy_subjects=' + getLabelUrl(subject.label)" class="card-link medium">
              {{ subject.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="select-cards-section object-types col-lg mt-4 mt-lg-0">
        <div class="mb-3 intro" v-html="homepage.data.object_type_selection_intro" />
        <div class="subject-grid">
          <div v-for="(type, idx) in objectTypes" :key="idx" class="card dns-card selection-card">
            <NuxtLink :to="'/sammlungen?dns_taxonomy_genre=' + getLabelUrl(type.label)" class="card-link medium">
              {{ type.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <!-- Featured cards -->
    <section class="mt-4 featured-cards page-segment">
      <h2 class=" mb-lg-4 text-center section-heading">{{ w.featured_heading }}</h2>
      <div class="intro" v-if="homepage.data.cardset_featured_intro" v-html="homepage.data.cardset_featured_intro" />
      <div class="features-grid">
        <div v-for="(card, idx) in homepage.data.cardset_featured" :key="idx" class="feature-card">
          <CardFeatured :cardContent="card.navigation_cards_id" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.homepage-intro {
  intro-heading {
    font-size: 2.25rem;
    text-align: left;
  }
  .intro-text {
    font-size: 1.25rem;
    line-height: 1.75rem;
    padding: 0 2.5rem;
  } 
}
.dns-card {
  border-radius: var(--selection-card-border-radius);
  
  cursor: pointer;

  &:hover {
    background-color: hsl(0, 0%, 38%);
    // background-color: hsl(38, 21%, 41%);
  }

  &.university-card {
    min-height: 5rem;
    border-left: .5rem solid transparent;
    // border-right: .5rem solid transparent;
    background-color: var(--color-university-card-fill);
    &:hover {
      background-color: var(--color-university-card-fill-hover);
    }
  }

}

.BUA-Sammlungen {
  grid-area: bua;
}

.FU-Sammlungen {
  grid-area: fu;
}

.HU-Sammlungen {
  grid-area: hu;
}

.TU-Sammlungen {
  grid-area: tu;
}

.CH-Sammlungen {
  grid-area: ch;
}

.university-cards {
  display: grid;
  gap: 0.5rem;
  grid-template-areas:
    'bua'
    'fu'
    'hu'
    'tu'
    'ch';

  @media (min-width: 568px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'bua bua'
      'fu hu'
      'tu ch';

  }

  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas:
      'bua fu hu tu ch';

  }
}

.subject-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: .5rem;

  .selection-card {
    border: 1px solid var(--color-selection-card-border);
    background-color: var(--color-selection-card-fill);
    color: var(--color-selection-card-text);
    font-weight: 400;
    font-size: 3rem;
    min-height: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: var(--color-selection-card-fill-hover);
    }

    .card-link {
      color: var(--color-selection-card-text);
    }

  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--feature-card-width), 1fr));
  gap: 1.5rem;
}

.card-link {
  // height: 100%;

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
    // padding: 1.75rem 1rem;
    font-size: 1.125rem;
    color: var(--color-text);
  }

  &.light {
    // color: var(--color-text-inverted);
    color: hsl(38, 21%, 21%);
  }
}
</style>