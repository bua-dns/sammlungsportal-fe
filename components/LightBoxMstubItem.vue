<script setup>
const props = defineProps({
  image: { 
    type: String
  }
});
const emit = defineEmits(['close']);
const theme = useState('theme');
const w = theme.value.data.wording.de;

function openLightbox(index) {
  showLightbox.value = true;
}
const showLightbox = ref(false);

// close lightbox on escape key
const closeLightbox = (e) => {
  if (e.key === "Escape") {
    showLightbox.value = false;
  }
};
onMounted(() => {
  window.addEventListener('keydown', closeLightbox);
});
onUnmounted(() => {
  window.removeEventListener('keydown', closeLightbox);
});

// construct image url from dynamic and static, project-specific parts
// size: 'preview' or 'full' for lightbox
function composeImageUrl(size) {
  let url = '';
  if (size === 'preview') url = `https://mstub-db.bua-dns.de/assets/${props.image}`;
  if (size === 'full') url = `https://mstub-db.bua-dns.de/assets/${props.image}`;
  return url;
}

</script>

<template>
  <div class="ikb-image-viewer">
    <div class="preview-single">
      <img @click="openLightbox()" :src="composeImageUrl('preview')" alt="">
    </div>
    <Teleport to="body">
      <div v-if="showLightbox" class="lightbox">
        <div class="lightbox-close" @click="showLightbox = false">
          <svg class="icon" width="24" height="24" fill="currentColor">
            <use xlink:href="@/assets/img/bootstrap-icons.svg#x"></use>
          </svg>
        </div>
        <div class="lightbox-content" style="color: white;">
          <img :src="composeImageUrl('full')">
        </div>
      </div>
    </Teleport>
  </div>

</template>

<style lang='scss'>
.ikb-image-viewer {

  // general behavior of img elements
  img {
    display: block;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }

  // previewMode: single
  .preview-single {
    img {
      width: 100%;
    }
  }
}
</style>