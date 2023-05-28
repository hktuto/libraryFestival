<script setup lang="ts">
  const { t } = useLang({
    menuEN: "Menu",
    menuHK: "選單",
    menuCN: "选单"
  })
</script>

<template>
  <div class="menu">
     <div class="menuToggleContainer">
       <Icon name="material-symbols:menu" />
       <div class="label">{{ t('menu') }}</div>
     </div>
      <MenuItems />
  </div>
</template>

<style scoped lang="scss">
.menu{
  
  
}
.menuToggleContainer{
  font-size: 24px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  .label{
    font-size: 18px;
  }
}
.menuItemsContainer{
  display: none;
}
</style>