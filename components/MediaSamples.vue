<script setup>
const sampleMediaSmallSlides = ref([]);
const sampleMediaGlassSlides = ref([]);
const sampleMediaPrints = ref([]);
async function getMediaSamples() {
  const sampleMediaUrl = `https://ikb-lbs-hub.bua-dns.de/items/ikb_items`;
  // Glasdias
  const sampleMediaGlassSlidesResponse = await $fetch(sampleMediaUrl, {
    query: {
      limit: 5,
      page: Math.floor(Math.random() * 4000),
      fields: '*.*',
      // DEV: Filterfunktion noch nicht korrekt
      filter: {
        'dns_medium_type': {
          '_eq': 'Glasdia'
        }
      }
    }
  });
  sampleMediaGlassSlides.value = sampleMediaGlassSlidesResponse.data;
  // Kleinbilddias
  const sampleMediaSmallSlidesResponse = await $fetch(sampleMediaUrl, {
    query: {
      limit: 5,
      page: Math.floor(Math.random() * 4000),
      fields: '*.*',
      // DEV: Filterfunktion noch nicht korrekt
      filter: {
        'dns_medium_type': {
          '_eq': 'Kleinbilddia'
        }
      }
    }
  });
  sampleMediaSmallSlides.value = sampleMediaSmallSlidesResponse.data;

  const sampleMediaPrintsResponse = await $fetch(sampleMediaUrl, {
    query: {
      limit: 5,
      page: Math.floor(Math.random() * 100),
      fields: '*.*',
      // DEV: Filterfunktion noch nicht korrekt
      filter: {
        'dns_medium_type': {
          '_eq': 'Fotoabzug'
        }
      }
    }
  });
  sampleMediaPrints.value = sampleMediaPrintsResponse.data;
}
onMounted(async () => {
  await getMediaSamples();
});

onUnmounted(() => {
  // Clean up any resources here
});

</script>

<template>
  <div class="samples" v-if="sampleMediaSmallSlides">
    <h3>Beispiele <strong>Glasdias</strong> aus der Lehrbilder-Datenbank des IKB der HU Berlin</h3>
    <div class="samples-listing">
      <div class="item" v-for="item in sampleMediaGlassSlides" :key="`item-${item.id}`">
        <IKBItem :item="item" />
      </div>
    </div>
    <h3>Beispiele <strong>Kleinbilddias</strong> aus der Lehrbilder-Datenbank des IKB der HU Berlin</h3>
    <div class="samples-listing">
      <div class="item" v-for="item in sampleMediaSmallSlides" :key="`item-${item.id}`">
        <IKBItem :item="item" />
      </div>
    </div>
    <h3>Beispiele <strong>Fotoabzüge</strong> aus der Lehrbilder-Datenbank des IKB der HU Berlin</h3>
    <div class="samples-listing">
      <div class="item" v-for="item in sampleMediaPrints" :key="`item-${item.id}`">
        <IKBItem :item="item" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.samples {
  margin-top: 4rem;

  h3 {
    margin-bottom: 1rem;
    font-weight: 500;

    strong {
      font-weight: 700;
    }
  }

  .samples-listing {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
}
</style>