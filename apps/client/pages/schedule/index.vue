<script setup lang="ts">
import dayjs from 'dayjs'
import { UseVirtualList } from '@vueuse/components'
import { useEvents } from '~/composables/event';
const { find } = useStrapi();
const { allEvents,sortForSchedule, loading, calendarLang } = useEvents()

const {searchCategory} = useCategories()
const {t, tObj, currentLang, pureT,TraditionalToSim } = useLang({
  nameEN:"Programme Schedule",
  nameHK:"活動日程",
  noResultEN:"No Result",
  noResultHK:"未有活動",
  detailEN:"Event Details",
  detailHK:"了解詳情",
  searchEN:"Search",
  searchHK:"搜尋",
  keywordEN:"Programme Title",
  keywordHK:"活動名稱",
  monthEN:"Time",
  monthHK:"時間",
  locationEN:"Location",
  locationHK:"地點",
  timeEN:"Time",
  timeHK:"時間",
  titleEN:"Programme Title",
  titleHK:"活動名稱",
  categoryEN:"Category",
  categoryHK:"類別",
  resetEN:"Reset",
  resetHK:"重設",
})


const events = computed(() => sortForSchedule(allEvents.value))
const form = reactive({
  month: {
    start: null as any,
    end: null as any
  },
  day: "",
  name: "",
  category:"",
  location:""
})

function reset() {
  form.name = ''
  form.month = {
    start: '',
    end: ''
  }
  form.category = ''
  form.location = ''
}

function dateStringToNumber(str:string):number{
  return Number(str.replaceAll('-',''))
}

function withInStartEnd(targetStart:string, targetEnd:string, startDate:string, endDate:string):boolean {
  
  return dateStringToNumber(targetStart) <= dateStringToNumber(endDate) && dateStringToNumber(targetEnd) >= dateStringToNumber(startDate)
}




const locationOptions = computed( () => {
  const arr = [...new Set(events.value.filter(i => i.locationEN).map((e:any) => e['location' + (currentLang.value === 'CN' ? 'HK' : currentLang.value)] ))]
  arr.sort((a,b) => !a || !b ? 1 : a.localeCompare(b) )
  return arr
} ) 


const filteredEvents = computed(() => {
  let startDate : string;
  let endDate : string;
  if(form.month && form.month.start && form.month.end){
    startDate = dayjs(form.month.start).format('YYYY-MM-DD')
    endDate = dayjs(form.month.end).format('YYYY-MM-DD')
  }
  const arr = events.value.filter((e:any) => {
    let result = true;
    
    if(form.month && form.month.start && form.month.end && result){
      if(!e.startDate || !e.endDate) return false;
      result = withInStartEnd(e.startDate, e.endDate, startDate, endDate)
    }
    if(form.name && result){
      if(!e.titleEN) return false;
      const key = form.name.toLowerCase().replaceAll(" ", '');
      
      const enName = e.titleEN.toLowerCase().replace(/\n/g, ' ').replaceAll(" ", '');
      const hkName = e.titleHK.toLowerCase().replace(/\n/g, ' ').replaceAll(" ", '');
      const zhName = TraditionalToSim(e.titleHK).toLowerCase().replace(/\n/g, ' ').replaceAll(" ", '');
      result = enName.includes(key) || hkName.includes(key) || zhName.includes(key)
    }
    if(form.category && result){
      if(!e.categories) return false;
      result = e.categories.map((c:any) => c.id).includes(form.category)
    }
    if(form.location && result){
      if(!e.locationEN) return false;
      result = e.locationEN.includes(form.location) || e.locationHK.includes(form.location)
    }
    return result
  })
  return arr
})


function closeBtn(){
  form.month = {
    start:null,
    end:null
  }
}

const gtag = useGtag()
gtag('event', 'screen_view', {
  app_name: 'Library Festival',
  screen_name: 'Schedule'
})
const config = useRuntimeConfig()
useSeoMeta({
  title: config.public.siteName + " | " + 'Schedule',
})
</script>

