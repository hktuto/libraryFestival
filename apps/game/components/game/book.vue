<script lang="ts" setup>
import {Option} from "../../composables/game";

const props = defineProps<{
    data: Option
}>();
const emit = defineEmits<{
    selectedChange: (value: Option) => void
}>();
function toggleSelected() {
  if(!props.data.correct) return;
  emit('selectedChange', props.data);
}

</script>

<template>
    <div :class="{book:true, selected:data.selected}" :style="`--hue:${data.hue}`" @click="toggleSelected(data)" >
        
        <div v-if="data.selected" class="checkBox">
          <img class="closeIcon" src="/images/selected.svg" style="width:24px;height:24px;" />
        </div>
        <div class="bookHeader" ></div>
        <div class="bookName" v-html="data.label"></div>
        <div class="bookBottom" ></div>
    </div>
</template>

<style lang="scss" scoped>
.bookHeader, .bookBottom{
  background: hsl( var(--hue), 70%, 50%);
  height: 12px;
  width: 100%;
  position: relative;
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
    min-height: calc( var(--book-size) * 0.7);
    border-radius: 4px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: stretch;
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
    flex: 1 0 auto;
 }
</style>

