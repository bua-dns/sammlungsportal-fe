<script setup>
const route = useRoute();
const backgroundImages = useState('background_images');
const randImageRoutes = ['sammlungen', 'index'];

function getRandomImage(page) {
  const images = (page === 'index')
    ? backgroundImages.value.data.filter(image => image.use_for_front_page === '1')
    : backgroundImages.value.data;
  return images[Math.floor(Math.random() * images.length)];
}
const randomImage = ref({});
randImageRoutes.forEach(page => {
  randomImage.value[page] = getRandomImage(page);
});

watch(() => route.name, () => {
  if (randImageRoutes.includes(route.name)) {
    randomImage.value[route.name] = getRandomImage(route.name);
  }

});

const scrollState = useState('scroll');
const mainClass = computed(() => {
  if (scrollState.value) {
    return 'scrolled';
  }
  else {
    return '';
  }
});
</script>
<template>
  <div class="t_default">
    <TheHeader />
    <TheNavigation />
    <div v-if="randImageRoutes.includes($route.name)" class="bg-img">
      <img :src="projectConfig.imageBaseUrl + '/' + randomImage[$route.name].image + '?key=bg-image'"
        :alt="randomImage[$route.name].credits">
    </div>
    <main :class="mainClass">
      <slot />
    </main>
    <TheFooter />
    <InfoBadge v-if="randImageRoutes.includes($route.name)" />  
  </div>
</template>


<style lang="scss">
.t_default {
  position: relative;
}
.bg-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background-color: black;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    opacity: .65;
  }
}
</style>