<template>
  <NuxtLayout name="detail" noShare>
    <div class="header innerGrid">
      <div class="postTitle">
      {{ t('name') }}
      </div>
    </div>
    <div class="innerGrid">
      <div class="searchContainer">
        <div class="item">
          <label for="keyword">{{t('keyword')}}</label>
          <input id="keyword" v-model="form.name"/>
        </div>
        <div class="item">
          <label for="month">{{t('month')}}</label>
          <VDatePicker v-model.range="form.month" mode="date" is-range :locale="calendarLang" >
            <template #default="{ inputValue, inputEvents, hidePopover }">
              <div class="inputRow">

                <input id="month" :value="inputValue.start ? dayjs(inputValue.start).format('YYYY-MM-DD'): '' " v-on="inputEvents.start" readonly/>
                <input id="month2"  :value="inputValue.end ? dayjs(inputValue.end).format('YYYY-MM-DD'): ''" v-on="inputEvents.end" readonly/>
                <div class="closeBtn" @click="closeBtn">X</div>
              </div>
             
            </template>
          </VDatePicker>
        </div>
        <div class="item">
          <label for="category">{{t('category')}}</label>
          <select id="category" v-model="form.category" :placeholder="t('category')">
            <option value=""></option>
            <option v-for="item in searchCategory" :key="item.id" :value="item.id">{{ tObj('name', item.attributes) }}</option>
          </select>
        </div>
        <div class="item">
          <label for="location">{{t('location')}}</label>
          
          <select id="location" v-model="form.location" :placeholder="t('location')" >
            <option value=""></option>
            <option v-for="i in locationOptions" :key="i" :value="i" >{{pureT(i)}}</option>
          </select>
        </div>
        <div class="item">
          <button class="search" @click="reset">{{t('reset')}}</button>
          </div>

      </div>
      <div v-if="filteredEvents.length > 0" class="eventList">
       
        <div class="row">
              <div class=" ">{{ t('time') }}</div>
              <div class=" ">{{ t('title') }}</div>
              <div class=" ">{{ t('location') }}</div>
              <div></div>
            </div>
        <UseVirtualList :list="filteredEvents" :options="{itemHeight:90}" height="500px">
          <template #="{data}">
            <div class="row">
              <div class="date">{{data.startDate}} - <br/> {{data.endDate}}</div>
              <div class="title">{{tObj('title', data)}}</div>
              <div class="location">{{tObj('location', data)}}</div>
              <div><button class="table" @click="$router.push({path:'/program/'+data.postId})">{{t('detail')}}</button></div>
            </div>
          </template>
        </UseVirtualList>
        <!-- <table style="width:100%">
          <thead>
          <tr>
            <td width="20%">{{ t('time') }}</td>
            <td>{{ t('title') }}</td>
            <td>{{ t('location') }}</td>
            <td></td>
          </tr>
          </thead>
          <tr v-for="item in events" :key="item.id" >
            <td class="date">{{item.startDate}} - <br/> {{item.endDate}}</td>
            <td class="title">{{tObj('title', item)}}</td>
            <td class="location">{{tObj('location', item)}}</td>
            <td><button class="table" @click="$router.push({path:'/program/'+item.postId})">{{t('detail')}}</button></td>
          </tr>
        </table> -->
      </div>
      <div v-else class="noResult">
        {{ t('noResult') }}
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.header{
  margin-top: 24px;
}
.postTitle{
  font-size: 2rem;
  font-weight: 700;
}
.eventList{
  display: grid;
  grid-template-columns: 1fr;
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
table{
  table-layout:fixed;
}
td{
  padding-block: 12px;
  padding-inline: 12px;
  border-bottom: 1px solid #eee;
  background-color: #eee;
}
.data{
  font-size: .8rem;
}
.location{
  font-weight: 300;
}
.searchContainer{
  display: flex;
  flex-flow: row wrap;
  gap: 12px;
  margin-bottom: 12px;
  justify-content: flex-start;
  align-items: flex-end;
  .item {
    display: flex;
    flex-flow: column wrap;
    gap: 6px;
    font-size: 0.7rem;
    flex: 1 0 auto;
    max-width: 100%;
  }
}
input, select {
  width: 100%;
  appearance: none;
  font-size: 1rem;
  line-height: 1.3;
  border-radius: 30px;
  border: 1px solid #ddd;
  min-width: 100px;
  padding-inline: 24px;
  width:100%;
}
.closeBtn{
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: auto;
  flex: 1 0 24px;
  border: 1px solid #eee;
  display: grid;
  place-items: center;
}
.inputRow{
  display: flex;
  flex-flow: row nowrap;
  gap: 6px;
  input{
    // width: 160px;
  }
}
button {
  border: none;
  padding: 6px 24px;
  font-size: 1rem;
  border-radius: 20px;
  background: var(--primary-color);
  color: #fff;
  cursor: pointer;
  &.table{
    background: #eee;
    font-size: .8rem;
    color: var(--primary-color);
  }
}
.row{
  display: grid;
  grid-template-columns: 20% 40% 20% 20%;
  padding-block: 12px;
  
  background-color: #eee;
  border-bottom: 1px solid #fff;
  > * {
    padding-inline: 12px;
    border-left: 1px solid #fff;
  }
}
</style>