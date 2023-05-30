<script setup lang="ts">
const route = useRoute()
const {findOne } = useStrapi()
const { data, refresh, error } = await useAsyncData(
  'programData',
  () => findOne('events',route.params.id as any,{
    populate: "*"
  })
)
</script>

<template>
  <NuxtLayout name="detail">
    <EventDetail :event="data.data.attributes" />
  </NuxtLayout>
</template>

<style scoped lang="scss">

</style>