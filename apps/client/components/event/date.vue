<script setup lang="ts">
const props = defineProps<{
  programs: any[]
}>()
const { tObj } = useLang({})
</script>

<template>
  <div class="eventDateContainer">
    {{programs}}
  </div>
</template>

<style scoped lang="scss">

</style>