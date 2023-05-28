<script setup lang="ts">
import { register } from 'swiper/element/bundle';

register();

const spaceBetween = 10;
const onProgress = (e) => {
  const [swiper, progress] = e.detail;
  console.log(progress)
};

const onSlideChange = (e) => {
  console.log('slide changed')
}
</script>

<template>
  <div class="sliderContainer innerGrid">
    
    <swiper-container
        :slides-per-view="1"
        :space-between="spaceBetween"
        :centered-slides="true"
        :loop="true"
        :pagination="false"
        @progress="onProgress"
        @slidechange="onSlideChange"
    >
      <swiper-slide v-for="i in [1,2,3,4,5]" :key="i" class="slide">
          {{i}}
      </swiper-slide>
      
    </swiper-container>
  </div>
</template>

<style scoped lang="scss">
.slide{
  aspect-ratio: 16/9;
  
}
</style>