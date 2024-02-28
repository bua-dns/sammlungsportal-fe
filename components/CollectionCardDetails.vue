<script setup>
/*
REFACTORING:
- w sematisch benennen: wording (Konflikte?)
*/
const props = defineProps([
  'collection',
  'termsIndex', 
  'tagFilter', 
  'activeCollectionId'
]);
defineEmits(['setFilter', 'setActiveCollectionId']);
const theme = useState('theme');
const w = theme.value.data.wording.de;
const tagTypes = theme.value.data.settings.tags;
const tagNames = theme.value.data.names.tags;
// REFACTOR: es müsste taxonomies heißen, nicht terms
const terms = theme.value.data.settings.terms;

function getTaxonomyInfo() {
  // extract taxonomy info from collection
  const index = {};
  for (let taxonomy in props.termsIndex) {
    index[taxonomy] = [];
    for (let term of props.collection[taxonomy]) {
      index[taxonomy].push(term.taxonomy_terms_id.label);
    }
  }
  return index;
}

function activeTag(type, tag) {
  if (props.tagFilter[type] && props.tagFilter[type].includes(tag)) {
    return " active";
  }
  return "";
}
function getTaxonomyName(taxonomy) {
  return terms[taxonomy] ? terms[taxonomy] : taxonomy;
}



const showLightbox = ref(false);
const imageBasePath = "https://sammlungsportal.bua-dns.de/assets/";

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
        <dl v-if="collection.used_in_activity && collection.used_in_activity.length > 0" style="margin-top: 1rem;">
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
          <img @click="showLightbox = true" :src="imageBasePath + collection.collection_image_main.filename_disk + '?key=240x240'" alt="">
          <Teleport to="body">
            <LightBox v-if="showLightbox" :imageBasePath="imageBasePath" :images="collection.collection_images"
              @close="showLightbox = false" />
          </Teleport>
          <!-- {{ collection.collection_images }} -->
        </div>
      </div>
    </div>
    <div class="tag-navigation-title"><strong>{{ w.tag_navigation_title }}</strong>{{ w.tag_navigation_hint }}</div>
    <!-- Output for old tagging system -->
    <div class="tag-navigation" v-if="true">
      <!-- <pre>{{ tagTypes }}</pre> -->
      <!-- <pre>{{ collection }}</pre> -->
      <!-- PRALLEL -->
      <div class="dev-output">
        <pre>{{ collection }}</pre>
        <pre>{{ termsIndex }}</pre>
        <pre>{{ getTaxonomyInfo() }}</pre>
        
        <template v-for="taxonomy in Object.entries(getTaxonomyInfo())" :key="'collection-card-tag-' + taxonomy[0]">
          <h4>{{ getTaxonomyName(taxonomy[0]) }}</h4>
          <div v-for="term in taxonomy[1]" :key="`term-${term}`">{{ term }}</div>
        </template>
      </div>
      <template v-for="tagType in tagTypes" :key="'collection-card-tag-' + tagType">
        <div v-if="collection[tagType] && collection[tagType].length > 0 && tagType !== 'current_keeper'" class="tag-card">
          <h4 class="tag-title">{{ w[tagType] }}</h4>
          <div class="tags">
            <button v-for="(tag, idx) in collection[tagType]" :key="'tag_' + collection.id + '_' + idx"
              :class="'tag' + activeTag(tagType, tag.label)" @click="$emit('setFilter', tagType, tag.label)">
              {{ getTagLabelName(tag.label) }}
            </button>
          </div>
        </div>
      </template>
    
    </div>
    
  </div>
</template>
<style scoped lang="scss">
.card {
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  // opacity: 0.85;
  scroll-margin-top: 64px;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  // &:hover {
  //   opacity: 1;
  // }
  &.active {
    border: 2px solid #2b5c8c;
    background-color: #f3f3ff;
    /* box-shadow: inset 0px 0px 20px 0px #2b5c8c; */
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
  // word-wrap: break-word;
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