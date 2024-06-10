<script setup>
const theme = useState('theme');
const w = theme.value.data.wording.de;
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
<template>
  <nav :class="navClass" aria-label="Main menu" :style="navStyle">
    <div class="sitenav">
      <h3 class="nav-title text-center">{{ w.navigation }}</h3>
      <ul>
        <li>
          <nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/">{{ w.page_start }}</nuxt-link>
        </li>
        <li>
          <nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/sammlungen">{{ w.page_collections
        }}</nuxt-link>
        </li>
        <li>
          <nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/dns">{{ w.page_dns
        }}</nuxt-link>
        </li>
        <li>
          <nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/events">{{ w.page_events
        }}</nuxt-link>
        </li>
        <li>
          <nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/projekte">{{ w.page_projekte
        }}</nuxt-link>
        </li>
        <li>
          <nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/images">{{ w.page_images
        }}</nuxt-link>
        </li>
        <li>
          <nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/team">{{ w.page_team }}</nuxt-link>
        </li>
        <li>
          <nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/kontakt">{{ w.page_contact }}</nuxt-link>
        </li>
        <li>
          <nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/impressum">{{ w.page_imprint }}</nuxt-link>
        </li>
        <li>
          <nuxt-link :tabIndex="tabIndex" @click="navState = 'close'" to="/datenschutz">{{ w.page_privacy_policy }}</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<style scoped lang="scss">
$navbar-height: 48px;
.navigation-drawer {
  position: fixed;
  top: 100px;
  right: 0;
  bottom: 0;
  width: 100vw;
  max-width: 414px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem;
  z-index: 100;
  transition: transform 0.5s ease-out, top 0.25s;
  transform: translateX(100%);
  background-color: var(--color-header-background);
  border-left: 1px solid var(--color-border);
  &.scrolled {
    top: $navbar-height;
  }
  .nav-title {
    margin: 0 0 0.75rem;
    font-weight: 300;
    font-stretch: 125%;
    font-size: 2.25rem;
    color: var(--clr-base-l75);
  }
  .sitenav {
    padding: 1.5rem 0;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        margin-bottom: 0.75rem;
        a {
          display: inline-block;
          width: 100%;
          padding: 0.4rem 0.5rem;
          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1;
          text-align: center;
          text-decoration: none;
          color: var(--color-navigation-text);
          background-color: var(--color-navigation-background);
          border-radius: 6px;
          border: 1px solid var(--color-navigation-border);
          transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
          &:hover,
          &.router-link-active:hover,
          &.router-link-exact-active:hover,
          &:focus,
          &.router-link-active:focus,
          &.router-link-exact-active:focus {
            // outline: 0;
            background-color: var(--color-navigation-background-hover);
            border-color: var(--color-navigation-border-hover);
            color: var(--color-text-inverted);
          }
          &:active {
            background-color: var(--color-navigation-background-hover);
            color: var(--color-text);
          }
          &.router-link-active,
          &.router-link-exact-active {
            background-color: var(--color-navigation-background-active);
            border: 1px solid var(--color-navigation-border-active);
            color: var(--color-text);
          }
        }
      }
    }
  }
}
</style>