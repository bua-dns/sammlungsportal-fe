<script setup>
/* Used auto-imported composables: projectConfig */

const props = defineProps({

  image : {
    type: String,
  },

});

</script>

<template>
  <div class="c_info-badge">
    <div class="badge" @click="toggleShowInfo()">
      <NuxtLink to="/images">
        <img src="~/assets/img/icons/Background-Image-Info.svg" alt="go to page with info about background images">
      </NuxtLink>
    </div>
  </div>
  
</template>

<style lang='scss'>
.c_info-badge {
  position: fixed;
  bottom: 20rem;
  padding: .25rem;
  z-index: 1000;
  .badge {
    cursor: pointer;
    img {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
}
@media screen and (max-width: 1400px){
  .c_info-badge {
    display: none;
  }
}
</style>