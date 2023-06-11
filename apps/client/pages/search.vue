<script setup lang="ts">

const keyword = ref('');

function search(){
  // TODO : implement search
}
</script>

<template>
  <NuxtLayout name="detail" noShare>
    <div class="pageContainer innerGrid">
      
    <div class="searchForm">
      <input v-model="keyword" />
      <button @click="search" > search </button>
    </div>
    <div class="searchResult">
      
    </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.searchForm{
  display: flex;
  flex-flow: row nowrap;
  gap: var(--app-padding);
  input {
    font-size: 1.2rem;
  }
}
</style>