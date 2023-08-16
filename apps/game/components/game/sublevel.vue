<script lang="ts" setup>
import {randomColor} from "../../utils/color";
import {Option} from "../../composables/game";
import { set } from "@vueuse/core";
const { isLastSubLevel, makeSubLevelOptions, currentLevel, nextLevel, subLevelNumber,currentSubLevelAnswer } = useGame()
const emit = defineEmits(['success', 'reset'])
const isSuccess = ref(false);
const ready = ref(false);
const randomBook = ref([]);
function selectedChange(obj:Option) {
  // find obj in answers and 
  const index = currentSubLevelAnswer.value.findIndex( item => item.label === obj.label);
  currentSubLevelAnswer.value[index].selected = !currentSubLevelAnswer.value[index].selected
}

const selected = computed(() => currentSubLevelAnswer.value.filter(item => item.selected))

function submit(){
  if(!isSuccess.value && isLastSubLevel()){
    emit('success');
    isSuccess.value = true;
  }else{
    nextLevel()
  }
}

const currentPos =ref(0);
const startInterval = ref();
const endInterval = ref();
const optionsEl = ref();
function scrollForward(){
  if(!optionsEl.value) {
    clearInterval(startInterval.value);
    return;
  }
  optionsEl.value.scrollLeft += 20;
  if(optionsEl.value.scrollLeft >= optionsEl.value.scrollWidth - optionsEl.value.clientWidth -10){
    clearInterval(startInterval.value);
    endInterval.value = setInterval(scrollBackward, 30);
  }
}

function scrollBackward(){
  if(!optionsEl.value) {
    clearInterval(endInterval.value);
    return;
  }
  optionsEl.value.scrollLeft -= 20;
  if(optionsEl.value.scrollLeft <= 0){
    clearInterval(endInterval.value);
  }
}

watch(currentLevel, async() => {
  ready.value = false;
  isSuccess.value = false;
  emit('reset');
  await makeSubLevelOptions()
  
  nextTick(() => {

    randomBook.value = [0,1,2,3,4,6,7,8,9].map( i => ({
      slide :Math.floor(Math.random() * 4) % 10,
      scale : Math.random() * (1.2 - 0.8) + 0.8
    }))
   
    ready.value = true;
    nextTick(() => {

      if(optionsEl.value){
        optionsEl.value.scrollLeft = 0;
        startInterval.value = setInterval(scrollForward, 30);
      }
    })
  });
  
},{
  immediate:true
})

onMounted(() => {
  if(optionsEl.value){
    setTimeout(() => {
      optionsEl.value.scrollLeft = 0;
      startInterval.value = setInterval(scrollForward, 30);
    }, 50)
  }
})

</script>

<template>
  <div :class="{bottomContainer:true,isSuccess}">
    
    <BookShelf class="backgroundShelf" :divided="3.5" style="opacity:0.8;filter:blur(5px)" />
    <div v-if="ready" ref="optionsEl" class="booksOptions">
        <img v-once  class="betweenImg" v-for="i in 3" :key="1"  :src="`/images/books/${Math.floor(Math.random() * 12) % 10 }.svg`" :style="`--scale:${Math.random() * (1.2 - 0.8) + 0.8}`" />
        <template  v-for="(answer, index) in currentSubLevelAnswer" :key="answer">
          <GameBook :data="answer" @selectedChange="selectedChange"  :eng="true"/>
          <img class="betweenImg"  :src="`/images/books/${randomBook[index].slide}.svg`" :style="`--scale:${randomBook[index].scale}`" />
          <img class="betweenImg"  :src="`/images/books/${randomBook[index+1].slide}.svg`" :style="`--scale:${randomBook[index+1].scale}`" />
        </template>
      <img v-once v-for="i in 3" :key="1"   class="betweenImg"  :src="`/images/books/${Math.floor(Math.random() * 12) % 10 }.svg`" :style="`--scale:${Math.random() * (1.2 - 0.8) + 0.8}`" />
    </div>
    <div :class="{selectedContainer:true, isSuccess}">
      <div v-if="!isSuccess" class="subLevelBg">
            {{  subLevelNumber === 0 ? "第一關" : subLevelNumber < 2 ? "第二關" : "第三關" }}
        </div>
      <div class="selectedBook" v-for="item in selected" :key="item.label" :style="`--hue:${item.hue}`" @click="selectedChange(item)">
        <div class="bookTitle" >{{ item.name }}</div>
        <img  class="closeIcon" src="/images/selected.svg" width="24px" />
      </div>
    </div>
    
    <div v-if="selected.length === 3 || isSuccess " class="submitBtn" @click="submit">{{ currentLevel === 'Hailey-2' && isSuccess  ? '書單' : isSuccess ? "下一位夢想家" : " 確定" }}</div>
  </div>
</template>


 <style scoped lang="scss">
 .backgroundShelf{
    position: absolute;
    top: -20px;
    left:0;
    z-index: -1;
}
.bottomContainer{
  --book-size: 250px;
  position: absolute;
  width: 100%;
  max-height: 50%;
  bottom: 0;
  display: grid;
  grid-template-rows: 1fr 250px;
  overflow: visible;
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
   justify-content: center;
   align-items: flex-start;
   padding: 12px;
   gap: 12px;
   min-height: 120px;
   overflow-x: scroll;
   overflow-y: hidden;
   position: relative;
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
     font-size: 1.5rem;
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
       font-size: 1.2rem;
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
   bottom: 32px;
   right: 36px;
   padding: 12px 24px;
   font-size: 1.5rem;
   background: #0d930d;
   color: #fff;
   border-radius: 24px;
   box-shadow: 0 0 5px rgba(0,0,0,0.3);
   cursor: pointer;
 }

 .subLevelBg{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    display: flex;

    flex-flow: row nowrap;
    justify-content: center;
    align-items: flex-end; 
    color: rgba(161, 154, 126, 0.2);
    font-size: 5rem;
}

.rotate{
  transform: rotate(90deg);
}
 </style>