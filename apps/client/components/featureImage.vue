<script setup lang="ts">

const {public:{strapi:{url}}} = useRuntimeConfig();

const displayUrl = computed(() => url.includes('localhost') ? url : "")

const props = defineProps<{
  img: string,
  blurImage: string
}>()
</script>

<template>
  <div class="innerGrid noPadding">
    <div class="featureContainer bgGradient" >
      <div class="blurImage" :style="`background-image:url(${blurImage})`"></div>
      <div class="featureImage innerGrid">
        <img :src="displayUrl + img" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.featureContainer{
  isolation: isolate;
  position: relative;
  .blurImage{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: -1;
    background-size: cover;
    image-rendering: auto;
  }
}
.featureImage{
  width: 100%;
  aspect-ratio: 16/8;
  position: relative;
  overflow: hidden;
  @media (min-width: 960px) {
    aspect-ratio: initial;
    height: 480px;
    
  }
  img {
    height: 100%;
    margin: 0 auto;
    display: block;
  }
}
</style>