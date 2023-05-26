<template>
    <NuxtLayout>
        
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { find } = useStrapi()
const { categories } = useCategories()
const { data, refresh, error } = await useAsyncData(
  'events',
  () => find('events', {
    filters: {
        categories: {
            id:{
                $eq: 2,
            }
        },
    },
  })
)

</script>


<style lang="scss" scoped>
</style>
