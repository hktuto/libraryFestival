

<script lang="ts" setup>
import Markdown from 'vue3-markdown-it';
import {mobileHelper} from "~/composables/mobile";
import FeatureImage from "~/components/featureImage.vue";
const { isMobile } = mobileHelper()
const route = useRoute();
const {findOne } = useStrapi()
const {public:{strapi:{url}}} = useRuntimeConfig();

const displayUrl = computed(() => url.includes('localhost') ? url : "")
const { data, refresh, error } = await useAsyncData(
  'programData',
  () => findOne('pages', {
    filters:{
        slug: {
            $eq: route.params.id
        }
    },
    populate: "*"
  })
)

const { t } = useLang(data.value.data[0].attributes);

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
</style>