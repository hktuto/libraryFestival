<script setup lang="ts">
const props = defineProps<{
  events: any[]
}>();

</script>

<template>
  <div class="gridContainer innerGrid">
    <div class="grid">
    <event-item v-for="event in events" :key="event.id" :eventId="event.id" :event="event.attributes"/>
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