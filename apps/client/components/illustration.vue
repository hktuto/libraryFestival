<script setup lang="ts">

</script>

<template>
  <div class="illustrationContainer innerGrid">
    <div class="leftContainer">
      <Sprit :sprite="['/images/home/top/home_slide_left_desktop_t1.png', '/images/home/top/home_slide_left_desktop_t2.png', '/images/home/top/home_slide_left_desktop_t3.png', '/images/home/top/home_slide_left_desktop_t4.png']" :speed="300" />
      <img class="ill1 bgGradient" src="/images/home/desktop_left_bottom.png" alt="">
    </div>
    <Sprit class="ill2" :sprite="[1,2,3,4,5,6].map(i => `/images/home/top/home_slide_left_desktop_r${i}.png`)" :speed="1000" />
  </div>
</template>

<style scoped lang="scss">
  .illustrationContainer{
    margin-block: 2rem;
    display: grid;
    grid-template-columns: 50% 40%;
    justify-content: flex-start;
    align-items: flex-end;
  }
  .ill2 {
    width: 100%;
    mix-blend-mode: multiply;
  }
  .leftContainer {
    width: 100%;
    mix-blend-mode: multiply;
    img {
      width: 100%;
    }
  }
</style>