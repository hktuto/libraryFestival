<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
      width: any,
      divided?: number
    }>(),
    {
      width: 100,
      divided: 3
    }
)
</script>

<template>
  <div class="bookRow">
    <BookRow v-bind="$props" />
    <BookRack />
  </div>
</template>

<style scoped lang="scss">
.bookRow{
  width:100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  position: relative;
}
</style>