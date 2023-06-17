<script setup lang="ts">
  const opened = ref(false);
  

</script>

<template>
  <div class="searchContainer">
    <Icon name="material-symbols:search" @click="$router.push({path:'/schedule'})"/>
  </div>
</template>

<style scoped lang="scss">
.searchContainer{
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
}
</style>