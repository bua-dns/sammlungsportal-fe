<script setup>
const props = defineProps(['images']);
defineEmits(['close']);
const theme = useState('theme');
const w = theme.value.data.wording.de;
</script>
<template>
  <div class="lightbox" @click="$emit('close')">
    <div class="lightbox-content">
      <div class="lightbox-close" @click="$emit('close')">
        <svg class="icon-inline" width="24" height="24" fill="currentColor">
          <use xlink:href="@/assets/img/bootstrap-icons.svg#x"></use>
        </svg>
      </div>
      <div class="lightbox-images">
        <img v-for="(image, idx) in images" :key="idx"
          :src="'https://sammlungsportal.bua-dns.de/assets/' + image.directus_files_id.filename_disk + '?key=240x240'"
          :alt="w.image" />
      </div>
    </div>
  </div>
</template>