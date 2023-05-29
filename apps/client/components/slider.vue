<script setup lang="ts">
import { register } from 'swiper/element/bundle';

register();
const {public:{strapi:{url}}} = useRuntimeConfig();
const props = defineProps<{
  slides: any[]
}>();

const spaceBetween = 10;

function slideClickHandler(item:any) {
  console.log(item)
}
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
        :autoplay="{
          delay: 3000
        }"
        :pagination="false"
        @progress="onProgress"
        @slidechange="onSlideChange"
    >
      <swiper-slide v-for="slide in slides" :key="slide.id" :class="{slide:true, cursor: slide.url}" @click="slideClickHandler(slide)">
          <img :src="url + slide.feature.data.attributes.url" alt="">
      </swiper-slide>
      
    </swiper-container>
  </div>
</template>

<style scoped lang="scss">
.slide{
  aspect-ratio: 16/9;
  background: #000;
  &.cursor{
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>