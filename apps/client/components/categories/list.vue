<script setup lang="ts">
const { find } = useStrapi()
const {public:{strapi:{url}}} = useRuntimeConfig();
const router = useRouter()
const displayUrl = computed(() => url.includes('localhost') ? url : "")
const { tObj } = useLang({});
const { data, refresh, error } = await useAsyncData(
    'allCategories',
    () => find('catergories', {
      populate: "*",
      
    })
)

function itemClick(item:any){
  if(item.name === 'interactive_storytelling_device') {
    router.push({
      path: '/program/11'
    })
    return
  }
  router.push({
    path: '/category/' + item.name
  })
}
</script>

<template>
  <div class="listContainer innerGrid grid">
    <div v-for="item in data.data" :key="item.id" class="ItemContainer" @click="itemClick(item.attributes)">
      <div class="featureImgContainer">
        <img :src="displayUrl + item.attributes.feature.data.attributes.url" alt="">
      </div>
      <div class="titleContainer">
        {{ tObj('name', item.attributes) }}
        <div class="bgGradient"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: calc(var(--app-padding) * 3);
  @media (max-width: 1280px){
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px){
    grid-template-columns: repeat(1, 1fr);
  }
}
.ItemContainer{
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