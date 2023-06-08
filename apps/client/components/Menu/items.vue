<script setup lang="ts">
import {useMenu} from "~/composables/menu";

const { menu, itemClicked, isCurrentRoute } = useMenu()

const {tObj} = useLang({})





</script>

<template>
  <div class="menuContainer">
      <div v-for="item in menu" :key="item.url" :class="{menuItem:true, pointer: item.url, hasChildren: item.children.length > 0, opened: item.opened, current:isCurrentRoute(item)}" @click="itemClicked(item)">
        <Icon :name="item.opened ? 'material-symbols:keyboard-arrow-down-rounded' : 'ic:outline-keyboard-arrow-right'"/>{{ tObj('label', item) }} 
<!--        loop children -->
        <div :class="{childrenContainer: true, opened: item.opened}" > 
          <div v-for="child in item.children" class="menuItem child" @click="itemClicked(child)">
            {{ tObj('label', child)}}
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped lang="scss">

.menuItem{
  font-size: 1.5rem;
  padding-block: calc(var(--app-padding) / 4);
  cursor: pointer;
  
  &.current{
    font-weight: 700;
  }
  &.child{
    padding-left: 1.5rem;
    font-size: 1.2rem;
  }
}
.childrenContainer{
  display:none;
  &.opened{
    display: block;
  }
}
</style>