<script setup>
const {t,  currentLang} = useLang({
  descriptionHK:"夢想看似遙不可及，但只要閱讀合適好書，豐富知識，夢想終可成真。請為以下四位朋友選擇合適主題的書籍，以幫助他們達成夢想。",
  descriptionEN:"Dream seems unattainable but once you find a good read to enhance your knowledge, your dream will come true. Please choose a suitable good read for the 4 people below to make their dreams come true.",
})
</script>

<template>
  <div class="homeTitleContainer">
    <div class="titleRow">
      <BookRow width="30" class="end"/>
      <div class="titleContainer">
        <img :src="currentLang === 'EN' ? '/images/logoEN.svg' : '/images/logoHK.svg'" />
        <div class="intro">
          {{  t('description') }}
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
      font-size: 1.5rem;
      text-align: justify;
      word-break: break-word;
      color: #fff;
      width: 100%;
      padding-inline: 24px;
      @media( max-width: 640px) {
        width: 100%;
        font-size: 1.2rem;
      }
    }
    img{
      width: 100%;
      max-width: 600px;
    }
  }
}
.books{
  &.end {
    justify-content: flex-end;
  }
}
</style>