<script setup lang="ts">
import {mobileHelper} from "~/composables/mobile";

const { isMobile } = mobileHelper()
</script>

<template>
  <div :class="{headerContainer:true, innerGrid:true, isMobile}">
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
  overflow: visible;
  z-index: 2;
  margin-bottom: 24px;
  &.isMobile{
    position: fixed;
    bottom: 0;
    left:0;
    grid-template-areas: 'menu menu menu menu';
    width: 100%;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;
    z-index: 2;
    .headerLeft{
      border-radius: 0;
    }
  }
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