<template>
    <NuxtLayout>
      <template v-if="isMobile" #beforeHeader>
        before header
      </template>
      <Illustration v-if="!isMobile" />
      <slider :slides="data.data.attributes.slide"/>
      <Divider v-if="!isMobile" />
      <CalendarList />
      <Divider />
      <EventGrid :events="data.data.attributes.events.data"/>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import {mobileHelper} from "#imports";

const { find } = useStrapi()
const { categories } = useCategories()
const { isMobile } = mobileHelper()
const { data, refresh, error } = await useAsyncData(
  'homeData',
  () => find('home',{
    populate: {
      'slide': {
        populate:"*"
      },
      events:{
        populate: "*"
      }
    }
  })
)

</script>


<style lang="scss" scoped>
</style>
