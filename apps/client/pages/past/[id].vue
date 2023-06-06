

<script lang="ts" setup>
import Markdown from 'vue3-markdown-it';
import FeatureImage from "~/components/featureImage.vue";
const route = useRoute();
const {findOne } = useStrapi()
const {public:{strapi:{url}}} = useRuntimeConfig();

const displayUrl = computed(() => url.includes('localhost') ? url : "")
const { data, refresh, error } = await useAsyncData(
  'programData',
  () => findOne('pasts', {
    filters:{
        slug: {
            $eq: route.params.id
        }
    },
    populate: {
      feature: {
        populate:"*"
      },
      slides: {
        populate:"*"
      }
    }
  })
)

const { t, tObj } = useLang(data.value.data[0].attributes);

const post = computed(() => data.value.data[0].attributes)

</script>


<template>
    <NuxtLayout name="detail">
      <FeatureImage :img="post.feature.data.attributes.url" :blur-image="post.feature.data.attributes.formats.thumbnail.url" />
      
        <div class="title">
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
          <div class="slides">
            <div v-for="slide in post.slides" class="slide">
              <img :src="slide.feature.data.attributes.url"/>
              <div class="small">{{ tObj('title', slide) }}</div>
            </div>
          </div>
        </div>
    </NuxtLayout>
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
    font-size: 2.2rem;
    line-height: 1.2;
    font-weight: 700;
    display: block;
    position: relative;
    padding-inline: 24px;
    padding-top: 48px;
    background: rgba(255, 241, 93, 0.3);
}

.innerGrid.noPadding{
  padding:0;
}

.slides{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--app-padding);
  @media (max-width:  960px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .slide{
    width: 100%;
    img{
      width: 100%;
    }
  }
}
</style>