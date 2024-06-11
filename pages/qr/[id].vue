<script setup>
const route = useRoute();
const id = ref(route.params.id);
await navigateTo(`/?utm_source=qr-${id.value}`)
</script>

<template>
  <div>
    <h1>QR</h1>
  </div>  
</template>