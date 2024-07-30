<script setup>
const props = defineProps({
  disabled: Boolean,
});
const diSearch = useDISearchStore()

</script>

<template>
  <div class="search-box">
    <input type="text" v-model="diSearch.term" :disabled="disabled" placeholder="dargestelltes Objekt" >
  </div>
</template>

<style lang='scss' scoped>
.search-box {

  input {
    border: 1px solid var(--color-border);
    border-radius: 0.125rem;
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    height: 2.25rem;
  }

  input[type="text"] {
    width: 30rem;

    &::placeholder {
      color: var(--color-text);
      opacity: 0.2;
      text-transform: uppercase;
      font-size: 1.125rem;
    }
  }

}
</style>
