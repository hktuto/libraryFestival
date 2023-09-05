<script setup lang="ts">
const router = useRouter();

const {public:{strapi:{url}}} = useRuntimeConfig();
const showDialog = ref(false);
const displayUrl = computed(() => url.includes('localhost') ? url : "")
const props = defineProps<{
  event: any,
  eventId: number
}>();
const { t } = useLang(props.event);
function itemClick() {
  if(props.event.videoUrl){ 

    showDialog.value = true;
    const gtag = useGtag()
    const screen_name = 'video-' + props.event.attributes.title
    gtag('event', 'screen_view', {
      app_name: 'Library Festival',
      screen_name
    })
    console.log(screen_name)
    return
  }
  router.push({
    path: '/program/' + props.eventId
  })
}
</script>

<template>
  <div class="eventItemContainer" @click="itemClick">
    <div class="featureImgContainer">
      <img :src="displayUrl + (event.photos.data[0].attributes.formats.small?.url || event.photos.data[0].attributes.url)" alt="">
    </div>
    <div class="titleContainer">
      {{ t('title') }}
      <div class="bgGradient"></div>
    </div>
    <Teleport v-if="showDialog" to="body">
      <div class="backdrop" @click="showDialog = false">
        <div class="iframeContainer">
          <iframe v-if="event.videoUrl" :src="event.videoUrl + '?rel=0&autoplay=1&playsinline=1'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.eventItemContainer{
  cursor: pointer;
  display: grid;
  grid-template-rows: min-content 1fr;
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
  aspect-ratio: 16 / 9;
  margin-bottom: var(--app-padding);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.titleContainer{
  padding: var(--app-padding);
  font-size: 1.2rem;
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

.backdrop{
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,.8);
z-index: 100;
display: flex;
justify-content: center;
align-items: center;
.iframeContainer{
  width: 100%;
  max-width: 800px;
  min-width: 280px;
  aspect-ratio: 16 / 9;
  iframe{
    width: 100%;
    height: 100%;
  }
}
}
</style>