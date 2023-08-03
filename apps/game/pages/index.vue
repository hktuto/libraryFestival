<script lang="ts" setup>
const router = useRouter()
function startGame() {
  router.push('/game')
}
</script>

<template>
<div class="pageContainer">
  <div class="homeBg">
    <!-- <BookShelf /> -->
    <BookShelf :divided="3.5"  />
    <BookTitle />
    <BookShelf :divided="3.5"  />
    <!-- <BookShelf /> -->
    <button class="startButton" @click="startGame">開卷有益</button>
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
.startButton{
  border: 1px solid #fff;
  background: #50B848;
  padding: 12px 24px;
  border-radius: 40px;
  width: 200px;
  color: #fff;
  font-size: 2rem;
  position: absolute;
  bottom: 24px;
  cursor: pointer;
}
</style>