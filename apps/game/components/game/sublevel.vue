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
        <img v-once class="betweenImg" v-for="i in 3" :key="i"  :src="`/images/books/${Math.floor(Math.random() * 12) % 10 }.svg`" :style="`--scale:${Math.random() * (1.2 - 0.8) + 0.8}`" />
        <template v-once v-for="(answer, index) in answers" :key="answer">
          <GameBook  :data="answer" @selectedChange="(bool) => selectedChange(answer, bool)" />
          <img class="betweenImg"  :src="`/images/books/${Math.floor(Math.random() * 12) % 10 }.svg`" :style="`--scale:${Math.random() * (1.2 - 0.8) + 0.8}`" />
        </template>
      <img v-once class="betweenImg" v-for="i in 3" :key="i"  :src="`/images/books/${Math.floor(Math.random() * 12) % 10 }.svg`" :style="`--scale:${Math.random() * (1.2 - 0.8) + 0.8}`" />
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
 .betweenImg{
   max-height: 200px;
 }
 </style>