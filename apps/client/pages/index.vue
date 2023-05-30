<template>
    <NuxtLayout>
      <Illustration />
      <slider :slides="data.data.attributes.slide"/>
      <Divider />
      <CalendarList />
      <Divider />
      <EventGrid :events="data.data.attributes.events.data"/>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { find } = useStrapi()
const { categories } = useCategories()

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
