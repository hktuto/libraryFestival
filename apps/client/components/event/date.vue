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
});
</script>

<template>
<!--  <tr v-for="program in programs" :key="program.id">-->
<!--    <td><div class="label">{{ t('tableTarget') }}</div></td>-->
<!--    <td><div class="content" v-html="t('target')"></div></td>-->
<!--  </tr>-->
  <div class="eventDateContainer">

    <div v-for="program in programs" :key="program.id" class="program" >
      <div class="eventContent">
        <div class="label">{{ t('tableDate') }}</div>
        <div class="content" >{{tObj('displayTime', program)}}</div>
      </div>
      <div class="eventContent">
        <div class="label">{{ t('tableLocation') }}</div>
        <div class="content" >{{tObj('location', program)}}</div>
      </div>
      <div class="eventContent">
        <div class="label">{{ t('tableRegister') }}</div>
        <div class="content" >{{tObj('register', program)}}</div>
      </div>
      <div class="eventContent">
        <div class="label">{{ t('tablePeriod') }}</div>
        <div class="content" v-html="tObj('period', program)"></div>
      </div>
    </div>
    
  </div>
</template>

<style scoped lang="scss">
.program {
  padding-block: var(--app-padding);
  & + & {
    border-top: 1px solid #eee;
  }
  .label {
    
  }
}
.eventContent{
  margin-bottom: var(--app-padding);
}
</style>