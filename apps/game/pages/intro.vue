<script lang="ts" setup>
const {levels} = useGame()

const {t, tObj} = useLang({
    introHK:"請為四位朋友在書架上挑選適合的書籍:",
    introEN:"Please choose some suitable good books for the 4 dreamers below:",
    startHK: "開始",
    startEN: "Start",
})

</script>

<template>
    <div class="pageContainer">
        <h1>{{ t('intro') }}</h1>
        <div class="levelsContainer">
            <div class="level" v-for="level in levels" :key="level.id">
                <div class="levelImg">
                    <img :src="level.img" alt="level" />
                </div>
                <div class="content">

                    <div class="levelName"><div class="big">{{ tObj('name', level) }}</div>{{ tObj('intro', level)}}</div>
                </div>
            </div>
        </div>
        <button @click="$router.push({path:'/game'})">{{  t('start') }}</button>
    </div>
</template>

<style lang="scss" scoped>
h1{
    text-align: center;
}
.pageContainer{
    padding: 24px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    overflow: auto;
}
.levelsContainer{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap: 24px;
    padding: 24px;
    
}
.level{
    display: grid;
    grid-template-columns: 1fr 3fr;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
    max-width:600px;
    margin: 0 auto;
}
.big{
    font-size: 2rem;
    font-weight: 700;
}
.levelImg{
    aspect-ratio: 1/1;
    overflow: hidden;
    border-radius: 50%;
    background: #fff;
    width: 100%;
    max-width: 220px;
    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
button{
    margin: 0 auto;
    display: block;
    border: 1px solid #fff;
    background: #50B848;
    color: #fff;
    padding: 12px 24px;
    border-radius: 40px;
    font-size: 2rem;
}
.levelName{
    font-size: 2rem;;
}
</style>