<script setup lang="ts">
import {mobileHelper, useAsyncData} from "#imports";

const router = useRouter()
const { find, findOne } = useStrapi()
const {public:{strapi:{url}}} = useRuntimeConfig();
const route = useRoute()
const {isMobile} = mobileHelper()
const displayUrl = computed(() => url.includes('localhost') ? url : "")
const { data: cat } = await useAsyncData(
    'catData',
    () => findOne('catergories', {
      filters:{
        name: {
          $eq: route.params.id
        }
      },
      
    })
)
const { tObj , t} = useLang({
  noResultEN:"coming soon",
  noResultHK:"即將推出"
})
const { data, refresh, error } = await useAsyncData(
    'catergories',
    () => find('events', {
      filters:{
        categories:{
          name:{
            $eq: route.params.id
          }
        }
      },
      populate: "*",
      sort:"order",
      pagination:{
        start: 0,
        limit: -1
      }
    })
)

onMounted(() => {
  if(data.value && data.value.data.length === 1) {
    const router = useRouter();
    console.log(data.value.data[0])
    router.push({
      path: '/program/' + (data.value as any).data[0].id
    })
  }
})

const gtag = useGtag()
gtag('event', 'screen_view', {
  app_name: 'Library Festival',
  screen_name: cat.value.data[0].attributes.nameEN
})

const config = useRuntimeConfig()
useSeoMeta({
  title: config.public.siteName + " | " + cat.value.data[0].attributes.nameEN,
})
</script>

<template>
  <NuxtLayout name="detail">
    
    <div  v-if="isMobile" class="innerGrid noPadding">
      <div class="featureContainer" >
        <div class="featureImage">
          <img class="ill1 bgGradient" src="/images/home/desktop_left_bottom.png" alt="" />
        </div>
      </div>
    </div>
    <div class="header innerGrid">
      <div class="postTitle">
        {{ tObj('name', cat.data[0].attributes) }}
      </div>
    </div>
    <div class="gridContainer innerGrid">
      <EventGrid v-if="data.data.length > 0" :events="data.data" />
      <div v-else class="noResultContainer">
        {{ t('noResult') }}
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.header{
  margin-bottom: 24px;
}
.postTitle{
  font-size: 2rem;
  font-weight: 700;
}
.ill1{
  width: 100%;
  transform: translate3d(0,0,0);
  mix-blend-mode: multiply;
}
.mtImg{
  width: 100%;
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