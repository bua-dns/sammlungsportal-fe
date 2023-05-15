<template>
  <TheHeader />
  <TheNavigation />
  <main :class="mainClass">
    <slot />
  </main>
  <TheFooter />
</template>
<script setup>
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