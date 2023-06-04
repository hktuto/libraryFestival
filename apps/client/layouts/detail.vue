<script setup lang="ts">
import {mobileHelper} from "~/composables/mobile";

const { isMobile } = mobileHelper()

</script>

<template>
  <div :class="{pageContainer:true, isMobile}">
    <BgAnimation />
    <Header />
    <Share :forceShow="true" />
    <div class="content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

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
  &.isMobile{
    padding-bottom: 60px;
  }
}

</style>