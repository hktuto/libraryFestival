<script lang="ts" setup>
import {randomColor} from "../../utils/color";
import {Option} from "../../composables/game";
const { isLastSubLevel, makeSubLevelOptions, currentLevel, nextLevel } = useGame()
const emit = defineEmits(['success', 'reset'])
const isSuccess = ref(false);
const answers = ref<any[]>([])
const loading = ref(false);
const randomBook = ref([]);
function selectedChange(obj:Option) {
  // find obj in answers and 
  const index = answers.value.findIndex( item => item.label === obj.label);
  answers.value[index].selected = !answers.value[index].selected
}

const selected = computed(() => answers.value.filter(item => item.selected))

function submit(){
  if(!isSuccess.value && isLastSubLevel()){
    emit('success');
    isSuccess.value = true;
  }else{
    nextLevel()
  }
}


watch(currentLevel, () => {
  isSuccess.value = false;
  emit('reset');
  answers.value = makeSubLevelOptions()
  randomBook.value = [0,1,2,3,4].map( i => ({
    slide :Math.floor(Math.random() * 12) % 10,
    scale : Math.random() * (1.2 - 0.8) + 0.8
  }))
},{
  immediate:true
})

</script>

<template>
  <div :class="{bottomContainer:true,isSuccess}">
    <div  class="booksOptions">
        <img v-once  class="betweenImg" v-for="i in 3" :key="1"  :src="`/images/books/${Math.floor(Math.random() * 12) % 10 }.svg`" :style="`--scale:${Math.random() * (1.2 - 0.8) + 0.8}`" />
        <template  v-for="(answer, index) in answers" :key="answer">
          <GameBook :data="answer" @selectedChange="selectedChange" />
          <img class="betweenImg"  :src="`/images/books/${randomBook[index].slide}.svg`" :style="`--scale:${randomBook[index].scale}`" />
        </template>
      <img v-once v-for="i in 3" :key="1"   class="betweenImg"  :src="`/images/books/${Math.floor(Math.random() * 12) % 10 }.svg`" :style="`--scale:${Math.random() * (1.2 - 0.8) + 0.8}`" />
    </div>
    <div :class="{selectedContainer:true, isSuccess}">
      <div class="selectedBook" v-for="item in selected" :key="item.label" :style="`--hue:${item.hue}`" @click="selectedChange(item)">
        <div class="bookTitle" v-html="item.label"></div>
        <img  class="closeIcon" src="/images/close.svg" width="24px" />
      </div>
    </div>
    <div v-if="selected.length === 3 || isSuccess " class="submitBtn" @click="submit">{{ isSuccess ? "下一個夢想家" : " 確定" }}</div>
  </div>
</template>


 <style scoped lang="scss">
.bottomContainer{
  --book-size: 250px;
  position: absolute;
  width: 100%;
  max-height: 50%;
  bottom: 0;
  display: grid;
  grid-template-rows: 1fr 250px;
  @media (max-width: 768px){
    --book-size: 160px;
  }
  .optionsContainer{
    overflow: visible;
  }
  .selectedContainer{
    background: #EBCFAC;
  }
  &.isSuccess{
    height:auto;
    grid-template-rows: 1fr;
  }
}
 .booksOptions{
    height: 100%;
     display: flex;
     flex-flow: row nowrap;
     overflow: auto;
    position: relative;
    justify-content: flex-start;
    align-items: flex-end;
    min-height: calc(var(--book-size) + 35px);
   
 }
 .selectedContainer{
   background: #EBCFAC;
   display: flex;
   flex-flow: row nowrap;
   justify-content: flex-start;
   align-items: flex-start;
   padding: 12px;
   gap: 12px;
   min-height: 120px;
   overflow-x: scroll;
   overflow-y: hidden;
   .selectedBook{
     padding: 12px;
     width: 220px;
     height: 200px;
     background: hsl( var(--hue), 70%, 50%);
     display: flex;
     flex-flow: column nowrap;
     align-items: flex-start;
     justify-content: flex-start;
     box-shadow: 0 0 10px rgba(0,0,0,.2);
     color: #fff;
     font-size: 1.2rem;
     position: relative;
     &:before {
      content: "";
      width:100%;
      height: 4px;
      background: rgba(255,255,255,.3);
      display: block;
     }
     @media (max-width: 768px) {
       width: 150px;
       font-size: 1rem;
     }
   }
   &.isSuccess{
     display:none;
   }
 }
 .betweenImg{
   max-height: var(--book-size);
 }
 .closeIcon{
   position: absolute;
   left: -12px;
   top: -12px;
   width: 24px;
   height: 24px;
 }
 .submitBtn{
   position: absolute;
   bottom: 10px;
   right: 10px;
   padding: 6px 12px;
   background: #0d930d;
   color: #fff;
   border-radius: 6px;
   box-shadow: 0 0 5px rgba(0,0,0,0.3);
 }
 </style>