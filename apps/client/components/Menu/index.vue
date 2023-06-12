<script setup lang="ts">
  import {onClickOutside} from "@vueuse/core";
  import {mobileHelper} from "~/composables/mobile";
  const menuPopoverEl = ref()
  const { isMobile } = mobileHelper()
  const { t } = useLang({
    menuEN: "Menu",
    menuHK: "選單",
    menuCN: "选单"
  })
  const popupOpened = ref(false)
  function toggleMenu() {
    console.log("toggleMenu", popupOpened.value)
    popupOpened.value = !popupOpened.value
  }
  onClickOutside(menuPopoverEl, (event) => popupOpened.value = false)
</script>

<template>
  <div ref="menuPopoverEl" class="menu">
     <div :class="{menuToggleContainer:true, isMobile, opened:popupOpened}" @click.prevent="toggleMenu">
        <slot name="afterIcon" />
      
       
       <Icon :name="popupOpened ?  'material-symbols:close' : 'material-symbols:menu'" />
       <div class="label">{{ t('menu') }}</div>
     </div>
      <div :class="{menuPopOver:true, opened:popupOpened, bgGradient:true, isMobile}">
        <div :class="{menuScrollContainer:true, isMobile}">
          <MenuItems />
        </div>
       
      </div>
  </div>
</template>

<style scoped lang="scss">
.menu{
  z-index: 2;
}
.menuToggleContainer{
  font-size: 24px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  z-index: -1;
  &.isMobile.opened{
    position: fixed;
    left: 24px;
    top: 24px;
    z-index: 4;
  }
  .label{
    font-size: 1.2rem;
  }
  
}
.moreRow{
   width: 100%;
  display: flex;
  flex-flow: row nowrap;
  gap: var(--app-padding);
}
.menuItemsContainer{
  display: none;
}
.menuPopOver{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  max-height: 100vh;
  overflow: visible;
  transition: all .5s ease-in-out;
  transform: translateY(-100vh);
  z-index: -1;
  opacity: 0;
  border-radius: 30px;
  border: 1px solid #fff;
  padding: 60px calc(var(--app-padding) * 2) calc(var(--app-padding) * 2) calc(var(--app-padding) * 2);
  &.isMobile{
    border-radius: 0px;
    position: fixed;
    width: 100vw;
    height: 100vh;
    border:none;
    display: flex;
    flex-flow: column nowrap;
    
  }
  .menuScrollContainer{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  &.opened{
    opacity: 1;
    transform: translate(0);
    
    &.isMobile {
      z-index: 3;
    }
  }
}

.headerBg{
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: -1;
  opacity: 1;
  border-radius: 30px;
  top: 0;
  left:0;
  transform: translate(0px, 5px);
}
</style>