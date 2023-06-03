<script setup lang="ts">
import Markdown from 'vue3-markdown-it';
import 'highlight.js/styles/monokai.css';

const {public:{strapi:{url}}} = useRuntimeConfig();

const displayUrl = computed(() => url.includes('localhost') ? url : "")
const props = defineProps<{
  event:any
}>();
const { t } = useLang({...props.event, 
  tableHostEN:"Host", 
  tableTargetEN:"Target", 
  tableQuotaEN:"Quota",
  tableHostHK:"講者/主持",
  tableTargetHK:"對象",
  tableQuotaHK:"名額",
});

</script>

<template>
  <div class="detailContainer ">
    <div class="featureContainer bgGradient" >
      <div class="blurImage" :style="`background-image:url(${event.photos.data[0].attributes.formats.thumbnail.url})`"></div>
      <div class="featureImage innerGrid">
        <img :src="displayUrl + event.photos.data[0].attributes.url" alt="">
      </div>
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
    <Markdown class="eventContent" :source="t('content')" />
    <div class="eventContent" >
      <div class="label">{{ t('tableHost') }}</div>
      <div class="content" v-html="t('host')"></div>
    </div>
    <div class="eventContent" >
      <div class="label">{{ t('tableTarget') }}</div>
      <div class="content" v-html="t('target')"></div>
    </div>
    <EventDate :programs="event.programs" />
    <div class="eventContent">
      <div class="label">{{ t('tableQuota') }}</div>
      <div class="content" v-html="t('quota')"></div>
    </div>
    
  </div>
  </div>
</template>

<style scoped lang="scss">
.featureContainer{
  margin-top: -100px;
  isolation: isolate;
  position: relative;
  .blurImage{
    position: absolute;
    background-size: contain;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: -1;

    image-rendering: auto;
  }
}
.featureImage{
  width: 100%;
  aspect-ratio: 16/6;
  
  position: relative;
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
  font-size: 2.2rem;
  line-height: 1.2;
  font-weight: 700;
  display: block;
  position: relative;
  padding-inline: 24px;
  padding-top: 48px;
  background: rgba(255, 241, 93, 0.3);
}
.eventContent{
  margin-bottom: var(--app-padding);
}
:deep {
  .label{
    font-size: 0.8rem;
    margin-right: 12px;
    white-space: nowrap;
    line-height: 1.3;
  }
  .content{
    font-weight: 700;
  }
  td{
    vertical-align: top;
  }
}
</style>