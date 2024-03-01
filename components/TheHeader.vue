<template>
  <header class="navbar fixed-top">
    <nuxt-link to="/" class="navbar__brand" v-if="true">
      <svg
        id="Ebene_1"
        data-name="Ebene 1"
        xmlns="http://www.w3.org/2000/svg"
        width="119"
        height="89.25"
        viewBox="0 0 119 89.25"
        class="navbar__logo"
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
      </svg>
      <div class="navbar__title_container">
        <div class="navbar__title title">{{ w.site_title }}</div>
        <div class="navbar__subtitle title">{{ w.site_subtitle }}</div>
      </div>
    </nuxt-link>
    <nav class="navbar__links">
      <ul>
        <li>
          <nuxt-link to="/">{{ w.page_start }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/sammlungen?current_keeper=bua">{{ w.page_collections }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/kontakt">{{ w.page_contact }}</nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="navbar__controls">
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
