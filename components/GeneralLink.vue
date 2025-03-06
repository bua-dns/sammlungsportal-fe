<script setup>
const props = defineProps({
  'link': {
    type: String,
  },
  'cssClass': {
    type: String,
  },
});

</script>

<template>
  <template v-if="link.includes('http')">
    <a :href="link" target="_blank" rel="noopener noreferrer" alt="External link" :class="cssClass">
      <slot />
    </a>
  </template>
  <template v-if="!link.includes('http')">
    <NuxtLink :to="link" target="_self" rel="noopener noreferrer" alt="External link" :class="cssClass">
      <slot />
    </NuxtLink>
  </template>
</template>