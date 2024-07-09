<script setup>

const props = defineProps({
  item: { 
    type: Object
  }
});

</script>

<template>
  <div class="ikb-item">
    <img
      :src="`https://rs.cms.hu-berlin.de/ikb_mediathek/pages/download.php?ref=${item.mr_ref}&size=pre&ext=jpg&page=1&alternative=-1&k=&noattach=true`"
      alt="" loading="lazy">
    <div class="basic-info">


      <a :href="`https://rs.cms.hu-berlin.de/ikb_mediathek/pages/view.php?ref=${item.mr_ref}`"
        target="_blank">Lehrbild in der IKB-Datenbank</a>
      <br>{{ item.dns_title }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  .ikb-item {
    width: 220px;
    margin: 10px;
    img {
      width: 100%;
    }
    .basic-info {
      font-size: 0.8rem;
    } 
  }
</style>