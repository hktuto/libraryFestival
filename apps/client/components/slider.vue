<script setup lang="ts">
import { register } from 'swiper/element/bundle';

register();

const props = defineProps<{
  slides: any[]
}>();

const {public:{strapi:{url}}} = useRuntimeConfig();

const displayUrl = computed(() => url.includes('localhost') ? url : "")

const spaceBetween = 10;
const { currentLang} = useLang({})
const router = useRouter()
function slideClickHandler(item:any) {
  if(item.url) {
    if(item.url.includes('http')){
      window.open(item.url+ `?lang=${currentLang.value}`, '_blank')
    }else{
      router.push({
        path: item.url
      })
    }
  }
}

</script>

<template>
  <div class="sliderContainer innerGrid">
    
    <swiper-container
        :slides-per-view="1"
        :space-between="spaceBetween"
        :loop="true"
        :autoplay="{
          delay: 3000
        }"
        :pagination="true"
       
    >
      <swiper-slide v-for="slide in slides" :key="slide.id" :class="{slide:true, cursor: slide.url}" @click="slideClickHandler(slide)">
          <img :src="displayUrl + slide.feature.data.attributes.url" alt="">
      </swiper-slide>
      
    </swiper-container>
  </div>
</template>

<style scoped lang="scss">
.slide{
  width: 100%;
  aspect-ratio: 16/9;
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