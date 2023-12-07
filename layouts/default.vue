<template>
  <TheHeader />
  <TheNavigation />
  <div v-if="$route.name === 'sammlungen'" class="bg-img" :style="bgStyle" v-html="backgroundImage()"></div>
  <main :class="mainClass">
    <slot />
  </main>
  <TheFooter />
</template>
<script setup>
// const theme = useState('theme');
const backgroundImages = useState('background_images');

function getRandomImage() {
  const images = backgroundImages.value.data;
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return randomImage;
}
const randomImage = getRandomImage();

function backgroundImage() {
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    opacity: .45;
  }
}
</style>