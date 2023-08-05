<script lang="ts" setup>
const { levelObject, subLevelObject } = useGame()
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
        <div class="character">
            <img :src="levelObject.img" alt="character" />
        </div>
        <div class="bottomContainer">
          <GameSublevel :answers="subLevelObject.answer" />
        </div>
    </div>

</template>


<style scoped lang="scss">
.pageContainer{
  background: #FFEBDB;
}
.bottomContainer{
    position: absolute;
    width: 100%;
    height: 50%;
    bottom: 0;
    
    display: grid;
    grid-template-rows: 1fr 1fr;
    .optionsContainer{
        overflow: visible;
    }
    .selectedContainer{
        background: #EBCFAC;
    }
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
    img {
        height:100%;
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