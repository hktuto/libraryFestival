<script setup>

</script>

<template>
  <div class="bookRow">
    <BookRow />
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