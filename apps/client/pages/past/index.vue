<script setup lang="ts">
import {mobileHelper} from "#imports";

const router = useRouter()
const { find } = useStrapi()
const {public:{strapi:{url}}} = useRuntimeConfig();
const {isMobile} = mobileHelper()
const displayUrl = computed(() => url.includes('localhost') ? url : "")
const { data, refresh, error } = await useAsyncData(
    'programData',
    () => find('pasts', {
      populate: "*",
      sort:"slug"
    })
)
const { tObj, t } = useLang({
  titleEN: "Past Events",
  titleHK: "昔日活動"
})

function itemClick(item:any) {
  router.push({
    path: '/past/' + item.attributes.slug
  })
}

const gtag = useGtag()
gtag('event', 'screen_view', {
  app_name: 'Library Festival',
  screen_name: 'Past Events'
})

const config = useRuntimeConfig()
useSeoMeta({
  title: config.public.siteName + " | " + 'Past Events',
})
</script>

<template>
  <NuxtLayout name="detail">
    
    <div v-if="isMobile" class="innerGrid noPadding">
      <div class="featureContainer" >
        <div class="featureImage ">
          <img class="ill1 bgGradient" src="/images/home/desktop_left_bottom.png" alt="" />
        </div>
      </div>
    </div>
    <div class="innerGrid">
      <div class="pageTitle">{{ t('title')}}</div>
    </div>
    <div class="listContainer innerGrid">
      <div v-for="item in data.data" :key="item.id" class="listItem" @click="itemClick(item)">
        <div class="featureImgContainer">
          <img :src="displayUrl + item.attributes.feature.data.attributes.url" alt="">
        </div>
        <div class="titleContainer">
          {{ tObj('title', item.attributes)}}
          <div class="bgGradient"></div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.pageTitle{
  font-size: 3rem;
  font-weight: 700;
}
.listContainer{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--app-padding);
  @media (max-width: 1280px){
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px){
    grid-template-columns: repeat(1, 1fr);
  }
}
.desc {
  display: block;/* or inline-block */
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 3.6em;
  line-height: 1.8em;}


.listItem{
  cursor: pointer;
  &:hover {
    position: relative;
    .titleContainer{
      position: initial;
    }
    .bgGradient{
      width: calc( 100% + var(--app-padding) * 2);
      height: calc( 100% + var(--app-padding) * 2);
      left: calc( var(--app-padding) * -1);
      top: calc( var(--app-padding) * -1);
    }
  }
}
.featureImgContainer{
  width: 100%;
  aspect-ratio: 16/9;
  margin-bottom: var(--app-padding);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.titleContainer{
  padding: var(--app-padding);
  font-size: 1.5rem;
  line-height: 1.2;
  display: block;
  position: relative;
  .bgGradient {
    transition: all .2s ease-in-out;
    position: absolute;
    bottom:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
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