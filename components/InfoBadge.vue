<script setup>
/* Used auto-imported composables: projectConfig */

const props = defineProps({

  icon: {
    type: String,
  },
  iconClose: {
    type: String,
  },
  content: {
    type: String,
  },

});

const showInfo = ref(false);

function closeInfoByKey(event) {
  if (event.key === 'Escape') {
    showInfo.value = false;
  }
}

function toggleShowInfo() {
  showInfo.value = !showInfo.value;
}

onMounted(() => {
  window.addEventListener('keydown', closeInfoByKey);
});
onUnmounted(() => {
  window.removeEventListener('keydown', closeInfoByKey);
});


</script>

<template>
  <div class="c_info-badge">
    <div class="badge" @click="toggleShowInfo()">
      <template v-if="!showInfo">
        <img src="~/assets/img/icons/Background-Image-Info.svg" alt="show and hide info about background image">
      </template>
      <template v-if="showInfo">
        <img src="~/assets/img/icons/Background-Image-Info-Close.svg" alt="show and hide info about background image">
      </template>
    </div>
    <div class="info" :class="{ 'show': showInfo }">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus quo consequatur ratione expedita animi a rerum cumque nisi, reiciendis recusandae molestiae aliquid nihil odit mollitia consectetur quia eos atque repellendus!
    </div>

  </div>
  
</template>

<style lang='scss'>
.c_info-badge {
  position: fixed;
  top: 200px;
  padding: .25rem;
  z-index: 1000;
  .badge {
    cursor: pointer;
    img {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  .info {
    max-width: 20rem;
    background-color: hsla(0, 0%, 10%, .85);
    color: var(--color-text-inv);
    border-radius: .4rem;
    padding: .75rem;
    font-size: .85rem;
    transition: transform 0.5s ease-out, top 0.25s;
    transform: translateX(-105%);
    &.show {
      transform: translateX(0);
    }
  } 
}
@media screen and (max-width: 576px){
  .c_info-badge {
    display: none;
  }
}
</style>