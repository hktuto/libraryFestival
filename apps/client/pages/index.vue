<template>
    <NuxtLayout>
      <Illustration />
      <slider :slides="data.data.attributes.slide"/>
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
      }
    }
  })
)

</script>


<style lang="scss" scoped>
</style>
