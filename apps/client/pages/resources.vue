<script setup lang="ts">

const {t} = useLang({
  labelEN: "Library Resources Guide",
  labelHK: "圖書館資源選介",
})

const gtag = useGtag()
gtag('event', 'screen_view', {
  app_name: 'Library Festival',
  screen_name: 'Library Resources Guide'
})
</script>

<template>
  <NuxtLayout name="detail">
    <div class="header innerGrid">
      <div class="postTitle">
        {{ t('label')}}
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.header{
}
.postTitle{
  font-size: 2rem;
  font-weight: 700;
}
</style>