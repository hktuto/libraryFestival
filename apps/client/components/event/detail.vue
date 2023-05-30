<script setup lang="ts">
const {public:{strapi:{url}}} = useRuntimeConfig();

const props = defineProps<{
  event:any
}>();
const { t } = useLang(props.event);
</script>

<template>
  <div class="detailContainer">
    <div class="featureImage">
      <img :src="url + event.photos.data[0].attributes.url" alt="">
    </div>
    <div class="title">
      <div class="bgGradient"></div>
      <div class="innerGrid">
        <div class="titleContainer">
          {{ t('title')  }}
        </div>
      </div>
    </div>
  <div class="innerGrid">
    <div class="eventContent" v-html="t('content')"></div>
    <div class="eventContent" v-html="t('host')"></div>
    <div class="eventContent" v-html="t('target')"></div>
    <div class="eventContent" v-html="t('quota')"></div>
  </div>
  </div>
</template>

<style scoped lang="scss">

.featureImage{
  width: 100%;
  aspect-ratio: 16/6;
  margin-top: -100px;
  position: relative;
  z-index: -1;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.title {
  margin-bottom: calc(var(--app-padding) * 2);
  position: relative;
  .bgGradient{
    position: absolute;
    left: 0;
    top:0;
    height: 48px;
    width: 100%;
  }
}
.titleContainer {
  width: fit-content;
  padding: var(--app-padding);
  font-size: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
  display: block;
  position: relative;
  padding-inline: 24px;
  padding-top: 48px;
  background: rgba(255, 241, 93, 0.3);
}
</style>