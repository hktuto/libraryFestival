<script lang="ts" setup>
import {randomColor} from "../../utils/color";

type option = {
  label: string,
  correct: boolean,
  hue: string
}

const props = defineProps<{
    answers: string[],
    selected: option[]
}>()

const options = ref<any[]>([])

function init() {
  options.value = props.answers.map((answer) => {
    return {
      label: answer,
      correct: true,
      hue: randomColor()
    }
  })
}

function itemSelected(answer, index) {
  
}

function itemUnselected(answer, index) {
  
}

watch(() => props.answers, () => {
  init()
}, { immediate: true })

</script>

<template>
    <div class="booksOptions">
        <GameBook v-for="(answer, index) in options" :key="answer" :data="answer" @selected="itemSelected(answer, index)" @unSelected="itemUnselected(answer, index)" />
    </div>
    <div class="selectedContainer">
  
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
 .selectedContainer{
   background: #EBCFAC;
 }
 </style>