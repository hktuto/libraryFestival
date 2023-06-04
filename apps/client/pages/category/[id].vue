<script setup lang="ts">
import {useAsyncData} from "#imports";

const router = useRouter()
const { find, findOne } = useStrapi()
const {public:{strapi:{url}}} = useRuntimeConfig();
const route = useRoute()
const displayUrl = computed(() => url.includes('localhost') ? url : "")
const { data: cat } = await useAsyncData(
    'catData',
    () => findOne('catergories', {
      filters:{
        name: {
          $eq: route.params.id
        }
      }
    })
)
const { tObj , t} = useLang({
  noResultEN:"No Result",
  noResultHK:"未有活動"
})
const { data, refresh, error } = await useAsyncData(
    'catergories',
    () => find('events', {
      filters:{
        categories:{
          name:{
            $eq: route.params.id
          }
        }
      },
      populate: "*",
      sort:"slug"
    })
)

</script>

<template>
  <NuxtLayout name="detail">
    <div class="header innerGrid">
      <div class="postTitle">
        {{ tObj('name', cat.data[0].attributes)}}
      </div>
    </div>
    <div class="gridContainer innerGrid">
      <EventGrid v-if="data.data.length > 0" :events="data.data" />
      <div v-else class="noResultContainer">
        {{ t('noResult') }}
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.header{
  margin-block: 24px;
}
.postTitle{
  font-size: 2rem;
  font-weight: 700;
}
</style>