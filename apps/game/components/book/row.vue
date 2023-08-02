<script lang="ts" setup>
import { useEventListener} from '@vueuse/core'
const loopTime = ref(10)
const bookHeight = ref(100);
const booksRef = ref<HTMLElement>()

const props = withDefaults(
    defineProps<{
      width: any,
      divided?: number
    }>(),
    {
      width: 100,
      divided: 3
    }
)
function setBookSize () {
  const size = window.innerWidth;
  bookHeight.value =  Math.floor(window.innerHeight / props.divided - (24 * props.divided + 1) );
  loopTime.value = Math.floor(size * (props.width / 100) / (bookHeight.value / 6))
}

useEventListener(window, 'resize', setBookSize)

onMounted(() => {
  setBookSize()
})
</script>

<template>
  <div ref="booksRef" class="books" :style="`--book-height: ${bookHeight}px`">
    <img v-for="i in loopTime" :key="i" :src="`/images/books/${Math.floor(Math.random() * 12) % 10 }.svg`" :style="`--scale:${Math.random() * (1.2 - 0.8) + 0.8}`" />
  </div>
</template>

<style scoped lang="scss">
.books{
  width:100%;
  overflow: var(--book-overflow, hidden);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-end;
  img {
    height: calc( var(--book-height) * var(--scale));
  }
}
</style>