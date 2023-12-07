<script setup>
const theme = useState('theme');
const w = theme.value.data.wording.de;
const homepage = ref({});
await useFetch('https://sammlungsportal.bua-dns.de/items/homepage', {
  onResponse({ request, response, options }) {
    homepage.value = response._data.data;
  },
});
// useHead({ title: homepage.value.title });
</script>
<template>
  <Head>
    <Title>{{ w.page_start }}</Title>
  </Head>
  <div class="page">
    <h1 class="text-center">{{ homepage.title }}</h1>
    <div class="intro" v-html="homepage.intro"></div>
    <!-- <div class="test">
      <h1>This is h1</h1>
      <h2>This is h2</h2>
      <h3>This is h3</h3>
      <h4>This is h4</h4>
      <h5>This is h5</h5>
      <p>This is p</p>
      <div class="small">This is small</div>
      <div class="small-xs">This is small</div>
      <ul>
        <li>This is li</li>
        <li>This is li</li>
      </ul>
      <ol>
        <li>This is ol</li>
        <li>This is ol</li>
      </ol>
      <div class="text-center">
        <button class="btn btn-primary">This is button</button>
      </div>
    </div> -->
  </div>
</template>