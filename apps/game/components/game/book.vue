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
    background: hsl( min( calc(var(--hue) + 20), 360 ), 50%, 60%);
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
    display: flex;
    flex-flow: column nowrap;
    flex: 0 0 auto;
    justify-content: flex-start;
    align-items: stretch;
    transform-origin: bottom center;
    cursor: pointer;
    position: relative;
    max-height: var(--book-size);
    transform: translateY(0px);
    transition: all .2s ease-in-out;
    &:hover{
        z-index: 2;
        transform: translateY(-20px);
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
    color: #fff;
 }
</style>

