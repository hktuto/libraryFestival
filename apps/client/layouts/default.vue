<template>
  <div class="pageContainer">
    <Header />
    <Share />
    <div class="content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>

.pageContainer {
  width: 100%;
  min-height: 100vh;
  overflow: auto;
  position: relative;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
}

</style>

