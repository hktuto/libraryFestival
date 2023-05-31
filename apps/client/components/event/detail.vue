<script setup lang="ts">
const {public:{strapi:{url}}} = useRuntimeConfig();
import Markdown from 'vue3-markdown-it';
import 'highlight.js/styles/monokai.css';
const props = defineProps<{
  event:any
}>();
const { t } = useLang({...props.event, 
  tableHostEN:"Host", 
  tableTargetEN:"Target", 
  tableQuotaEN:"Quota",
  tableHostHK:"對象",
  tableTargetHK:"對象",
  tableQuotaHK:"名額",
});

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
    <Markdown class="eventContent" :source="t('content')" />
    <table class="eventContent" >
      <tr>
        <td><div class="label">{{ t('tableHost') }}</div></td>
        <td><div class="content" v-html="t('host')"></div></td>
      </tr>
      <tr>
        <td><div class="label">{{ t('tableTarget') }}</div></td>
        <td><div class="content" v-html="t('target')"></div></td>
      </tr>
      <tr>
        <td><div class="label">{{ t('tableQuota') }}</div></td>
        <td><div class="content" v-html="t('quota')"></div></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
      </tr>
    </table>
    <EventDate :programs="event.programs" />
    <div >
      
      
    </div>
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
  font-size: 1.2rem;
  line-height: 1.4;
  margin-bottom: var(--app-padding);
}
.label{
  margin-right: 12px;
}
.content{
  font-weight: 700;
}
</style>