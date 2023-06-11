<template>
  <div :class="{pageContainer:true, isMobile}">
    <slot name="beforeHeader" />
    <BgAnimation />
    <Header class="header" :hideLogo="true"/>
    <Share class="share" />
    <div class="content">
      <slot />
    </div>
    <Footer class="footer" />
  </div>
</template>

<script lang="ts" setup>
import {mobileHelper} from "~/composables/mobile";

const { isMobile } = mobileHelper()

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
  &.isMobile{
    
    padding-bottom: 60px;
    .content{
      margin-top: 24px;
    }
    .Share{
      order:1
    }
    .footer {
      order: 3
    }
  }
}

</style>

