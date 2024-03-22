<script setup>
const navState = useState("nav", () => "close");
const toggleNav = () => {
  navState.value = navState.value === "close" ? "open" : "close";
};

</script>

<template>
  <div class="hamburger-container">
    <div class="hamburger">
      <button
        @click="toggleNav"
        :class="navState === 'open' ? 'hamburger open' : 'hamburger'"
        :aria-expanded="navState === 'open' ? true : false"
        aria-label="navigation menu"
      >
        <span class="hamburger__line hamburger__line-1" aria-hidden="true" focusable="false"></span>
        <span class="hamburger__line hamburger__line-2" aria-hidden="true" focusable="false"></span>
        <span class="hamburger__line hamburger__line-3" aria-hidden="true" focusable="false"></span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hamburger {
  display: block;
  // padding: 9.5px;
  // padding: 0.5rem;
  padding: 0.8125rem;
  // width: 42px;
  width: 48px;
  font-size: xx-small;
  line-height: 0.1;
  background-color: transparent;
  border: none;
  cursor: pointer;
  opacity: 0;
  animation-delay: 500ms;
  animation: BURGER_FADE_IN 1s linear forwards;
  .hamburger__line {
    display: block;
    margin: 4px 0;
    height: 2px;
    width: 100%;
    background-color: var(--color-text);
    border-radius: 2px;
    transition: all 0.25s linear;
  }
  &.open {
    > .hamburger__line-1 {
      transform: translateY(6px) rotateZ(45deg);
    }
    > .hamburger__line-2 {
      transform: translateX(11.5px);
      opacity: 0;
      width: 0;
    }
    > .hamburger__line-3 {
      transform: translateY(-6px) rotateZ(-45deg);
    }
  }
}

@keyframes BURGER_FADE_IN {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  40% {
    transform: translateX(0);
  }
  100% {
    opacity: 1;
  }
}
button.hamburger:not([disabled]):not([tabindex^="-"]):focus {
    outline: 0;
    background-color: var(--color-navigation-hover-background);
    color: #fff;
    .hamburger__line {
      background-color: #fff;
    }
  }
</style>