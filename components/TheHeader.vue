<script setup>
const theme = useState("theme");
const w = theme.value.data.wording.de;

const navState = useState("nav", () => "close");
const toggleNav = () => {
  navState.value = navState.value === "close" ? "open" : "close";
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const scrollOffset = 40;
const scrollState = useState("scroll", () => false);
const handleScroll = () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > scrollOffset && !navbar.classList.contains("shrink")) {
    navbar.classList.add("shrink");
    scrollState.value = true;
  } else if (window.scrollY <= scrollOffset && navbar.classList.contains("shrink")) {
    navbar.classList.remove("shrink");
    scrollState.value = false;
  }
};
</script>

<template>
  <header class="navbar fixed-top dns-page-header">
    <nuxt-link to="/" class="dns-branding" v-if="true">
      <div class="dns-logo-container">      <svg
        id="Ebene_1"
        data-name="Ebene 1"
        xmlns="http://www.w3.org/2000/svg"
        width="119"
        height="89.25"
        viewBox="0 0 119 89.25"
        class="dns-navbar-logo"
      >
        <line
          x1="22.31"
          y1="21.32"
          x2="49.09"
          y2="44.13"
          style="fill: #525252; stroke: #525252; stroke-miterlimit: 10; stroke-width: 5px"
        />
        <line
          x1="49.09"
          y1="44.13"
          x2="100.16"
          y2="63.47"
          style="fill: #525252; stroke: #525252; stroke-miterlimit: 10; stroke-width: 5px"
        />
        <line
          x1="50.08"
          y1="45.12"
          x2="93.71"
          y2="18.35"
          style="fill: #525252; stroke: #525252; stroke-miterlimit: 10; stroke-width: 5px"
        />
        <circle cx="22.04" cy="20.29" r="18.84" style="fill: #848f7f; stroke-width: 0px" />
        <line
          x1="17.35"
          y1="71.9"
          x2="49.09"
          y2="45.12"
          style="fill: #525252; stroke: #525252; stroke-miterlimit: 10; stroke-width: 5px"
        />
        <circle cx="49.09" cy="45.12" r="12.4" style="fill: #525252; stroke-width: 0px" />
        <circle cx="93.22" cy="18.84" r="18.84" style="fill: #9acd00; stroke-width: 0px" />
        <circle cx="18.84" cy="70.41" r="18.84" style="fill: #c30e20; stroke-width: 0px" />
        <circle cx="100.16" cy="63.47" r="18.84" style="fill: #00376b; stroke-width: 0px" />
      </svg></div>

      <div class="dns-site-title-container">
        <div class="dns-site-title title">{{ w.site_title }}</div>
        <div class="dns-site-subtitle title">{{ w.site_subtitle }}</div>
      </div>
    </nuxt-link>
    <nav class="dns-main-navigation">
      <ul>
        <li>
          <nuxt-link to="/">{{ w.page_start }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/sammlungen">{{ w.page_collections }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/kontakt">{{ w.page_contact }}</nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="dns-navbar-controls">
      <button
        @click="toggleNav"
        :class="navState === 'open' ? 'burger open' : 'burger'"
        :aria-expanded="navState === 'open' ? true : false"
        aria-label="navigation menu"
      >
        <span class="burger__line burger__line-1" aria-hidden="true" focusable="false"></span>
        <span class="burger__line burger__line-2" aria-hidden="true" focusable="false"></span>
        <span class="burger__line burger__line-3" aria-hidden="true" focusable="false"></span>
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.dns-page-header {
  .dns-logo-container {
    margin: 0 1.5rem 0 .5rem;
  }
}
// DEV integrate with above

.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-bg);
  line-height: 1;
  // border-bottom: 1px solid var(--color-border);
  // box-shadow: 0 0 8px 0 rgba(0,0,0,0.8);
  box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.4);
  .dns-branding {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
    text-decoration: none;
    color: var(--color-text);
    .dns-navbar-logo {
      width: 76px;
      height: 76px;
      flex-grow: 1;
      flex-shrink: 0;
      box-sizing: content-box;
      // padding: 0.5rem 0 0.5rem 0.5rem;
      padding: 0.75rem 0 0.75rem 0.5rem;
      transition: height 0.25s, padding 0.25s;
    }
    .dns-site-title-container {
      margin-left: 0.5rem;
    }
    .dns-site-title {
      font-weight: 900;
      font-size: 2rem;
      // font-size: clamp(1rem, 3.3333vw, 2rem);
      font-size: clamp(1.25rem, 4.1667vw, 2rem);
      line-height: 1.125;
      transition: all 0.25s;
    }
    .dns-site-subtitle {
      font-weight: 400;
      font-size: 1.27rem;
      // font-size: clamp(1rem, 3.3333vw, 1.27rem);
      font-size: clamp(0.8rem, 2.6667vw, 1.27rem);
      line-height: 1.125;
      transition: all 0.25s;
    }
  }
  .dns-navbar-controls {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .dns-main-navigation {
    display: none;
    @media (min-width: 768px) {
      display: flex;
      align-items: center;
      ul {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        margin: 0;
        padding: 0;
        list-style: none;
        li {
          margin: 0;
          padding: 0;
          a {
            display: block;
            // padding: 0.5rem 1rem;
            // padding: 11px;
            padding: 1rem;
            text-decoration: none;
            color: var(--color-text);
            transition: all 0.25s;
            &:hover,
            &:focus,
            &:active,
            &.router-link-exact-active:hover,
            &.router-link-exact-active:focus,
            &.router-link-exact-active:active {
              color: var(--color-text-inv);
              // background-color: var(--color-link-bg);
              background-color: var(--color-nav-hover-bg);
            }
            &.router-link-exact-active,
            &.router-link-exact-active,
            &.router-link-exact-active {
              color: var(--color-text-inv);
              background-color: var(--color-nav-active-bg);
            }
          }
        }
      }
    }
  }
  &.shrink {
    .dns-branding {
      .dns-navbar-logo {
        // padding: 0.125rem 0 0.125rem 0.25rem;
        padding: 0.25rem 0 0.25rem 0.25rem;
        width: auto;
        // height: 2rem;
        height: 2.5rem;
      }
      .dns-site-title {
        font-size: 1.25rem;
        margin-left: 0.25rem;
      }
      .dns-site-subtitle {
        font-size: 0.8rem;
        margin-left: 0.25rem;
      }
    }
  }
  button.burger:not([disabled]):not([tabindex^="-"]):focus {
    outline: 0;
    background-color: var(--color-nav-hover-bg);
    color: #fff;
    .burger__line {
      background-color: #fff;
    }
  }
}
</style>

