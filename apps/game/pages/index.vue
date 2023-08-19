<script lang="ts" setup>
const router = useRouter()
function startGame() {
  router.push('/intro')
}
const gtag = useGtag()
gtag('event', 'screen_view', {
  app_name: 'Library Festival game',
  screen_name: 'Home'
})
const {t} = useLang({
  titleHK: '開卷有益',
  titleEN: 'Reading is always Rewarding',
})
</script>

<template>
<div class="pageContainer">
  <div class="homeBg">
    <!-- <BookShelf /> -->
    <BookShelf :divided="3.5"  />
    <BookTitle />
    <BookShelf :divided="3.5"  />
    <!-- <BookShelf /> -->
    <div class="startButtonContainer">

      <button class="startButton" @click="startGame">{{ t('title') }}</button>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.homeBg{
  width: 100%;
  height:100%;
  background: radial-gradient( #FAA42A, #D05029);
  display: grid;
  place-items: center;
  gap: 24px;
  padding-top: 24px;
}
.bookRow {
  margin-bottom: 24px;
}
.startButtonContainer{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  position: absolute;
  bottom: 48px;
}
.startButton{
  border: 1px solid #fff;
  background: #50B848;
  padding: 12px 24px;
  border-radius: 40px;
  // width: 200px;
  color: #fff;
  font-size: 2.5rem;
  
  cursor: pointer;
  // left: calc(50% - 100px);
}
</style>

<style lang="scss" scoped>
html:lang(en){
  .startButton{
    font-size: 1.5rem;
  }
}
</style>