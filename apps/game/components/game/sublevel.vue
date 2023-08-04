<script lang="ts" setup>

const props = defineProps<{
    answers: string[]
}>()

</script>

<template>
    <div class="booksOptions">
        <GameBook v-for="answer in answers" :key="answer" :label="answer">
            
        </GameBook>
    </div>
</template>


 <style scoped lang="scss">

 .booksOptions{
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 46px);
    overflow: visible;
    position: relative;
    justify-content: center;
    align-items: flex-end;
 }
 </style>