<template>
  <div class="pageContainer">
    <BgAnimation />
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
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  .content{
    flex: 1 0 auto;
    width: 100%;
  }
}

</style>

