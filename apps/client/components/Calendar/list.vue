<script setup lang="ts">
import { useScreens } from 'vue-screen-utils';

const { mapCurrent } = useScreens({ xs: '0px', sm: '640px', md: '768px', lg: '1024px' });
const columns = mapCurrent({ lg: 3 }, 1);

const attrs = ref([
  {
    key: 'today',
    highlight: true,
    dates: new Date(),
  },
  {
    key: 'event',
    dot: true,
    dates: new Date(),
  },
]);
</script>

<template>
  <div class="calendarListContainer innerGrid">
    <VCalendar borderless expanded :columns="columns" :attributes='attrs'/>
  </div>
</template>

<style scoped lang="scss">
.calendarListContainer{
  height: 400px;
  max-height: 80%;
}
</style>