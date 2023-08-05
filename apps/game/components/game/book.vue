<script lang="ts" setup>
const props = defineProps<{
    data: any
}>();
const selected = ref(false);



</script>

<template>
    <div :class="{book:true, selected}" :style="`--hue:${data.hue}`" >
        <div class="bookHeader" ></div>
        <div class="bookName">{{ data.label }}</div>
        <div class="bookBottom" ></div>
    </div>
</template>

<style lang="scss" scoped>
.bookHeader,.bookBottom{
    background: hsl( var(--hue), 70%, 50%);
    height: 12px;
}
.book{
    background: hsl( var(--hue), 70%, 50%);
    padding: 12px;
    display: flex;
    flex-flow: row nowrap;
    flex: 0 0 auto;
    justify-content: flex-start;
    align-items: stretch;
    max-height: 100%;
    transform-origin: bottom center;
    cursor: pointer;
    &:hover{
        transform: scale(1.1);
    }
}
 .bookName {
    writing-mode: vertical-rl;
    color: #fff;
 }
</style>

