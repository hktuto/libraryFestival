<template>
    <NuxtPage />
</template>

<script lang="ts" setup>

const { currentLang } = useLang({})

watch(currentLang, () => {
    if (currentLang.value.toLowerCase() === 'en') {
        document.documentElement.lang = 'en'
    } else {
        document.documentElement.lang = 'zh-hk'
    }
},{
    immediate: true,
})

</script>