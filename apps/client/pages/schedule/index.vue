<script setup lang="ts">
import dayjs from 'dayjs'
import {locationFilter} from "~/utils/filter";
const { find } = useStrapi();
const {t, tObj, currentLang, pureT, SimToTraditional } = useLang({
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
})

const events = ref<any[]>([]);


const router = useRouter()
function itemClick(item:any) {
  router.push({
    path: '/program/' + item.id
  })
}

const form = reactive({
  month: {
    start: null,
    end: null
  },
  day: "",
  name: "",
  category:"",
  location:""
})

function dateStringToNumber(str:string):number{
  return Number(str.replaceAll('-',''))
}
const calendarLang = computed(() => {
  return currentLang.value === 'EN'? 'en' : currentLang.value === 'HK' ? 'zh-hk' : 'zh-cn'
})
function withInStartEnd(targetStart:string, targetEnd:string, startDate:string, endDate:string):boolean {
  
  return dateStringToNumber(targetStart) <= dateStringToNumber(endDate) && dateStringToNumber(targetEnd) >= dateStringToNumber(startDate)
}


function makeFilters() {
  let filters:any = {
    $and:[]
  };
  if(form.month && form.month.start && form.month.end) {
    const startDate = dayjs(form.month.start).format('YYYY-MM-DD')
    const endDate = dayjs(form.month.end).format('YYYY-MM-DD')
    filters.$and.push(
        {
          programs : {
            startDate:{
              $lte: endDate
            },
            endDate:{
              $gte: startDate
            }
          }
        }
    )
  }
  
  if(form.name) {
    let key = SimToTraditional(form.name)
    key = key.toLowerCase();
    filters.$and.push({
      $or:[
        {
          titleEN: {
            $contains: key
          }
        },
        {
          titleHK: {
            $contains: key
          }
        },
        {
          contentHK: {
            $contains: key
          }
        },
        {
          contentHK: {
            $contains: key
          }
        },
      ]
    }
        
    )
  }

  if(form.category) {
    filters.$and.push({
      categories: {
        id:{$eq: form.category}
      }
    })
  }

  return filters
}

const locationOptions = computed( () => {
  const arr = [...new Set(events.value.filter(i => i.locationEN).map((e:any) => e['location' + (currentLang.value === 'CN' ? 'HK' : currentLang.value)] ))]
  arr.sort((a,b) => !a || !b ? 1 : a.localeCompare(b) )
  return arr
} ) 
async function search(){
  
  const res = await find('events',{
    filters: makeFilters(),
    populate:{
      programs: {
        populate: "*"
      }
    },
    pagination:{
      start:0,
      limit:1000,
    }
  })
  // console.log(res.data);
  const allPrograms:any[]  = [];
  for(const item of res.data) {
    let { programs } = item.attributes as any
    console.log("org" , programs.length)
    if(form.month && form.month.start && form.month.end ){
      const startDate = dayjs(form.month.start).format('YYYY-MM-DD')
      const endDate = dayjs(form.month.end).format('YYYY-MM-DD')
      
      programs  = programs.filter((p:any) => {
        if(!p.startDate || !p.endDate) return false;
        return withInStartEnd(p.startDate, p.endDate, startDate, endDate)
      } );
    }
    
    if(form.location){
      programs = programs.filter((p:any) => {
        if(!p.locationEN) return false;
        return p.locationEN.includes(form.location) || p.locationHK.includes(form.location)
      } ) ;
      
    }
    for( const p of programs ) {
      
      if(!p.startDate || !p.endDate) continue;
      const event = {
        name: item.attributes.titleEN,
        titleEN: item.attributes.titleEN,
        titleHK: item.attributes.titleHK,
        locationHK: item.attributes.locationHK,
        locationEN: item.attributes.locationEN,
        ...p,
        id: item.id +"-"+ p.id,
        postId: item.id
      }
      const index = allPrograms.findIndex((e:any) => e.id === item.id +"-"+  p.id)
      if(index === -1  ){
        allPrograms.push(event)
      }
    }
  }
  allPrograms.sort( (a,b) => a.name.localeCompare(b.name));
  allPrograms.sort( (a,b) => {
    return Number(new Date(a.startDate)) - Number(new Date(b.startDate));
  });
  

  events.value = allPrograms
}

const { data } = await useAsyncData(
    'allCategories',
    () => find('catergories', {
    })
)

function closeBtn(){
  console.log("close")
  form.month = {
    start:null,
    end:null
  }
}

onMounted(async() => await search());
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
          <input id="keyword" v-model="form.name" @change="search"/>
        </div>
        <div class="item">
          <label for="month">{{t('month')}}</label>
          <VDatePicker v-model.range="form.month" mode="date" is-range :locale="calendarLang" @update:modelValue="search">
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
          <select id="category" v-model="form.category" :placeholder="t('category')" @change="search">
            <option value=""></option>
            <option v-for="item in data.data" :key="item.id" :value="item.id">{{ tObj('name', item.attributes) }}</option>
          </select>
        </div>
        <div class="item">
          <label for="location">{{t('location')}}</label>
          
          <select id="location" v-model="form.location" :placeholder="t('location')" @change="search">
            <option value=""></option>
            <option v-for="i in locationOptions" :key="i" :value="i" >{{pureT(i)}}</option>
          </select>
        </div>
        <button @click="search">{{  t('search') }}</button>
      </div>
      <div v-if="events.length > 0" class="eventList">
        <table style="width:100%">
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
        </table>
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
  border: 1px solid #eee;
  min-width: 100px;
  padding-inline: 24px;
  width:100%;
  max-width: 400px;
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
  &.table{
    background: #eee;
    font-size: .8rem;
    color: var(--primary-color);
  }
}
</style>