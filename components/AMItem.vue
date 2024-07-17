<script setup>

const props = defineProps({
  item: { 
    type: Object
  }
});

</script>

<template>
  <div class="ikb-item">
    <LightBoxAMItem :image="item.representation" />
    <div class="basic-info">
      <a :href="item.am_ref" class="ikb-link"
        target="_blank">
        <!-- <img src="@/assets/img/ikb-logo.png" alt="IKB Logo"> -->
        <span>Objekt in der AM-Datenbank</span>
      </a>
      <div class="ikb-info">
        {{ truncateText(convertLineBreaks(item.dns_title), 80) }}
      </div>
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