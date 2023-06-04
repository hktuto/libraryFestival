<script setup lang="ts">

import {mobileHelper} from "~/composables/mobile";

const { find } = useStrapi()

const { isMobile } = mobileHelper()
const { currentLang } = useLang({})
const calendarEl = ref();
const router = useRouter()
const { tObj } = useLang({})
const calendarLang = computed(() => {
  return currentLang.value === 'EN'? 'en' : currentLang.value === 'HK' ? 'zh-hk' : 'zh-cn'
})
const attrs = ref<any>([]);
const emit = defineEmits(['update:attrs'])
function eventClick(day:any){
  console.log(day) 
  router.push({
    path: '/program/' + day.id
  })
}

function dateStringToNumber(str:string):number{
  return Number(str.replaceAll('-',''))
}

onMounted(() => getEvents(calendarEl.value.pages))
async function getEvents(months:any[]) {
  const evs = []
  for  (const month of months) {
    const startDate = month.id + "-01"
    const endDate = month.id + "-" + month.monthComps.numDays
    const events = await find('events',{
      filters:{
        programs : {
          startDate:{
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      populate:{
        programs: {
          populate: "*"
        }
      }
    })
    for(const item of events.data){
      const { programs } = item.attributes as any
      const p  = programs.find((p:any) => dateStringToNumber(p.startDate) > dateStringToNumber(startDate) && dateStringToNumber(p.startDate) < dateStringToNumber(endDate) )  ;
      const event = {
          dot: true,
          key: p.startDate + item.attributes.titleEN,
          hideIndicator: true,
          customData: {event: item.attributes, program: p, id:item.id},
          popover:true,
          dates: new Date(p.startDate)
        }
        evs.push(event)
    }
  }
  console.log(evs)
  //
  attrs.value = evs
  emit('update:attrs', evs);
  // console.log(attrs.value)
}
</script>

<template>
  <div class="calendarListContainer innerGrid">
    <VCalendar ref="calendarEl" borderless transparent expanded :locale="calendarLang" :columns="columns" :attributes='attrs' @did-move="getEvents" >
      <template #day-popover="{ dayTitle, attributes }">
        {{ dayTitle }}
        <div class="eventList">
          <div v-for="{ key, customData } in attributes" :key="key" class="eventItem" @click="eventClick(customData)">
            {{ tObj('title', customData.event) }}
          </div>
        </div>
      </template>
    </VCalendar>
  </div>
</template>

<style scoped lang="scss">
.calendarListContainer{
  height: auto;
  max-height: 80%;
  :deep {
    .vc-week, .vc-weekdays{
      margin-bottom: var(--app-padding);
    }
    .vc-popover-content{
      padding: var(--app-padding);
    }
  }
}
.eventList{
  max-width: 200px;
  max-height: 400px;
  overflow: auto;
  .eventItem {
    width: 100%;
    margin-block: var(--app-padding);
    cursor: pointer;
    &:hover, &:focus {
      color: var(--primary-color);
    }
    & + & {
      border-top: 1px solid #eee;
    }
  }
}
:deep {
  .vc-pane-layout{
    gap: 24px;
  }
  @media ( min-width: 1024px) {
    .vc-pane{
      &:first-child {
        .vc-weeks{
          opacity: 0.8;
        }
      }
      &:last-child {
        .vc-weeks{
          opacity: 0.8;
        }
      }
    }
  }
}
</style>