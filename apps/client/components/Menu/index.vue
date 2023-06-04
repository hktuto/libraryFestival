<script setup lang="ts">
  import {onClickOutside} from "@vueuse/core";
  const menuPopoverEl = ref()
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
     <div class="menuToggleContainer" @click.prevent="toggleMenu">
       <Icon :name="popupOpened ?  'material-symbols:close' : 'material-symbols:menu'" />
       <div class="label">{{ t('menu') }}</div>
     </div>
      <div :class="{menuPopOver:true, opened:popupOpened, bgGradient:true}">
        <div class="menuScrollContainer">
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
  
  .label{
    font-size: 1.4rem;
  }
  
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
  .menuScrollContainer{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  &.opened{
    opacity: 1;
    transform: translate(0);
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