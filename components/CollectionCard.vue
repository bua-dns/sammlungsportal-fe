<script setup>
  defineProps(['entry']);
  const theme = useState('theme');
  const w = theme.value.data.wording.de;
  function getUniMarkerStyles(color) {
    return typeof color !== "undefined"
      ? "background-color: " + color + ";"
      : "";
  }
  function getUniMarkerColors(current_keeper) {
    const status = theme.value.data.names.keepers.find((keeper) => keeper.name == current_keeper);
    theme.value.data.settings.ciColors[status.id];
    return getUniMarkerStyles(theme.value.data.settings.ciColors[status.id]);
  }

  function stripEntry(entry) {
    // strip '["' and '"]' from entry
    return entry.replace(/(\["|"\])/g, "");
  }

</script>
<template>
  <dl class="card">
    <template v-if="entry.label">
      <dt>{{ w.label }}</dt>
      <dd class="label">{{ entry.label }}</dd>
    </template>
    <template v-if="entry.current_keeper">
      <dt>{{ w.current_keeper }}</dt>
      <dd>
        <span class="gws_uni_marker" :style="getUniMarkerColors(entry.current_keeper)"></span>
        {{ entry.current_keeper }}</dd>
    </template>
    <template v-if="entry.description">
      <dt>{{ w.description }}</dt>
      <dd v-html="convertLineBreaks(entry.description)"></dd>
    </template>
    <template v-if="entry.phone">
      <dt>{{ w.phone }}</dt>
      <dd>
        <a :href="'tel:' + stripEntry(entry.phone)">{{ stripEntry(entry.phone) }}</a>
      </dd>
    </template>
    <template v-if="entry.email">
      <dt>{{ w.email }}</dt>
      <dd><a :href="'mailto:' + stripEntry(entry.email)">{{ stripEntry(entry.email) }}</a></dd>
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
    <template v-if="entry.role && entry.role.length > 0">
      <dt>{{ w.role }}</dt>
      <dd v-for="role in entry.role" :key="'role_' + entry.id + '_' + role.id">{{ role.label }}</dd>
    </template>
    <template v-if="entry.subject && entry.subject.length > 0">
      <dt>{{ w.subject }}</dt>
      <dd v-for="subject in entry.subject" :key="'subject_' + entry.id + '_' + subject.id">{{ subject.label }}</dd>
    </template>
    <template v-if="entry.genre && entry.genre.length > 0">
      <dt>{{ w.genre }}</dt>
      <dd v-for="genre in entry.genre" :key="'genre_' + entry.id + '_' + genre.id">{{ genre.label }}</dd>
    </template>
    <template v-if="entry.used_in_activity && entry.used_in_activity.length > 0">
      <dt>{{ w.used_in_activity }}</dt>
      <dd v-for="used_in_activity in entry.used_in_activity" :key="'used_in_activity_' + entry.id + '_' + used_in_activity.id">{{ used_in_activity.label }}</dd>
    </template>
    <template v-if="entry.academic_teaching && entry.academic_teaching.length > 0">
      <dt>{{ w.academic_teaching }}</dt>
      <dd v-for="(academic_teaching, idx) in entry.academic_teaching" :key="'academic_teaching_' + entry.id + '_' + idx">{{ academic_teaching.label }}</dd>
    </template>
    <template v-if="entry.special_form && entry.special_form.length > 0">
      <dt>{{ w.special_form }}</dt>
      <dd v-for="special_form in entry.special_form" :key="'special_form_' + entry.id + '_' + special_form.id">{{ special_form.label }}</dd>
    </template>
    <template v-if="entry.living_being && entry.living_being.length > 0">
      <dt>{{ w.living_being }}</dt>
      <dd v-for="living_being in entry.living_being" :key="'living_being_' + entry.id + '_' + living_being.id">{{ living_being.label }}</dd>
    </template>
  </dl>
</template>
<style scoped lang="scss">
  .card {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    opacity: 0.85;
  }
  dt, dd {
  overflow-wrap: break-word;
  hyphens: auto;
  }
  .label {
    font-weight: bold;
  }
  a {
    word-wrap: break-word;
  }
  .gws_uni_marker {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: text-bottom;
    margin-right: .25rem;
    border-radius: 100%;
  }
</style>