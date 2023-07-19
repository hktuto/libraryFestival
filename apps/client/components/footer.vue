<template>
  <div class="footerContainer bgGradient">
    <div class="innerGrid">
      <div class="remark" v-html="t('remark')">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Footer} from '~/models/footer'
import {SingleResponse} from "~/models/strapi";
const { find } = useStrapi()



const attr = computed(() => getStrapiData<Footer>(data.value))

const { data, refresh, error } = await useAsyncData(
    'footerData',
    () => find<SingleResponse<Footer>>('footer')
)
const {currentLang, t} = useLang(attr.value)
</script>

<style lang="scss" scoped> 
.footerContainer{
  margin-top:2rem;
  width: 100%;
  padding-bottom: calc( var(--app-padding) * 4);
}
.innerGrid{
  padding: var(--app-padding);
}
.remark{
  font-size: .8rem;
  color: var(--text-body-color);
}
</style>