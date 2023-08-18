<script lang="ts" setup>
const { levelObject, makeSubLevelOptions, subLevelNumber, previousLevel } = useGame()
const isSuccess = ref(false);

function successChanged(bool){
  isSuccess.value = bool
}
const {t, tObj, currentLang} = useLang({
    backHK:"返回",
    backEN:"Back",
})


</script>

<template>
    <div class="pageContainer">
        <div class="shelfBg">
            <img src="/images/shelf_bg1.png" />
            <img src="/images/shelf_bg2.png" />
            <div class="previousLevelBtn" @click="previousLevel">{{ t('back') }}</div>
        </div>
            
        <div class="logo">
            <img :src="currentLang === 'EN' ? '/images/logo_purpleEN.svg': '/images/logo_purple.svg'" alt="logo" />
            <span v-if="!isSuccess" class="characterDesc"><span class="big">{{ tObj('name', levelObject) }}{{ currentLang === 'EN' ? "'s" : "" }}</span>{{ tObj('description', levelObject) }}</span>
        </div>
       
        
        <div :class="{character:true, isSuccess}">
            <img :src="levelObject.img" alt="character" />
            <div class="successDesc" v-if="isSuccess">{{ tObj('success', levelObject)  }}</div>
        </div>
        
        <GameSublevel :answers="makeSubLevelOptions()" @success="successChanged(true)" @reset="successChanged(false)"/>
        
    </div>

</template>


<style scoped lang="scss">
.pageContainer{
//   background: #FFEBDB;
  background-image: radial-gradient( #f7efe0 0%, #f0d2ba 100%);
  isolation: isolate;
}

.logo{
    position: absolute;
    left: 32px;
    top: 32px;
    width: 60%;
    min-width: 200px;
    max-width: 400px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
    img{
        width: 100%;
    }
    .characterDesc{
        font-size: 1.2rem;
    }
    .big{
        font-size: 1.8rem;
        font-weight: 700;
        color:  #8D288F;
    }
}
.shelfBg{
    position: absolute;
    right: 0;
    top: 24px;
    height: auto;
    width: 35%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    img {
        width: 100%;
        max-width: 120px;
    }
}



.character{
    position: absolute;
    height:70%;
    width: 100%;
    left: 0;
    top: 20%;
    animation: characterMove 15s ease-in-out infinite;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    @media( max-width: 768px){
        top: 40%;
    }
    
    &.isSuccess{
      animation:none;
      justify-content: flex-start;
      align-items: flex-start;
      top: 40%;
      img{
        transform: scale(1.2);
        @media( max-width: 480px){
          height: 50%;
        }
      }
    }
    img {
        height:100%;
        transform: scale(1);
        transition: all 0.2s ease-in-out;
        transform-origin: bottom center;
    }
    .successDesc{
      padding: 24px;
      font-size: 3rem;
      color: #F26921;
      @media( max-width: 480px){
        font-size: 1.2rem;
        }
    }
}
@keyframes characterMove {
    0% {
        transform: translateX( 30% );
    }
    50% {
        transform: translateX(-30%);
    }
    50.1% {
        transform: translateX(-30%) scaleX(-1);
    }
    100% {
        transform: translateX(30%) scaleX(-1);
    }
}

.previousLevelBtn{
    width: auto;
   padding: 8px 24px;
   background: #0d930d;
   color: #fff;
   border-radius: 24px;
   box-shadow: 0 0 5px rgba(0,0,0,0.3);
   cursor: pointer;
   font-size: 1.2rem;
   position: absolute;
   bottom: -60px;
   right:24px;
}
</style>

<style lang="scss">
html:lang(en){
    .logo{
        img{
            width: 90%;
        }
    }
}
</style>
