<script setup>
defineProps(['entry']);
const theme = useState('theme');
const w = theme.value.data.wording.de;
</script>
<template>
  <div class="card">

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
      <div v-if="entry.role && entry.role.length > 0" class="tag-card">
        <h4 class="tag-title">{{ w.role }}</h4>
        <div class="tags">
          <div v-for="role in entry.role" :key="'role_' + entry.id + '_' + role.id">
            <button class="tag">{{ role.label }}</button>
          </div>
        </div>
      </div>
      <div v-if="entry.subject && entry.subject.length > 0" class="tag-card">
        <h4 class="tag-title">{{ w.subject }}</h4>
        <div class="tags">
          <div v-for="subject in entry.subject" :key="'subject_' + entry.id + '_' + subject.id">
            <button class="tag">{{ subject.label }}</button>
          </div>
        </div>
      </div>
      <div v-if="entry.genre && entry.genre.length > 0" class="tag-card">
        <h4 class="tag-title">{{ w.genre }}</h4>
        <div class="tags">
          <div v-for="genre in entry.genre" :key="'genre_' + entry.id + '_' + genre.id">
            <button class="tag">{{ genre.label }}</button>
          </div>
        </div>
      </div>
      <div v-if="entry.academic_teaching && entry.academic_teaching.length > 0" class="tag-card">
        <h4 class="tag-title">{{ w.academic_teaching }}</h4>
        <div class="tags">
          <div v-for="academic_teaching in entry.academic_teaching"
            :key="'academic_teaching_' + entry.id + '_' + academic_teaching.id">
            <button class="tag">{{ w[academic_teaching.label] }}</button>
          </div>
        </div>
      </div>
      <div v-if="entry.special_form && entry.special_form.length > 0" class="tag-card">
        <h4 class="tag-title">{{ w.special_form }}</h4>
        <div class="tags">
          <div v-for="special_form in entry.special_form" :key="'special_form_' + entry.id + '_' + special_form.id">
            <button class="tag">{{ special_form.label }}</button>
          </div>
        </div>
      </div>
      <div v-if="entry.living_being && entry.living_being.length > 0" class="tag-card">
        <h4 class="tag-title">{{ w.living_being }}</h4>
        <div class="tags">
          <div v-for="living_being in entry.living_being" :key="'living_being_' + entry.id + '_' + living_being.id">
            <button class="tag">{{ living_being.label }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card {
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: #fff;
  // opacity: 0.85;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  // &:hover {
  //   opacity: 1;
  // }
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


.tag-navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
  // border-top: 1px solid var(--color-base-d25);
  // border-top: 1px solid var(--color-nav-brd);
  padding-top: 1rem;

  .tag-card {
    padding: .75rem;
    // border: 1px solid var(--color-base-d25);
    border: 1px solid var(--color-nav-brd);
    // border: 1px solid var(--color-base-d10);
    border-radius: 6px;
    background-color: var(--color-base-d0);
    flex: 1 1 19ch;

    .tag-title {
      font-size: 1rem;
      font-family: "Merriweather Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
        Cantarell, "Open Sans", "Noto Sans", "Liberation Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-weight: 320;
      margin: 0;
      padding: 0 0 0.5rem 0;
      text-align: center;
      // border-bottom: 1px solid var(--color-base-d10);
      border-bottom: 1px solid var(--color-nav-brd);
      ;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: .75rem;
      margin: 1rem 0 0;

      .tag {
        // background-color: var(--color-base-d50);
        background-color: var(--color-nav-bg);
        font-size: .9rem;
        font-weight: 500;
        line-height: 1;
        margin: 0;
        padding: .3em .6em;
        border: 0;
        border-radius: 4px;
        cursor: pointer;

        &:hover,
        &:focus {
          background-color: var(--color-nav-hover-bg);
          border-color: var(--color-nav-hover-brd);
          color: var(--color-text-inv);
        }
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
</style>