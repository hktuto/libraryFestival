<script setup lang="ts">
const props = defineProps<{
  programs: any[]
}>()
const { t, tObj } = useLang({
  tableDateEN:"Programme Date/Time",
  tableLocationEN:"Venue",
  tableRegisterEN:"Registration / Enquiry",
  tablePeriodEN:"Registration Period",
  tableDateHK:"活動日期及時間",
  tableLocationHK:"地點",
  tableRegisterHK:"報名及查詢",
  tablePeriodHK:"報名期",
  tableHostEN:"Host",
  tableTargetEN:"Target",
  tableQuotaEN:"Quota",
  tableHostHK:"講者/主持",
  tableTargetHK:"對象",
  tableQuotaHK:"名額",
});

 const filterPrograms = computed(() => {
   return props.programs.filter((program) => {
     return program.nameEN || program.displayTimeEN || program.locationEN || program.targetEN || program.quotaEN || program.registerEN || program.periodEN
   })
 })
</script>

<template>
<!--  <tr v-for="program in programs" :key="program.id">-->
<!--    <td><div class="label">{{ t('tableTarget') }}</div></td>-->
<!--    <td><div class="content" v-html="t('target')"></div></td>-->
<!--  </tr>-->
  <div class="eventDateContainer">

    <div v-for="program in filterPrograms" :key="program.id" class="program" >
      <div v-if="program.nameEN" class="eventContent">
        <div class="content mainColor" >{{tObj('name', program)}}</div>
      </div>
      <div v-if="program.displayTimeEN" class="eventContent">
        <div class="label">{{ t('tableDate') }}</div>
        <div class="content mainColor" >{{tObj('displayTime', program)}}</div>
      </div>
      <div v-if="program.locationEN" class="eventContent">
        <div class="label">{{ t('tableLocation') }}</div>
        <div class="content mainColor" >{{tObj('location', program)}}</div>
      </div>
      <div v-if="program.targetEN" class="eventContent" >
        <div class="label">{{ t('tableTarget') }}</div>
        <div class="content" v-html="tObj('target', program)"></div>
      </div>
      <div v-if="program.quotaEN" class="eventContent">
        <div class="label">{{ t('tableQuota') }}</div>
        <div class="content" v-html="tObj('quota', program)"></div>
      </div>
      <div v-if="program.registerEN" class="eventContent">
        <div class="label">{{ t('tableRegister') }}</div>
        <div class="content" v-html="tObj('register', program)"></div>
      </div>
      <div v-if="program.periodEN" class="eventContent">
        <div class="label">{{ t('tablePeriod') }}</div>
        <div class="content" v-html="tObj('period', program)"></div>
      </div>
    </div>
    
  </div>
</template>

<style scoped lang="scss">
.mainColor {
  color: var(--main-color);
}
.program {
  
  padding-block: var(--app-padding);
  border-top: 1px solid var(--main-color);
  .label {
    
  }
  &:last-child {
    border-bottom: 1px solid var(--main-color);
  }
}
.eventContent{
  margin-bottom: var(--app-padding);
}
</style>