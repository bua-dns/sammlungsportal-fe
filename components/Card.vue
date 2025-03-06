<script setup>
/* Used auto-imported composables: projectConfig */

const props = defineProps({
  'cardContent': {
    type: Object,
  },
  cardTitle: {
    type: String,
  },
  rubric: {
    type: String,
  },
  cardTitleLink: {
    type: String,
    default: null,
  },
  cardText: {
    type: String,
  },
  cardImage: {
    type: String,
  },
  cardMoreButtonLabel: {
    type: String,
  },
  cardMoreButtonLink: {
    type: String,
  },
  cardBodyMinHeight: {
    type: String,
  },
});

</script>
<template>
  <div class="page-card-generic">
    <div class="card-image">
      <GeneralLink :link="cardMoreButtonLink" v-if="cardImage">
        <img :src="useGetImageUrl(cardImage, 'card-image')" alt="">
      </GeneralLink>
    </div>
    <div class="card-body" :style="`min-height: ${cardBodyMinHeight || 'none'}; `">
      <div class="card-body-content">
        <template v-if="cardTitleLink && cardTitleLink.length > 0">
          <h4 class="rubric">{{ rubric }}</h4>
          <GeneralLink :link="cardTitleLink">
            <h3 class="card-title">{{ cardTitle }}</h3>
          </GeneralLink>
        </template>
        <template v-if="!cardTitleLink || cardTitleLink.length === 0">
          <h3 class="card-title">{{ cardTitle }}</h3>
        </template>
        <div class="card-text" v-html="cardText" />
      </div>
      <div class="card-footer">
        <GeneralLink :link="cardMoreButtonLink" cssClass="card-link">
          {{ cardMoreButtonLabel }}
        </GeneralLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.page-card-generic {
  // css variables
  // fill in values or centrally defined css variables
  --color-text: var(--color-feature-card-text);
  --color-border: var(--color-feature-card-border);
  --color-fill: var(--color-feature-card-fill);
  --font-family: var(--font-family-sans-serif);
  --font-size-text: .725rem;
  --font-size-title: 1rem;
  --font-size-footer: .825rem;
  // end css variables

  font-size: var(--font-size-text);
  color: var(--color-feature-card-text);
  border: 1px solid var(--color-border);
  background-color: var(--color-fill);
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  h3 {
    margin-bottom: 0.25rem;
    font-size: var(--font-size-title);
    font-family: var(--font-family);
    line-height: 1.4;
    margin-bottom: 0.5rem;
    // min-height: 2.75rem;
  }

  h4 {
    font-size: .75rem;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    font-weight: 300;
  }

  p {
    margin: 0 0 0.25rem 0;
  }

  .card-body {
    padding: .75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (min-width: 576px) {}
  }

  .card-footer {
    font-size: var(--font-size-footer);
    text-align: right;

    .card-link {}
  }

  .card-image {
    overflow: hidden;
    height: 8.5rem;
    cursor: pointer;
    max-width: 100%;

    img {
      display: block;
      margin: 0 auto;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      width: 100%;
      height: 100%;
      object-fit: cover; // Ensures the image covers its container neatly
    }

    &:hover {
      img {
        transform: scale(1.05);
      }
    }
  }
}
</style>