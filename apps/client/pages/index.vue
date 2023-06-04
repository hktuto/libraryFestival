<template>
    <NuxtLayout>
      <template v-if="isMobile" #beforeHeader>
        <div class="mtContainer">
          <Sprit class="ill2" :sprite="[1,2,3,4,5,6].map(i => `/images/home/top/home_slide_left_desktop_r${i}.png`)" :speed="1000" />
          
          <Sprit class="mtImg" :sprite="['/images/home/top/home_slide_left_desktop_mt1.png', '/images/home/top/home_slide_left_desktop_mt2.png', '/images/home/top/home_slide_left_desktop_mt3.png', '/images/home/top/home_slide_left_desktop_mt4.png']" :speed="300" />
        </div>

      </template>
      <Illustration v-if="!isMobile" />
      <img v-else class="ill1 bgGradient" src="/images/home/desktop_left_bottom.png" alt="">
      <Divider  v-if="isMobile"  />
      <slider :slides="data.data.attributes.slide"/>
      <Divider  />
      <CalendarList />
      <Divider />
      <EventGrid :events="data.data.attributes.events.data"/>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import {mobileHelper} from "#imports";

const { find } = useStrapi()
const { categories } = useCategories()
const { isMobile } = mobileHelper()
const { data, refresh, error } = await useAsyncData(
  'homeData',
  () => find('home',{
    populate: {
      'slide': {
        populate:"*"
      },
      events:{
        populate: "*"
      }
    }
  })
)

</script>


<style lang="scss" scoped>
.mtImg{
  width: 100%;
}
.ill1{
  width: 100%;
  transform: translate3d(0,0,0);
  mix-blend-mode: multiply;
}
.mtContainer{
  position: relative;
  margin-top: 25px;
}
.ill2{
  position: absolute;
  width: 40%;
  top: -19%;
  right: 8%;
}
</style>
