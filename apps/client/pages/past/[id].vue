

<script lang="ts" setup>
import Markdown from 'vue3-markdown-it';
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
      <div class="innerGrid noPadding">
        <div class="featureContainer bgGradient" >
            <div class="blurImage" :style="`background-image:url(${post.feature.data.attributes.formats.thumbnail.url})`"></div>
            <div class="featureImage innerGrid">
                <img :src="displayUrl + post.feature.data.attributes.url" alt="">
            </div>
        </div>
      </div>
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
.featureContainer{
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
  aspect-ratio: 16/8;
  position: relative;
  overflow: hidden;
  img {
    height: 100%;
    margin: 0 auto;
    display: block;
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