<script setup>
const sampleMediaObjects = ref([]);
const sampleMediaObjectsWithLabels = ref([]);
const sampleMediaSmallSlides = ref([]);
const sampleMediaGlassSlides = ref([]);
const sampleMediaPrints = ref([]);
const mstubItems = useState("mstubItems");
const mineralImagesListing = mstubItems.value.data
  .filter((item) => item.representations && item.representations.length > 0)
  .map((item) => {
    return {
      representations: item.representations.map((representation) => {
        return {
          image: representation.directus_files_id,
          // take only the first mineral denomination, because only one can be called on click
          minerals: item.mineral_denominations_relations.split(',')[0].trim(),
        };
      }),
    };
  })
  // flatten the resulting array
  let mineralImages = mineralImagesListing.flatMap((item) => item.representations);

const mediaSamples = ref([]);
async function getMediaSamples() {
  const randomMineralImages = [];
  while (randomMineralImages.length < 5 && mineralImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * mineralImages.length);
    randomMineralImages.push(mineralImages.splice(randomIndex, 1)[0]);
  }
  mediaSamples.value = randomMineralImages;
}
onMounted(async () => {
  getMediaSamples();
});

onUnmounted(() => {
  // Clean up any resources here
});

</script>

<template>
  <div class="samples" v-if="true">
    <pre v-if="false">{{ mediaSamples }}</pre>
    <pre v-if="false">{{ mineralImages }}</pre>
    <pre v-if="false">{{ mstubItems }}</pre>
    <h3>Beispiele für Minerale in den Mineraliensammlungen der TU Berlin</h3>
    <div class="samples-listing">
      <div class="item" v-for="sample in mediaSamples" :key="`sample-${sample.image}`">

        <MSTUBItem :sample="sample" />
      </div>
    </div>
    <!-- <h3>Beispiele <strong>Kleinbilddias</strong> aus der Lehrbilder-Datenbank des IKB der HU Berlin</h3>
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
    </div> -->
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