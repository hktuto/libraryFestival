<script lang="ts" setup>
const props = defineProps<{
    label: string
}>();
const selected = ref(false);

const radomColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}

</script>

<template>
    <div :class="{book:true, selected}" :style="`--color:${radomColor()}`" >
        <div class="bookHeader" ></div>
        <div class="bookName">{{ props.label }}</div>
        <div class="bookBottom" ></div>
    </div>
</template>

<style lang="scss" scoped>
.bookHeader,.bookBottom{
    background: var(--color);
    height: 12px;
}
.book{
    background: var(--color);
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

