<script lang="ts" setup>
import {randomColor} from "../../utils/color";
import {Option} from "../../composables/game";

const props = defineProps<{
    answers: Option[],
}>()
const selected = ref<option[]>([])
const options = ref<any[]>([])

function selectedChange(obj:any, value: boolean) {
  if(value) {
    selected.value.push(obj)
  } else {
    selected.value = selected.value.filter((item) => item !== obj)
  }
}


</script>

<template>
    <div class="booksOptions">
        <GameBook v-for="(answer, index) in answers" :key="answer" :data="answer" @selectedChange="(bool) => selectedChange(answer, bool)" />
    </div>
    <div class="selectedContainer">
      <div class="selectedBooks">
        <div class="selectedBook" v-for="item in selected" :key="item.label" >
          {{item.label}}
        </div>
      </div>
    </div>
</template>


 <style scoped lang="scss">

 .booksOptions{
    height: 100%;
     display: flex;
     flex-flow: row nowrap;
     overflow: auto;
    position: relative;
    justify-content: center;
    align-items: flex-end;
 }
 .selectedContainer{
   background: #EBCFAC;
 }
 </style>