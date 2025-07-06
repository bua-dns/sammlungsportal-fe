<script setup>
const route = useRoute();
// const { locale } = useI18n();
const theme = useState('theme');
// const w = theme.value.data.wording[locale.value];
const collection = route.params.collection;
const collectionItemsData = useState('collectionItems');
const collectionData = collectionItemsData.value.data
  ? collectionItemsData.value.data.find(item => item.label === collection)
  : [];
const items = await useFetchCollectionItems(collection, collectionData.items_api);
</script>

<template>
  <div class="page items">
    <Head>
      <Title>Sammlungsobjekte</Title>
    </Head>
    
    <h1 class="page-header-with-subtitle text-center">Sammlungsobjekte</h1>
    <div class="output">
      <pre v-if="true">{{ collection }}</pre>
      <pre v-if="true">{{ collectionData }}</pre>
      <pre v-if="true">{{ items }}</pre>
    </div>
    
  </div>
</template>
<style lang="scss">
.page.projects {
  .projects-content-container {
    display: block;
    h4 {
      margin: 0 0 1rem;
    }
  }
  .sidebar {
    display: none;
    font-size: var(--font-size-text-extra-small);
    h4, h5 {
      font-size: var(--font-size-small);
      margin: 0 0 .5rem;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        display: block;
        margin: 1rem 0;
      }
    }
  }
  &.with-sidebar {

    .projects-content-container {
      display: grid;
      grid-template-columns: 2.5fr 1fr;
      gap: 3rem;

      @media screen and (max-width: 768px){
        grid-template-columns: 1fr;
      }
    }
    .main-content {
    }
    .sidebar {
      display: block;
    }
  }
}

.description {

}

.image-gallery {
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;

  .image-container {
    flex-basis: 12rem;

    img {
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>