<script setup>

</script>

<template>
<div class="pageContainer">
  <div class="homeBg">
    <BookShelf />
    <BookShelf />
    <BookTitle />
    <BookShelf />
    <BookShelf />
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
}
.bookRow {
  margin-bottom: 24px;
}
</style>