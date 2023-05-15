<script setup>
  defineProps(['entry']);
  const theme = useState('theme');
  const w = theme.value.data.wording.de;
</script>
<template>
  <dl class="card">
    <template v-if="entry.label">
      <dt>{{ w.label }}</dt>
      <dd class="label">{{ entry.label }}</dd>
    </template>
    <template v-if="entry.current_keeper">
      <dt>{{ w.current_keeper }}</dt>
      <dd>{{ entry.current_keeper }}</dd>
    </template>
    <template v-if="entry.description">
      <dt>{{ w.description }}</dt>
      <dd v-html="convertLineBreaks(entry.description)"></dd>
    </template>
    <template v-if="entry.phone">
      <dt>{{ w.phone }}</dt>
      <dd>{{ entry.phone }}</dd>
    </template>
    <template v-if="entry.email">
      <dt>{{ w.email }}</dt>
      <dd>{{ entry.email }}</dd>
    </template>
    <template v-if="entry.homepage">
      <dt>{{ w.homepage }}</dt>
      <dd><a :href="entry.homepage" target="_blank" rel="noopener">{{ entry.homepage }}</a></dd>
    </template>
    <template v-if="entry.address && entry.address.length > 0">
      <dt>{{ w.address }}</dt>
      <dd v-for="(address, idx) in entry.address" :key="'address_' + entry.id + '_' + idx">
        <span v-html="convertLineBreaks(address.address_data)"></span><br>
        {{ address.postal_code }} {{ address.city }}
      </dd>
    </template>
    <template v-if="entry.opening_hours">
      <dt>{{ w.opening_hours }}</dt>
      <dd v-html="convertLineBreaks(entry.opening_hours)"></dd>
    </template>
    <template v-if="entry.collection_portal && entry.collection_portal.length > 0">
      <dt>{{ w.collection_portal }}</dt>
      <dd v-for="(portal, idx) in entry.collection_portal" :key="'portal_' + entry.id + '_' + idx">
        <a :href="portal.url" target="_blank" rel="noopener">{{ portal.name }}</a>
      </dd>
    </template>
  </dl>
</template>
<style scoped lang="scss">
  .card {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .label {
    font-weight: bold;
  }
  a {
    word-wrap: break-word;
  }
</style>