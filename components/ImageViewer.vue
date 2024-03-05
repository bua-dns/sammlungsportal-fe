<script setup>
/* Used auto-imported composables: projectConfig */

const props = defineProps({
  // expects directus download filenames with extension
  images: Array,
  startImage: Number,
  previewImage: Number,
  previewMode: String, // 'gallery' or 'single'
  previewImageWidth: Number,
});
const emit = defineEmits(['close']);
const theme = useState('theme');
const w = theme.value.data.wording.de;
const numImages = ref(props.images.length);
const currentImage = ref(props.startImage || 0);

function getPreview() {
  if(
    props.images.length > 0 &&
    props.previewImage !== undefined &&
    props.previewMode === 'single'
  ) {
    return images[previewImage]
  }
  return props.images[0];
}

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
  <template v-if="props.previewMode === 'single' || !props.previewMode">
    <img @click="showLightbox = true" 
      :src="`${projectConfig.imageBaseUrl}/${getPreview()}?key=preview-image`" 
      alt=""
    >
  </template>
  <template v-if="props.previewMode === 'gallery'">
    <div class="previews-gallery">
      <img v-for="(image, index) in props.images" 
        :key="index" 
        :src="`${projectConfig.imageBaseUrl}/${image}?key=preview-image`" 
        alt=""
      >
    </div>

  </template>
  <!-- <div class="lightbox">
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
  </div> -->
</template>

<style lang='scss'>
.previews-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 80px));
  gap: .5rem;
  img {
    display: block;
    width: 100%;
  }
}

</style>