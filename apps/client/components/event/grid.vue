<script setup lang="ts">
const props = defineProps<{
  events: any[]
}>();
const sortedList = computed(() => props.events.sort((a:any,b:any) => a.attributes.order === null ? 1 : a.attributes.order < b.attributes.order? -1 : 1))
</script>

<template>
  <div class="gridContainer innerGrid">
    <div class="grid">
    <event-item v-for="event in sortedList" :key="event.id" :eventId="event.id" :event="event.attributes"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: calc(var(--app-padding) * 3);
  @media (max-width: 1280px){
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px){
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>