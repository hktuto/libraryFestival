<script setup lang="ts">
import dayjs from 'dayjs'
const { find } = useStrapi();
const {t, tObj } = useLang({
  nameEN:"Programme Schedule",
  nameHK:"活動日程",
  noResultEN:"No Result",
  noResultHK:"未有活動",
  detailEN:"Event Details",
  detailHK:"了解詳情"
})

const events = ref<any[]>([]);


const router = useRouter()
function itemClick(item:any) {
  router.push({
    path: '/program/' + item.id
  })
}

const form = reactive({
  month: "",
  day: "",
  name: "",
  category:"",
  location:""
})

function dateStringToNumber(str:string):number{
  return Number(str.replaceAll('-',''))
}

async function search(){
  let filters:any = {
    $and:[]
  };
  if(form.month) {
    const startDate = '2023-' + form.month + "-01"
    const endDate = '2023-' + form.month + '-' + dayjs(startDate).daysInMonth()
    filters.$and.push(
        {
          programs : {
            startDate:{
              $gte: startDate,
            }
          }
        }
    )
  }
  const res = await find('events',{
    filters,
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
    if(form.month ){
      const startDate = '2023-' + form.month + "-01"
      const endDate = '2023-' + form.month + '-' + dayjs(startDate).daysInMonth()
      programs  = programs.filter((p:any) => p.startDate && dateStringToNumber(p.startDate) > dateStringToNumber(startDate) && dateStringToNumber(p.startDate) < dateStringToNumber(endDate) )  ;
    }
    for( const p of programs ) {
      const event = {
        titleEN: item.attributes.titleEN,
        titleHK: item.attributes.titleHK,
        locationHK: item.attributes.locationHK,
        locationEN: item.attributes.locationEN,
        ...p,
        id: item.id
        
      }
      allPrograms.push(event)
    }
  }
  allPrograms.sort( (a,b) => {
    return Number(new Date(a.startDate)) - Number(new Date(b.startDate));
  });
  events.value = allPrograms
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
        <input v-model="form.name" />
        <select v-model="form.month" >
          <option v-for="i in ['', '01','02','03','04','05','06','07','08','09','10','11','12']" :key="i" >{{i}}</option>
        </select>
        <button @click="search">Search</button>
      </div>
      <div v-if="events.length > 0" class="eventList">
        <table style="width:100%">
          <thead>
          <tr>
            <td width="20%">Time</td>
            <td>Title</td>
            <td>location</td>
            <td></td>
          </tr>
          </thead>
          <tr v-for="item in events" :key="item.id" >
            <td class="date">{{item.startDate}} - <br/> {{item.endDate}}</td>
            <td class="title">{{tObj('title', item)}}</td>
            <td class="location">{{tObj('location', item)}}</td>
            <td><button @click="$router.push({path:'/program/'+item.id})">{{t('detail')}}</button></td>
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
  border-bottom: 1px solid #eee;
}
.data{
  font-size: .8rem;
}
.location{
  font-weight: 300;
}

</style>