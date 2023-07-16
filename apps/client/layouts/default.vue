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
    <teleport v-if="data && dialogOpened" to="body">
      <div class="dialogContainer" @click="dialogOpened = false">
        <div class="dialogContent">
          <div class="closeBtn">
            <img src="/images/close.png" />
          </div>
          {{ tObj('content', data.data.attributes) }}
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import {mobileHelper} from "~/composables/mobile";
const { find } = useStrapi()
const { isMobile } = mobileHelper()
const { tObj } = useLang({})

const dialogOpened = ref(true);
const { data } = useAsyncData('popup',
    () => find('popup')
)

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
.dialogContent{
  max-width: 640px;
  width: 100%;
  min-width: 260px;
  padding: calc(var(--app-padding) * 4);
  background: #fff;
  font-size: 1.2rem;
  position: relative;
}
.dialogContainer{
  z-index: 9;
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  display: grid;
  place-items: center;
  background: rgba(0,0,0,0.3);
  
}
.closeBtn{
  position: absolute;
  top:4px;
  right:4px;
  width:24px;
  img{
    width:20px;
    height: 20px;
  }
}
</style>

