<script setup>

const props = defineProps({
  item: { 
    type: Object
  }
});

</script>

<template>
  <div class="ikb-item">
    <LightBoxIkbItem :objectId="item.mr_ref" />
    <div class="basic-info">
      <a :href="`https://rs.cms.hu-berlin.de/ikb_mediathek/pages/view.php?ref=${item.mr_ref}`" class="ikb-link"
        target="_blank">
        <img src="@/assets/img/ikb-logo.png" alt="IKB Logo">
        <span>Objekt in der IKB-Datenbank</span>
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