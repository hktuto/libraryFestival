<script setup lang="ts">

import {useMenu} from "~/composables/menu";
import { vOnClickOutside } from '@vueuse/components'
const { menu, itemClicked, isCurrentRoute } = useMenu()
const {tObj} = useLang({})

</script>

<template>
  <div class="fullWidthMenuContainer" :style="`--count:${menu.length + 1 }`">
    <template v-for="item in menu" :key="item.url" >
      <div class="hr"></div>
      <div :class="{menuItem:true, pointer: item.url, hasChildren: item.children.length > 0, opened: item.opened, current:isCurrentRoute(item)}"  @click="itemClicked(item)">
        
      {{ tObj('label', item) }}
      <!--        loop children -->
      <div :class="{childrenContainer: true, opened: item.opened}" v-on-click-outside="() => item.opened = false">
        <div v-for="child in item.children" class="childMenuItem child" @click="itemClicked(child)">
          {{ tObj('label', child)}}
        </div>
      </div>
    </div>
      </template>
  </div>
</template>

<style scoped lang="scss">
.fullWidthMenuContainer{
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  gap: var(--app-padding);
  justify-content: flex-start;
  align-items: stretch;
  padding: calc( var(--app-padding) / 2);
}
.menuItem{
  font-size: .8rem;
  font-weight: 700;
  line-height: 1;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  overflow: visible;
  position: relative;
  &:hover, &.focus {
    background: var(--primary-color);
    color: #fff;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }
  &.current {
    color: var(--primary-color);
    background: transparent;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }
}
.hr{
  width: 1px;
  background: black;
}
.childrenContainer{
  position: absolute;
  background: var(--primary-color);
  color: #fff;
  top: 120%;
  left: -10%;
  border-radius: 4px;
  transform: translateY(-100vh);
  transition: all .2s ease-in-out;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--app-padding);
  overflow: hidden;
  &.opened {
    transform: translateY(0);
  }
  .childMenuItem{
    padding: var(--app-padding);
    color: #fff;
    transition: all .2s ease-in-out;
    white-space: nowrap;
    &:hover, &.focus {
      background: var(--primary-color-light);
      color: #000;
    }
  }
}
</style>