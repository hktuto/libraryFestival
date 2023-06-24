<script setup lang="ts">
const route = useRoute()
const {findOne } = useStrapi()
const { data, refresh, error } = await useAsyncData(
  'programData',
  () => findOne('events',route.params.id as any,{
    populate: "*"
  })
)

const gtag = useGtag()
gtag('event', 'screen_view', {
  app_name: 'Library Festival',
  screen_name: data.value.data.attributes.titleEN
})
</script>

<template>
  <NuxtLayout name="detail">
    <EventDetail :event="data.data.attributes" />
  </NuxtLayout>
</template>

<style scoped lang="scss">

</style>