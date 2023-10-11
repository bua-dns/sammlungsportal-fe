<script setup>
  defineProps(['entry']);
  const theme = useState('theme');
  const w = theme.value.data.wording.de;
  function getUniMarkerStyles(color, type) {
    return typeof color !== "undefined"
      ? type + ": " + color + ";"
      : "";
  }
  function getUniMarkerColors(current_keeper, type) {
    const status = theme.value.data.names.keepers.find((keeper) => keeper.name == current_keeper);
    theme.value.data.settings.ciColors[status.id];
    return getUniMarkerStyles(theme.value.data.settings.ciColors[status.id], type);
  }
  function convertLineBreaks(text) {
    return text.replace(/\n/g, "<br>");
  }
  function truncateText(text, length) {
    // truncate text to a specified length taking word boundaries into account
    return text.length > length ? text.substring(0, text.lastIndexOf(" ", length)) + " ..." : text;
  }
</script>
<template>
  <div class="card">
    <div class="card-sm-keeper" :style="getUniMarkerColors(entry.current_keeper, 'border-bottom-color')" v-if="entry.current_keeper">
      <span class="gws_uni_marker" :style="getUniMarkerColors(entry.current_keeper, 'background-color')"></span>
        {{ entry.current_keeper }}
    </div>
    <div class="card-sm-label" v-if="entry.label">
      <strong>{{ entry.label }}</strong>
    </div>
    <div class="card-sm-description" v-if="entry.description" v-html="truncateText(convertLineBreaks(entry.description), 240)">
    </div>
  </div>
</template>
<style scoped lang="scss">
  .card {
    padding: 1rem;
    border: 1px solid #333;
    border-radius: 8px;
    background-color: #fff;
    opacity: 0.85;
    &:hover {
      opacity: 1;
    }
  }
  .card-sm-keeper {
    border-bottom: 2px solid #333;
    font-size: 0.85rem;
  }
  .card-sm-label {
    padding: 1rem 0;
  }
  .card-sm-description {
    font-size: 0.75rem;
    color: #000;
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
    border-radius: 0;
  }
</style>