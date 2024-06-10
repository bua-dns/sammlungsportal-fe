<script setup>
/* Used auto-imported composables: projectConfig */
const theme = useState("theme")
const w = theme.value.data.wording.de
// useHead({ title: data.value.data[0].title });

// config for specific page

// DEV: replace by slug from path
const slug = 'events'
const titleWording = 'page_events'

const { data } = await useFetchPage(slug)
const page = data.value.data[0]

const eventsData = useState('events');
const events = eventsData.value.data;
function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    // hour: 'numeric',
    // minute: 'numeric',
  });
}

function getTimeFormat(time) {
  return new Date(`2021-01-01T${time}`).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

</script>

<template>

  <Head>
    <Title>{{ w.page_projekte }}</Title>
  </Head>
  <div class="page p_dns-page" v-if="data && page.status === 'published'">
    <pre v-if="false">{{ projects }}</pre>
    <h1 class="mb-4 text-center">{{ page.title }}</h1>
    <template v-if="!page.display_sidebar">
      <div class="page-content" v-html="page.page_content" />
    </template>
    <template v-if="page.display_sidebar">
      <div class="page-container">
        <div class="page-content" v-html="page.page_content" />
        <pre v-if="false">{{ page }}</pre>
        <div class="sidebar">
          <div class="mt-3 mb-5 sidebar-header" v-if="page.sidebar_header_image">
            <img :src="projectConfig.imageBaseUrl + '/' + page.sidebar_header_image + '?key=sidebar-header'"
              alt="sidebar image" />
          </div>
          <div class="sidebar-content" v-if="page.sidebar_content" v-html="page.sidebar_content" />
        </div>
      </div>
    </template>
    <div v-if="true" class="events-listing mt-5">
      <div v-for="event in events" :key="event.id" class="event-entry">
        <div class="event-header">
          <h3>{{ event.title }}</h3>
          <h4>{{ event.subtitle }}</h4>
          <div class="date-time">{{ formatDate(event.date) }}, {{ getTimeFormat(event.time_start) }}
            <span v-if="event.time_end"> - {{ getTimeFormat(event.time_end) }}</span> 
            Uhr
          </div>
          <div class="location" v-html="event.venue" />
          <div class="description" v-html="event.description" />
          <div class="event-type">{{ w[event.event_type] }}</div>
          <div class="registration-info">{{ w[event.registration] }}</div>
        </div>

        
      </div>

      <pre v-if="false">{{ events }}</pre>
    </div>
  </div>
</template>

<style lang='scss'>
.p_dns-page {
  .page-container {
    display: block;

    .page-content {}

    .sidebar {
      .sidebar-header {
        display: none;

        img {}
      }
    }
  }

  .page-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--feature-card-width), 1fr));
    gap: 1.5rem;
  }
}
.events-listing {
  .event-entry {
    margin-bottom: 2rem;
    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    h4 {
      font-size: 1.125rem;
      font-weight: 400;
      margin-bottom: 0.5rem;
    }
  }
}

@media screen and (min-width: 768px) {
  .p_dns-page {
    .page-container {
      display: flex;
      gap: 2.5rem;

      .page-content {
        flex: 2;
      }

      .sidebar {
        .sidebar-header {
          display: block;
        }

        flex: 1;
      }
    }
  }

}
</style>
