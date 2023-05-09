<template>
  <nav :class="navClass" aria-label="Main menu" :style="navStyle">
    <div class="sitenav">
      <h3 class="nav-title text-center">Navigation</h3>
      <ul>
        <li><nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/">Home</nuxt-link></li>
        <li><nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/entdecken">Entdecken</nuxt-link></li>
        <li><nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/kontakt">Kontakt</nuxt-link></li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
const navState = useState('nav');
const scrollState = useState('scroll');
const navStyle = computed(() => {
  if (navState.value === 'open') {
    return {
      transform: 'translateX(0)'
    }
  }
  else {
    return {
      transform: 'translateX(100%)'
    }
  }
});
const navClass = computed(() => {
  if (scrollState.value) {
    return 'navigation-drawer scrolled';
  }
  else {
    return 'navigation-drawer';
  }
});
const tabIndex = computed(() => {
  if (navState.value === 'open') {
    return 0;
  }
  else {
    return -1;
  }
});
</script>