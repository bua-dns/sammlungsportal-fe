<script setup>
/* special page used to display info about background images */
/* Used auto-imported composables: projectConfig */
const theme = useState("theme")
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });

const { data } = await useFetchPage('images')
const pageTitle = data.value.data[0].title;
const pageContent = data.value.data[0].page_content;
const backgroundImages = useState('background_images');

function filterListableImages(images) {
  return images.filter(image => image.image)
}

</script>

<template>

  <Head>
    <Title>{{ w.page_images }}</Title>
  </Head>
  <div class="page image-listing-page" v-if="data">
    <section class="cms-page">
      <h1 class="text-center">{{ pageTitle }}</h1>
      <div class="page-content" v-html="pageContent" />
    </section>
    <section class="listing">
      <div class="mb-lg-4 mb-5 entry" v-for="image in filterListableImages(backgroundImages.data)" :key="image.id"
        :id="'image-' + image.id">
        <div class="image-part">
          <img :src="projectConfig.imageBaseUrl + '/' + image.image + '?key=listing-image'"
            :alt="`image ${image.credits} `">
          <div v-if="image.credits" class="mt-1 credits" v-html="image.credits" />
        </div>
        <div class="text-part">
          <div v-if="image.description" class="mb-4 description" v-html="image.description" />
          <div class="link" v-if="image.object_from_collection">
            <span>Eine Aufnahme aus:</span>
            <NuxtLink :to="`/sammlungen?acid=${image.object_from_collection.id}`">
              {{ image.object_from_collection.label }}
            </NuxtLink>
            <span v-if="image.current_keeper">{{ image.object_from_collection.current_keeper }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang='scss'>
.image-listing-page {
  .listing {
    .entry {
      scroll-margin-top: 88px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      @media screen and (min-width: 768px) {
        flex-direction: row;
        gap: 2.5rem;
      }

      .image-part {
        flex: 1;

        img {
          width: 100%;
          height: auto;
        }

        .credits {
          font-size: var(--font-size-text-extra-small);
        }
      }

      .text-part {
        flex: 1;
        font-size: var(--font-size-text-small);

        .description {
          font-size: var(--font-size-text-small);

          p {
            margin: 0;
          }
        }

        .link {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 0.5rem;
        }
      }
    }
  }
}
</style>

