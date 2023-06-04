<script setup lang="ts">

const {t} = useLang({
  labelEN: "Library Resources Guide",
  labelHK: "圖書館資源選介",
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
  margin-block: 24px;
}
.postTitle{
  font-size: 2rem;
  font-weight: 700;
}
</style>