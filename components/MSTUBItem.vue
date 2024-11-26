<script setup>

const props = defineProps({
  sample: { 
    type: Object
  }
});

</script>

<template>
  <div class="ikb-item">
    <LightBoxMstubItem :image="sample.image" />
    <div class="basic-info">
    </div>
  </div>
</template>

<style scoped lang="scss">
  .ikb-item {
    width: 220px;
    margin: 10px;
    .basic-info {
      font-size: 0.8rem;
      .ikb-link {
        margin: 0.75rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.125rem 0.25rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        &:hover {
          background-color: #f0f0f0;
          text-decoration: none;
        }
        img {
          display: block;
          height: 1.125rem;
        }
      }
      .ikb-info {
        
      }
    } 
  }
</style>