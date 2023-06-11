<script setup lang="ts">
import {mobileHelper} from "~/composables/mobile";

const { find} = useStrapi()
const keyword = ref('');
const loading = ref(false);
const { SimToTraditional, t } = useLang({
  searchHK:"搜尋",
  searchEN:"Search",
  noResultEN:"No Result",
  noResultHK:"未有活動",
  loadingEN:"Loading",
  loadingHK:"加載中"
})
const list = ref([]);
const { isMobile } = mobileHelper()
async function search(){
  if(!keyword.value) return;
  loading.value = true;
  const key = SimToTraditional(keyword.value)
  // TODO : implement search
  const data = await find('events',{
    filters:{
      $or:[
        {
          titleEN : {
            $contains :keyword.value
          },
        },{
          titleHK : {
            $contains :keyword.value
          },
        },
        {
          contentEN : {
            $contains :keyword.value
          },
        },{
          contentHK : {
            $contains :keyword.value
          },
        },
      ]
    },
    populate: "*",
    sort:"order",
    pagination:{
      start:0,
      limit: -1
    }
  })
  list.value = data.data as any
  loading.value = false;
}
</script>

<template>
  <NuxtLayout name="detail" noShare>
    <div class="pageContainer innerGrid">
      
    <div :class="{searchForm:true, isMobile}">
      <input v-model="keyword" @keyup.enter="search" />
      <button class="bgGradient" @click="search" > {{ t('search') }} </button>
    </div>
    <div v-if="!loading" class="searchResult">
      <EventGrid v-if="list.length > 0" :events="list"/>
      <div v-else class="noResultContainer">
        {{ t('noResult') }}
      </div>
    </div>
      <div v-else>
        {{ t('loading') }}
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.searchForm{
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: var(--app-padding);
  margin-bottom: calc( var(--app-padding) * 2);
  &.isMobile{
    margin-top: calc( var(--app-padding) * 2);
  }
  input {
    font-size: 1.2rem;
    border-radius: 30px;
    line-height: 2;
    border-color: var(--primary-color);
    padding-inline: calc(var(--app-padding) * 2);
  }
  button {
    font-size: 1rem;
    border-radius: 30px;
    border:none;
    padding-inline: var(--app-padding);
    padding-block : calc( var(--app-padding) / 2);
    color: #000;
    font-weight: 700;
    min-width: 100px;
  }
}
</style>