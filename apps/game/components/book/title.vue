<script setup>

</script>

<template>
  <div class="homeTitleContainer">
    <div class="titleRow">
      <BookRow width="30" class="end"/>
      <div class="titleContainer">
        <img src="/images/logoHK.svg" />
        <div class="intro">
          夢想看似遙不可及，但只要閱讀合適好書，豐富知識，夢想終可成真。請為以下四位朋友選擇合適主題的書籍，以幫助他們達成夢想。
        </div>
      </div>
      <BookRow width="30" />
    </div>
    <BookRack />
  </div>
</template>

<style scoped lang="scss">
.titleRow{
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  place-items: center;
  align-items:  flex-end;
  position: relative;
  @media( max-width: 640px) {
    grid-template-columns: 1fr 4fr 1fr;
  }
  .titleContainer{
    margin-inline: 24px;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding-bottom: 24px;
    .intro{
      font-size: 1rem;
      text-align: center;
      word-break: break-all;
      color: #fff;
      width: 70%;
      padding-inline: 24px;
      @media( max-width: 640px) {
        width: 100%;
      }
    }
    img{
      height: 70%;
      max-height: 400px;
    }
  }
}
.books{
  &.end {
    justify-content: flex-end;
  }
}
</style>