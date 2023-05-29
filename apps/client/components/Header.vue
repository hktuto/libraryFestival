<script setup lang="ts">

</script>

<template>
  <div class="headerContainer innerGrid">
    <div class="headerLeft bgGradient">
      
      <Menu ></Menu>
      <Search ></Search>
      <Language />
      <div class="headerBg bgGradient"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.headerContainer{
  display: grid;
  grid-template-areas: 'menu menu menu empty';
  margin-top: 40px;
  overflow: visible;
  .headerLeft {
    position: relative;
    grid-area: menu;
    min-height: 60px;
    border-radius: 30px;
    display: grid;
    grid-template-columns: 1fr min-content min-content;
    justify-content: flex-start;
    align-items: center;
    padding-inline: calc(var(--app-padding) * 2 );
    gap: var(--app-padding);
    overflow: visible;
    border: 1px solid #fff;
  }
}
.headerBg{
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: -1;
  opacity: 0.8;
  transform: translate(0px, 5px);
}
</style>