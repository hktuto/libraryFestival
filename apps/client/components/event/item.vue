<script setup lang="ts">
const router = useRouter();

const {public:{strapi:{url}}} = useRuntimeConfig();

const displayUrl = computed(() => url.includes('localhost') ? url : "")
const props = defineProps<{
  event: any,
  eventId: number
}>();
const { t } = useLang(props.event);
function itemClick() {
  console.log(props.event)
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
</style>