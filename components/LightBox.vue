<script setup>

const props = defineProps(['images', 'startImage', 'imageBasePath']);
const emit = defineEmits(['close']);
const theme = useState('theme');
const w = theme.value.data.wording.de;
const numImages = ref(props.images.length);
const currentImage = ref(props.startImage || 0);
console.log('startImage', props.startImage);

// emit close on escape key
const closeLightbox = (e) => {
  if (e.key === "Escape") {
    emit('close');
  }
};
onMounted(() => {
  window.addEventListener('keydown', closeLightbox);
});
onUnmounted(() => {
  window.removeEventListener('keydown', closeLightbox);
});

</script>
<template>
  <div class="lightbox">
    <div class="lightbox-close" @click="$emit('close')">
      <svg class="icon" width="24" height="24" fill="currentColor">
        <use xlink:href="@/assets/img/bootstrap-icons.svg#x"></use>
      </svg>
    </div>
    <div class="lightbox-nav" v-if="numImages > 1">
      <div class="lightbox-prev" @click="currentImage = (currentImage - 1 + numImages) % numImages">
        <div class="icon-container">
          <svg class="icon" width="24" height="24" fill="currentColor">
            <use xlink:href="@/assets/img/bootstrap-icons.svg#chevron-left"></use>
          </svg>
        </div>
      </div>
      <div class="lightbox-next" @click="currentImage = (currentImage + 1) % numImages">
        <div class="icon-container">
          <svg class="icon" width="24" height="24" fill="currentColor">
            <use xlink:href="@/assets/img/bootstrap-icons.svg#chevron-right"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="lightbox-content">
      <img :src="imageBasePath + props.images[currentImage].directus_files_id.filename_disk" alt="lightbox image" />
    </div>
  </div>
</template>