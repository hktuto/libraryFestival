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
      <template v-if="!isMobile">
        <div class="calendarRow innerGrid">
          <div class="desktopSlideContainer">
            <slider :slides="data.data.attributes.slide"/>
          </div>
          <div class="calendarContainer bgGradient">
            <CalendarList :forceColumn="1" />
          </div>
        </div>
      </template>
      <template v-else>
        
      <slider :slides="data.data.attributes.slide"/>
      <Divider  />
      <CalendarList :forceColumn="1" />
      </template>
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

.calendarRow{
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: var(--app-padding);
  
}
.desktopSlideContainer{
  width: 100%;
  position: relative;
  overflow: hidden;
  .sliderContainer{
    padding: 0 !important;
  }
  //width: 99%;
}
.calendarContainer {
  width: 100%;
  place-items: center;
  display: grid;
  overflow: visible;
  .calendarListContainer{
     width: 100%;
    background: #fff;
  }
}
</style>
