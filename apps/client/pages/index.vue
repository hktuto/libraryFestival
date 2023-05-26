<template>
    <NuxtLayout>
        {{  data }}
        {{ error }}
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { find } = useStrapi()
const { categories } = useCategories()
const { data, pending, refresh, error } = await useAsyncData(
  'restaurant',
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
