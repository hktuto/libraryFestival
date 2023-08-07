<script lang="ts" setup>
const { levelObject, makeSubLevelOptions, subLevelNumber } = useGame()
const isSuccess = ref(false);

function successChanged(bool){
  isSuccess.value = bool
}
</script>

<template>
    <div class="pageContainer">
        <div class="shelfBg">
            <img src="/images/shelf_bg1.png" />
            <img src="/images/shelf_bg2.png" />
        </div>
        <div class="logo">
            <img src="/images/logo_purple.svg" alt="logo" />
            <span class="characterDesc"><span class="big">{{ levelObject.name }}</span>{{ levelObject.description }}</span>
        </div>
        <div class="subLevelBg">
            {{ subLevelNumber === 0 ? "第一關" : subLevelNumber < 2 ? "第二關" : "第三關" }}
        </div>
        <div :class="{character:true, isSuccess}">
            <img :src="levelObject.img" alt="character" />
            <div class="successDesc" v-if="isSuccess">{{ levelObject.success }}</div>
        </div>
        
          <GameSublevel :answers="makeSubLevelOptions" @success="successChanged(true)" @reset="successChanged(false)"/>
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
    left: 24px;
    top: 24px;
    width: 60%;
    min-width: 200px;
    max-width: 400px;
    img{
        width: 100%;
    }
    .big{
        font-size: 1.2rem;
        font-weight: 700;
        color:  #8D288F;
    }
}
.shelfBg{
    position: absolute;
    right: 0;
    top: 24px;
    height: 10vh;
    width: 40%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    img {
        height: 100%;
    }
}

.subLevelBg{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 50%;
    display: flex;

    flex-flow: row nowrap;
    justify-content: center;
    align-items: flex-end;    
    z-index: -1;
    color: rgba(161, 154, 126, 0.2);
    font-size: 5rem;
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
</style>