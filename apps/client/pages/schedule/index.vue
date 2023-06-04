<script setup lang="ts">

const {t, tObj } = useLang({
  nameEN:"Programme Schedule",
  nameHK:"活動日程",
  noResultEN:"No Result",
  noResultHK:"未有活動"
})

const events = ref([]);


const router = useRouter()
function itemClick(item:any) {
  router.push({
    path: '/program/' + item.id
  })
}
</script>

<template>
  <NuxtLayout name="detail">
    <div class="header innerGrid">
      <div class="postTitle">
      {{ t('name')}}
      </div>
    </div>
    <div class="innerGrid">
      <CalendarList v-model:attrs="events" />
      <div v-if="events.length > 0" class="eventList">
        <div v-for="event in events" :key="event.key" class="eventItem" @click="itemClick(event.customData)">
          <div class="leftBar bgGradient">
            
          </div>
          <div class="dateContainer">
            {{ tObj('displayTime', event.customData.program) }}
          </div>
          <div class="contentContainer">
            <div class="title">{{ tObj('title', event.customData.event) }}</div>
            <div class="quota">{{ tObj('quota', event.customData.event) }}</div>
          </div>
        </div>
      </div>
      <div v-else class="noResult">
        {{ t('noResult') }}
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.header{
}
.postTitle{
  font-size: 2rem;
  font-weight: 700;
}
.eventList{
  display: grid;
  grid-template-columns: repeat(2 ,1fr);
  gap: var(--app-padding);
}
.eventItem{
  padding: var(--app-padding);
  overflow: hidden;
  position: relative;
  isolation: isolate;
  .leftBar{
    position: absolute;
    left: -5px;
    width: 5px;
    top:0;
    height: 100%;
    transition: all .2s ease-in-out;
    z-index: -1;
  }
  .dateContainer{
    font-size: 1rem;
  }
  .title{
    font-size: 1.5rem;
  }
  &:hover {
    background: lightyellow;
    cursor: pointer;
    .leftBar{
      transform: translateX(5px);
      width: 100%;
    }
  }
}
</style>