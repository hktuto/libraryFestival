<script setup lang="ts">
const menu = useState('menuData', () => ([]));
</script>

<template>
  <div class="menuContainer">
      <div class="menuItem" v-for="item in menu" :key="item.name">
        {{name}}
      </div>
  </div>
</template>

<style scoped lang="scss">

</style>