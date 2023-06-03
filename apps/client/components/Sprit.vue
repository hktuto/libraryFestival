<template>
    <img :src="currentUrl" />
</template>


<script setup lang="ts">
const props = defineProps<{
    sprite: string[],
    speed: number
}>();
const currentFrame = ref(0)

const currentUrl = computed(() => {
    return props.sprite[currentFrame.value]
})

setInterval(() => {
    currentFrame.value = (currentFrame.value + 1) % props.sprite.length
}, props.speed)

</script>