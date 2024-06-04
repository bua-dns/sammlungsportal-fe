<script setup>
const props = defineProps({
  store: { 
    type: String
  }
});
const filterStore = useState(props.store);
const currentList = ref('list1')

function setCurrentList(list) {
  currentList.value = list
} 

const increment = () => {
  filterStore.value[currentList.value].push(`term${filterStore.value[currentList.value].length + 1}`)
}


</script>

<template>
  <button @click="increment">Increment</button>
  <button @click="setCurrentList('list1')">set list to 1</button>
  <button @click="setCurrentList('list2')">set list to 2</button>

</template>