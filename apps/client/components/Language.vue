<script setup lang="ts">
import {useLang} from '~/composables/lang';
const { displayLang, currentLang } = useLang()
</script>

<template>
  <div class="languageContainer">
    <div v-for="lang in displayLang" :key="lang.key" class="lang" @click="">
      {{ lang.label }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  .languageContainer{
    display: flex;
    flex-flow: row nowrap;
    gap: calc( var(--app-padding) / 2);
    .lang {
      cursor: pointer;
    }
    .lang + .lang {
      border-left: 1px solid currentColor;
      padding-inline: calc( var(--app-padding) / 2);
      
    }
  }
</style>