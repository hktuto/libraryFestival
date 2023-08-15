<script lang="ts" setup>
import {Option} from "../../composables/game";
const showError = ref(false);
const props = defineProps<{
    data: Option,
    eng: boolean
}>();
const emit = defineEmits<{
    selectedChange: (value: Option) => void
}>();
function toggleSelected() {
  if(!props.data.correct){
    showError.value = true;
    return;
  } 
  emit('selectedChange', props.data);
}

</script>

<template>
  <div class="bookContainer" >
    <div :class="{book:true, selected:data.selected, eng}"  :style="`--hue:${data.hue}`" @click="toggleSelected(data)" >
        <div v-if="showError" class="checkBox show">
          <img class="closeIcon" src="/images/close.svg" style="width:24px;height:24px;" />
        </div>
        <div v-if="data.selected" class="checkBox">
          <img class="closeIcon" src="/images/selected.svg" style="width:24px;height:24px;" />
        </div>
        <!-- <div class="bookHeader" ></div> -->
        <div class="bookName" v-html="data.label"></div>
        <!-- <div class="bookBottom" ></div> -->
    </div>
    <template v-once v-for="i in new Array(Number((Math.random() * (1 - 2) + 2).toFixed(0)))">

      <img class="rotateImg"  :src="`/images/books/r${Math.floor(Math.random() * 4) % 10}.svg`"  :style="`width:${Math.random() * (100 - 60) + 60}%; margin-left:${Math.random() * (20 - -20) + -20}px`"/>
    </template>
    </div>
</template>

<style lang="scss" scoped>
.bookHeader, .bookBottom{
  background: hsl( var(--hue), 70%, 50%);
  height: 12px;
  width: 100%;
  position: relative;
  flex: 1 0 12px;
  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 10%;
    width: 80%;
    height: 5px;
    background: rgba(255,255,255,.3);
  }
}
.bookContainer {
  display: flex;
    flex-flow: column nowrap;
    gap: 0;
    justify-content: flex-end;
    align-items: center;
}
.bookHeader{
    &:after {
      bottom: -10%;
    }
}
.bookBottom{
  &:after {
    top: -10%;
  }
}

.checkBox{
    position: absolute;
    top: -12px;
    right: -12px;
    width: 24px;
    height: 24px;
    color: #000;
    font-weight: bold;
    display: none;
    z-index: 2;
    &.show {
      display: flex;
    }
}
.book{
    background: hsl( var(--hue), 70%, 50%);
    
    flex: 0 0 auto;
    transform-origin: bottom center;
    cursor: pointer;
    position: relative;
    max-height: var(--book-size);
    transform: translateY(0px);
    transition: all .2s ease-in-out;
    min-height: calc( var(--book-size) * 0.5);
    border-radius: 4px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    &:hover{
        z-index: 2;
        transform: translateY(-5px);
        .checkBox {
            display: flex;
        }
    }
    &.selected {
      .checkBox {
        display: flex;
      }
    }
    &.eng {
      display: grid;
      grid-template-columns: 1fr;
      min-height: auto;
      min-width: 140px;
      // max-width: var(--book-size);
      .bookName {
        writing-mode: horizontal-tb;
        text-orientation: mixed;
        // word-break: break-all;
        padding: 12px 24px;
        word-wrap: break-word;
        word-break: keep-all;
        &:after, &:before{
          content: "";
          position: absolute;
          width: 5px;
          height: 80%;
          top: 10%;
          background: rgba(255,255,255,.3);
        }
        &:after {
          right: 5px;
        }
        &:before {
          left: 5px;
        }
      }
      // .bookHeader, .bookBottom{
      //   width: 12px;
      //   height: 100%;
      //   &:after{
      //     top: 10%;
      //     width: 3px;
      //     height: 80%;
      //   }
      // }
      // .bookHeader{
      //     &:after {
      //       left: 5px;
      //     }
      // }
      // .bookBottom{
      //   &:after {
      //     left: 3px;
      //   }
      // }
    }
}
 .bookName {
   padding: 12px;
    writing-mode: vertical-rl;
    text-orientation: upright;
    color: #fff;
    word-break: break-all;
    display: flex;
    justify-content: center;
    align-items: center;
 }

 .rotateImg{
  width:100%;
  min-width: 160px;
  max-width: 250px;
 }
</style>

