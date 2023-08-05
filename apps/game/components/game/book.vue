<script lang="ts" setup>
const props = defineProps<{
    data: any
}>();
const selected = ref(false);
const emit = defineEmits<{
    selectedChange: (value: boolean) => void
}>();
function toggleSelected() {
  selected.value = !selected.value;
  emit('selectedChange', selected.value);
}

</script>

<template>
    <div :class="{book:true, selected}" :style="`--hue:${data.hue}`" @click="toggleSelected" >
        <div v-if="!selected" class="checkBox select">yes</div>
        <div v-if="selected" class="checkBox deselect">no</div>
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
    top: 0;
    right: 0;
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    color: #000;
    font-weight: bold;
    transform: translate(50%, -50%);
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
    max-height: 220px;
    &:hover{
      z-index: 2;
        transform: translateY(-20px);
        .checkBox {
            display: flex;
        }
    }
    &.selected {
      .deselect {
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

