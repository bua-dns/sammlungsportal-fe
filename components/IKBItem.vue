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
      <div class="ikb-link">
        <a :href="`https://rs.cms.hu-berlin.de/ikb_mediathek/pages/view.php?ref=${item.mr_ref}`" target="_blank">Lehrbild
        in der IKB-Datenbank</a>
      </div>
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
        margin-bottom: .25rem;
        a {
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .ikb-info {
        
      }
    } 
  }
</style>