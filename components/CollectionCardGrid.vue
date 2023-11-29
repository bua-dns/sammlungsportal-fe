<script setup>
defineProps(['entry']);
defineEmits(['setActiveCollectionId']);
const theme = useState('theme');
const w = theme.value.data.wording.de;
</script>
<template>
  <div v-if="entry.display" @click="$emit('setActiveCollectionId', entry.id)" class="card">
    <div class="card-keeper" :style="getUniMarkerColors(entry.current_keeper, 'border-bottom-color')"
      v-if="entry.current_keeper">
      <span class="gws_uni_marker" :style="getUniMarkerColors(entry.current_keeper, 'background-color')"></span>
      {{ entry.current_keeper }}
    </div>
    <div class="card-label" v-if="entry.label">
      <strong>{{ entry.label }}</strong>
    </div>
    <div class="card-sm-description" v-if="entry.description"
      v-html="truncateText(convertLineBreaks(entry.description), 240)">
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
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}

.card-keeper {
  border-bottom: 2px solid #333;
  font-size: 0.85rem;
}

.card-label {
  padding: 1rem 0;
}

.card-sm-description {
  font-size: 0.75rem;
  color: #000;
}

a {
  word-wrap: break-word;
}
</style>