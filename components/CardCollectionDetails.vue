<script setup>
/* Used auto-imported composables: projectConfig */
/*
REFACTORING:
- w sematisch benennen: wording (Konflikte?)
*/
const props = defineProps([
  'collection',
  'termsListing',
  'termFilter',
  'activeCollectionId'
]);
defineEmits(['setTermFilter', 'setActiveCollectionId']);
const theme = useState('theme');
const w = theme.value.data.wording.de;
const tagTypes = theme.value.data.settings.tags;
const tagNames = theme.value.data.names.tags;
const terms = theme.value.data.settings.terms;
const taxonomies = theme.value.data.names.taxonomies;

function getTaxonomyInfo(taxonomy) {
  // extract taxonomy info from collection
  if (!props.collection[taxonomy]) {
    return [];
  }
  return props.collection[taxonomy].map((term) => {
    return term.taxonomy_terms_id.label;
  });
}
function checkIfAnyTermsExist() {
  let empty = true;
  const taxonomies = Object.keys(props.termsListing);
  for (const taxonomy of taxonomies) {
    if (props.collection[taxonomy].length > 0) {
      empty = false;
    }
  }
  return !empty;
}
function checkIfTermIsActive(taxonomy, term) {
  if (props.termFilter[taxonomy] && props.termFilter[taxonomy].includes(term)) {
    return " active";
  }
  return "";
}

function getTaxonomyName(taxonomy) {
  return taxonomies[taxonomy] ? taxonomies[taxonomy] : taxonomy;
}
function getImageFilenames(images) {
  return images.map((image) => {
    return image.directus_files_id.filename_disk;
  });
}
const showLightbox = ref(false);

