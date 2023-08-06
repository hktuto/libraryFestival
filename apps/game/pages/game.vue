<script lang="ts" setup>
const { levelObject, makeSubLevelOptions } = useGame()
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
            <span class="characterDesc">{{ levelObject.description }}</span>
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
  background: #FFEBDB;
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

.character{
    position: absolute;
    height:70%;
    width: 100%;
    left: 0;
    top: 30%;
    animation: characterMove 15s ease-in-out infinite;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    
    
    &.isSuccess{
      animation:none;
     
      justify-content: flex-start;
      img{
        transform: scale(1.2);
      }
    }
    img {
        height:100%;
      transform: scale(1);
      transition: all 0.2s ease-in-out;
    }
    .successDesc{
      padding: 24px;
      font-size: 3rem;
      color: #F26921;
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