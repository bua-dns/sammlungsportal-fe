<script setup>
const props = defineProps(['entry', 'tagFilter', 'activeCollectionId']);
defineEmits(['setFilter', 'setActiveCollectionId']);
const theme = useState('theme');
const w = theme.value.data.wording.de;
const tagTypes = theme.value.data.settings.tags;
const tagNames = theme.value.data.names.tags;

function activeTag(type, tag) {
  if (props.tagFilter[type] && props.tagFilter[type].includes(tag)) {
    return " active";
  }
  return "";
}

function getTagLabelName(tag) {
  return tagNames[tag] ? tagNames[tag] : tag;
}

</script>
<template>
  <div v-if="entry.display" class="card" :id="'collection-' + entry.id">
    <div v-if="entry.id === activeCollectionId" @click="$emit('setActiveCollectionId', null)" :title="w.deselect"
      class="card-deselect"></div>
    <div class="card-keeper" :style="getUniMarkerColors(entry.current_keeper, 'border-bottom-color')"
      v-if="entry.current_keeper">
      <span class="gws_uni_marker" :style="getUniMarkerColors(entry.current_keeper, 'background-color')"></span>
      {{ entry.current_keeper }}
    </div>
    <div class="card-label" v-if="entry.label">
      <strong>{{ entry.label }}</strong>
    </div>
    <div class="card-cols">
      <div class="card-col">
        <div v-if="entry.description" class="card-description" v-html="convertLineBreaks(entry.description)"></div>
        <dl v-if="entry.used_in_activity && entry.used_in_activity.length > 0" style="margin-top: 1rem;">
          <dt>{{ w.used_in_activity }}</dt>
          <dd>
            <ul>
              <li v-for="used_in_activity in entry.used_in_activity"
                :key="'used_in_activity_' + entry.id + '_' + used_in_activity.id">
                {{ used_in_activity.label }}
              </li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="card-col">
        <dl>
          <template v-if="entry.address && entry.address.length > 0">
            <dt>
              <svg class="icon-inline me-1" width="16" height="16" fill="currentColor">
                <use xlink:href="@/assets/img/bootstrap-icons.svg#buildings"></use>
              </svg>
              {{ w.address }}
            </dt>
            <dd v-for="(address, idx) in entry.address" :key="'address_' + entry.id + '_' + idx">
              <span v-html="convertLineBreaks(address.address_data)"></span><br>
              {{ address.postal_code }} {{ address.city }}
            </dd>
          </template>
          <template v-if="entry.phone">
            <dt>{{ w.phone }}</dt>
            <dd>
              <a :href="'tel:' + stripEntry(entry.phone)">{{ stripEntry(entry.phone) }}</a>
            </dd>
          </template>
          <template v-if="entry.email">
            <dt>
              <svg class="icon-inline me-1" width="16" height="16" fill="currentColor">
                <use xlink:href="@/assets/img/bootstrap-icons.svg#envelope"></use>
              </svg>
              {{ w.email }}
            </dt>
            <dd><a :href="'mailto:' + stripEntry(entry.email)">{{ stripEntry(entry.email) }}</a></dd>
          </template>
          <template v-if="entry.opening_hours">
            <dt>
              <svg class="icon-inline me-1" width="16" height="16" fill="currentColor">
                <use xlink:href="@/assets/img/bootstrap-icons.svg#clock"></use>
              </svg>
              {{ w.opening_hours }}
            </dt>
            <dd v-html="convertLineBreaks(entry.opening_hours)"></dd>
          </template>
          <template v-if="entry.homepage">
            <dt>
              <svg class="icon-inline me-1" width="16" height="16" fill="currentColor">
                <use xlink:href="@/assets/img/bootstrap-icons.svg#house"></use>
              </svg>
              {{ w.homepage }}
            </dt>
            <dd>
              <a :href="entry.homepage" :title="entry.homepage" target="_blank" rel="noopener">
                {{ stripUrl(entry.homepage) }}
              </a>
            </dd>
          </template>
          <template v-if="entry.collection_portal && entry.collection_portal.length > 0">
            <dt>
              <svg class="icon-inline me-1" width="16" height="16" fill="currentColor">
                <use xlink:href="@/assets/img/bootstrap-icons.svg#record-circle"></use>
              </svg>
              {{ w.collection_portal }}
            </dt>
            <dd>
              <ul>
                <li v-for="(portal, idx) in entry.collection_portal" :key="'portal_' + entry.id + '_' + idx">
                  <a :href="portal.url" target="_blank" rel="noopener">{{ portal.name }}</a>
                </li>
              </ul>
            </dd>
          </template>
        </dl>
      </div>
    </div>
    <div class="tag-navigation">
      <!-- <pre>{{ tagTypes }}</pre> -->
      <!-- <pre>{{ entry }}</pre> -->
      <template v-for="tagType in tagTypes" :key="'collection-card-tag-' + tagType">
        <div v-if="entry[tagType] && entry[tagType].length > 0 && tagType !== 'current_keeper'" class="tag-card">
          <h4 class="tag-title">{{ w[tagType] }}</h4>
          <div class="tags">
            <button v-for="(tag, idx) in entry[tagType]" :key="'tag_' + entry.id + '_' + idx"
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

.card-deselect {
  position: absolute;
  top: 0.25rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  // background-color: #eee;
  cursor: pointer;

  &::before,
  &::after {
    width: 1em;
    height: 2px;
    position: absolute;
    top: 50%;
    right: 0.5rem;
    content: '';
    background-color: var(--color-text);
    text-align: right;
    // transform: translateY(-50%);
    // transition: transform .2s ease-in-out;
  }

  &::before {
    // transform: translateY(-50%) rotate(-45deg);
    transform: rotate(-45deg);
  }

  &::after {
    // transform: translateY(-50%) rotate(45deg);
    transform: rotate(45deg);
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
</style>