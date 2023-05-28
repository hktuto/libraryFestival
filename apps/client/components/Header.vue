<script setup lang="ts">

</script>

<template>
  <div class="headerContainer innerGrid">
    <div class="headerLeft bgGradient">
      
      <Menu ></Menu>
      <Search ></Search>
      <Language />
    </div>
  </div>
</template>

<style scoped lang="scss">
.headerContainer{
  display: grid;
  grid-template-areas: 'menu menu menu empty';
  margin-top: 40px;
  .headerLeft {
    grid-area: menu;
    min-height: 60px;
    border-radius: 30px;
    display: grid;
    grid-template-columns: 1fr min-content min-content;
    justify-content: flex-start;
    align-items: center;
    padding-inline: var(--app-padding);
    gap: var(--app-padding);
  }
}
</style>