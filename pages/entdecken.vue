<template>
  <div class="page">
    <h1 class="text-center">{{ w.page_discover }}</h1>
  </div>
</template>
<script setup>
  const theme = useState('theme');
  const w = theme.value.data.wording.de;
</script>