</script>
<template>
  <div v-if="collection.display" :class="collection.id === activeCollectionId ? 'card active-collection' : 'card'"
    :id="'collection-' + collection.id">
    <div v-if="collection.id === activeCollectionId" @click="$emit('setActiveCollectionId', null)" :title="w.deselect"
      class="card-deselect"></div>
    <div class="card-keeper" :style="getUniMarkerColors(collection.current_keeper, 'border-bottom-color')"
      v-if="collection.current_keeper">
      <span class="gws_uni_marker" :style="getUniMarkerColors(collection.current_keeper, 'background-color')"></span>
      {{ collection.current_keeper }}
    </div>
    <div class="card-label" v-if="collection.label">
      <strong>{{ collection.label }}</strong>
    </div>
    <pre v-if="false">{{ collection }}</pre>
    <div class="card-cols">
      <div class="card-col">
        <div v-if="collection.description" class="card-description" v-html="convertLineBreaks(collection.description)"></div>
        <!-- WORK IN PROGRESS: prov. switched of by v-if="false" -->
        <dl v-if="false && collection.used_in_activity && collection.used_in_activity.length > 0" style="margin-top: 1rem;">
          <dt>{{ w.used_in_activity }}</dt>
          <dd>
            <ul>
              <li v-for="used_in_activity in collection.used_in_activity"
                :key="'used_in_activity_' + collection.id + '_' + used_in_activity.id">
                {{ used_in_activity.label }}
              </li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="card-col">
        <dl>
          <template v-if="collection.address && collection.address.length > 0">
            <dt>
              <svg class="icon-inline me-1" width="16" height="16" fill="currentColor">
                <use xlink:href="@/assets/img/bootstrap-icons.svg#buildings"></use>
              </svg>
              {{ w.address }}
            </dt>
            <dd v-for="(address, idx) in collection.address" :key="'address_' + collection.id + '_' + idx">
              <span v-html="convertLineBreaks(address.address_data)"></span><br>
              {{ address.postal_code }} {{ address.city }}
            </dd>
          </template>
          <template v-if="collection.phone">
            <dt>{{ w.phone }}</dt>
            <dd>
              <a :href="'tel:' + stripEntry(collection.phone)">{{ stripEntry(collection.phone) }}</a>
            </dd>
          </template>
          <template v-if="collection.email">
            <dt>
              <svg class="icon-inline me-1" width="16" height="16" fill="currentColor">
                <use xlink:href="@/assets/img/bootstrap-icons.svg#envelope"></use>
              </svg>
              {{ w.email }}
            </dt>
            <dd><a :href="'mailto:' + stripEntry(collection.email)">{{ stripEntry(collection.email) }}</a></dd>
          </template>
          <template v-if="collection.opening_hours">
            <dt>
              <svg class="icon-inline me-1" width="16" height="16" fill="currentColor">
                <use xlink:href="@/assets/img/bootstrap-icons.svg#clock"></use>
              </svg>
              {{ w.opening_hours }}
            </dt>
            <dd v-html="convertLineBreaks(collection.opening_hours)"></dd>
          </template>
          <template v-if="collection.homepage">
            <dt>
              <svg class="icon-inline me-1" width="16" height="16" fill="currentColor">
                <use xlink:href="@/assets/img/bootstrap-icons.svg#house"></use>
              </svg>
              {{ w.homepage }}
            </dt>
            <dd>
              <a :href="collection.homepage" :title="collection.homepage" target="_blank" rel="noopener">
                {{ stripUrl(collection.homepage) }}
              </a>
            </dd>
          </template>
          <template v-if="collection.collection_portal && collection.collection_portal.length > 0">
            <dt>
              <svg class="icon-inline me-1" width="16" height="16" fill="currentColor">
                <use xlink:href="@/assets/img/bootstrap-icons.svg#record-circle"></use>
              </svg>
              {{ w.collection_portal }}
            </dt>
            <dd>
              <ul>
                <li v-for="(portal, idx) in collection.collection_portal" :key="'portal_' + collection.id + '_' + idx">
                  <a :href="portal.url" target="_blank" rel="noopener">{{ portal.name }}</a>
                </li>
              </ul>
            </dd>
          </template>
        </dl>
        <div v-if="collection.collection_image_main" class="card-img-container">
          <ImageViewer :images="getImageFilenames(collection.collection_images)" :startImage="0" previewMode="gallery"/>
          <!-- <img @click="showLightbox = true" :src="`${projectConfig.imageBaseUrl}/${collection.collection_image_main.filename_disk}?key=240x240`" alt="">
          <Teleport to="body">
            <LightBox v-if="showLightbox" :images="collection.collection_images"
              @close="showLightbox = false" />
          </Teleport> -->
        </div>
      </div>
    </div>
    <template v-if="checkIfAnyTermsExist()">
      <div class="tag-navigation-title"><strong>{{ w.tag_navigation_title }}</strong>{{ w.tag_navigation_hint }}</div>
      <!-- DEV Output -->
      <div class="dev-output">

      </div>
      <div class="tag-navigation" v-if="true">
        <template v-for="taxonomy in Object.keys(termsListing)" :key="'collection-card-tag-' + taxonomy">
          <div v-if="getTaxonomyName(taxonomy) && getTaxonomyInfo(taxonomy).length" class="tag-card">
            <h4 class="tag-title">{{ getTaxonomyName(taxonomy) }}</h4>
            <div class="tags">
              <button v-for="term in getTaxonomyInfo(taxonomy)" :key="`term-${term}`"
                :class="`tag${checkIfTermIsActive(taxonomy, term)}`" @click="$emit('setTermFilter', taxonomy, term)">
                {{ term }}
              </button>
            </div>
          </div>
        </template>    
      </div>
    </template>
  </div>
</template>
<style scoped lang="scss">
.card {
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  scroll-margin-top: 64px;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &.active {
    border: 2px solid #2b5c8c;
    background-color: #f3f3ff;
  }
}

.card-keeper {
  border-bottom: 2px solid #333;
  font-size: 0.85rem;
}

.card-label {
  padding: 1rem 0;
}

.card-cols {
  .card-col {
    &:nth-child(2) {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 768px) {
  .card-cols {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .card-col {
      flex: 1 1 50%;
      padding: 0 1rem;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }

      &:nth-child(2) {
        margin-top: 0;
      }
    }
  }
}

dl {
  margin: 0;
}

dt,
dd {
  overflow-wrap: break-word;
  hyphens: auto;
}

dt:not(:first-child) {
  margin-top: 0.5rem;
}

dd ul {
  margin: 0;
  padding-left: 0;
}

.label {
  font-weight: bold;
}

a {
  overflow-wrap: break-word;
}

.card-img-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1.5rem;

  img {
    display: block;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--color-nav-brd);
    cursor: pointer;
  }
}
</style>