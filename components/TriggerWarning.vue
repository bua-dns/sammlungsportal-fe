<script setup>

const props = defineProps({
  
});

const showTriggerWarning = useState('showTriggerWaring');
const { data: collectionInfoThemeData } = await useFetch(`${projectConfig.colonialContextsUrl}/theme_content`, {
  query: {
    fields: '*.*',
    limit: -1,
  }
});
const collectionInfoTheme = collectionInfoThemeData.value.data

function closeTriggerWarning() {
  showTriggerWarning.value = false;
}
</script>

<template>
  <Teleport to="body">
    <div v-if="showTriggerWarning" class="lightbox trigger-warning-lightbox" >
      <div class="lightbox-close" @click="closeTriggerWarning()">
        <!-- <svg class="icon" width="24" height="24" fill="currentColor">
          <use xlink:href="@/assets/img/bootstrap-icons.svg#x"></use>
        </svg> -->
      </div>
      <div class="lightbox-content" style="color: white;">
        <div class="trigger-warning" v-html="collectionInfoTheme.trigger_warning_level_1" />
        <button @click="closeTriggerWarning()">Inhalte dennoch anzeigen</button>
      </div>
    </div>  
  </Teleport>
</template>

<style lang='scss'>
.trigger-warning-lightbox {
  background-color: hsl(0, 0%, 0%, 0.95);
  .lightbox-content {
    display: flex;
    flex-direction: column;
    .trigger-warning {
      max-width: 70rem;
    }
    button {
      margin-top: 1rem;
    }
  }
}
</style>