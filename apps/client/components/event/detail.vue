<script setup lang="ts">
import Markdown from 'vue3-markdown-it';
import 'highlight.js/styles/monokai.css';
import FeatureImage from "~/components/featureImage.vue";

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
    <FeatureImage :img="event.photos.data[0].attributes.url" :blur-image="event.photos.data[0].attributes.formats.thumbnail.url" />
    
    <div class="title ">
      <div class="innerGrid noPadding">
        <div class="bgGradient "></div>
      </div>
      <div class="innerGrid">
        <div class="titleContainer">
          {{ t('title')  }}
        </div>
      </div>
    </div>
  <div class="innerGrid">
    <Markdown class="eventContent" :source="t('content')" />
    <div v-if="event.hostEN" class="eventContent" >
      <div class="label">{{ t('tableHost') }}</div>
      <div class="content" v-html="t('host')"></div>
    </div>
    <div v-if="event.targetEN" class="eventContent" >
      <div class="label">{{ t('tableTarget') }}</div>
      <div class="content" v-html="t('target')"></div>
    </div>
    <div v-if="event.quotaEN" class="eventContent">
      <div class="label">{{ t('tableQuota') }}</div>
      <div class="content" v-html="t('quota')"></div>
    </div>
    <EventDate :programs="event.programs" />
    <div v-if="event.remarkEN" class="eventContent">
      <div class="label"></div>
      <div class="content" v-html="t('remark')"></div>
    </div>
    
  </div>
  </div>
</template>

<style scoped lang="scss">

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
  font-size: 1.6rem;
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

.innerGrid.noPadding{
  padding:0;
}
</style>