<template>
  <TheHeader />
  <TheNavigation />
  <div v-if="$route.name === 'sammlungen'" class="bg-img" :style="bgStyle" v-html="backgroundImage('sammlungen')"></div>
  <div v-if="$route.name === 'index'" class="bg-img" :style="bgStyle" v-html="backgroundImage('index')"></div>
  <main :class="mainClass">
    <slot />
  </main>
  <TheFooter />
</template>
<script setup>
// const theme = useState('theme');
let randomImage = null;
const backgroundImages = useState('background_images');

function getRandomImage(page) {
  let images = backgroundImages.value.data;
  if (page === 'index') {
    images = [...images].filter(image => image.use_for_front_page === '1');
  }
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return randomImage;
}
function backgroundImage(page) {
  randomImage = getRandomImage(page);
  if (randomImage) {
    return `<img src="https://sammlungsportal.bua-dns.de/assets/${randomImage.image}" alt="${randomImage.credits}" />`;
  } else {
    return '';
  }
}
const bgStyle = computed(() => {
  if (randomImage) {
    // return `background-color: ${theme.value.data.settings.ciColors[randomImage.university]};`;
    return `background-color: hsl(0deg 0% 0%);`;
  }
  else {
    return '';
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
<style lang="scss">
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
    opacity: .25;
  }
}
</style>