<script setup lang="ts">
import {mobileHelper} from "~/composables/mobile";

const { isMobile, isFullSize } = mobileHelper()
const props = defineProps<{
  hideLogo?: boolean
}>()

const router = useRouter()

function goHome(){
  router.push('/')
}
onMounted(()=>{
  console.log('isMobile', isMobile.value)
})
</script>

<template>
  <div :class="{headerContainer:true, innerGrid:true, isMobile, hideLogo}">
    <div v-if="!hideLogo" :class="{logoContainerSmall:true, isMobile}">
      <img src="/images/logo.png" alt="logo" @click="goHome"/>
    </div>
    <div :class="{headerLeft:true, bgGradient:true, isMobile, hideLogo }">
      <client-only>

      <MenuFullWidth v-if="isFullSize" />
      <Menu v-else>
      </Menu>
      </client-only>
      
      <Search ></Search>
      <Language />

    </div>
  </div>
</template>

<style scoped lang="scss">
.headerContainer{
  display: grid;
  grid-template-columns: 1fr ;
  grid-auto-rows: min-content min-content;
  margin-top: 40px;
  overflow: visible;
  z-index: 2;
  margin-bottom: 24px;
  &.isMobile{
    grid-template-columns: 1fr;
    
    // grid-template-areas: 'menu menu menu menu';
    width: 100%;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;
    z-index: 2;
    gap: var(--app-padding);
    
    .headerLeft{
      border-radius: 0;
    }
  }
  .logoContainer{
    width: 120px;
    // grid-area: empty;
    img{
      width: 100%;
      cursor: pointer;
    }
  }
  .logoContainerSmall{
    margin: 10px auto;
    width: 320px;
    
    display: grid;
   
    place-items: center;
    cursor: pointer;
    &.isMobile{
      width: 200px;
    }
    img{
      width: 100%;
      
    }
  }
  .menuRow{
    display: grid;
    grid-template-columns: 1fr min-content;
  }
  .headerLeft {
    position: relative;
    // grid-area: menu;
    min-height: 60px;
    border-radius: 30px;
    display: grid;
    grid-template-columns: 1fr min-content min-content ; 
    justify-content: flex-start;
    align-items: center;
    padding-inline: calc(var(--app-padding) * 2 );
    gap: var(--app-padding);
    overflow: visible;
    &.isMobile {
      grid-template-columns: 1fr  min-content min-content;
    }
  }
}
.headerBg{
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: -1;
  opacity: 0.8;
  transform: translate(0px, 5px);
}
</style>