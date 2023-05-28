<template>
  <div :style="`--mouse-x:${x}px;--mouse-y:${y}px;--g-angle:${mAngle}deg`">
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>

import { useMouse } from '@vueuse/core'
const { x, y, sourceType } = useMouse()
const mAngle = computed(() => {
  if(!window.innerHeight) return 45;
  const w = window.innerWidth /2 ;
  const h = window.innerHeight / 2;
  const deltaX = w - x.value;
  const deltaY = h - y.value;
  const rad = Math.atan2(deltaY, deltaX);
  return Math.round(rad * (180 / Math.PI))
})
</script>
