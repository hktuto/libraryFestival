<script setup lang="ts">
  const opened = ref(false);
  
  function openDialog(){
    opened.value = true;
  }
  
  function closeDialog() {
    opened.value = false;
  }
</script>

<template>
  <div class="searchContainer">
    <Icon name="material-symbols:search" @click="openDialog"/>
    
  </div>
</template>

<style scoped lang="scss">
.searchContainer{
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
}
</style>