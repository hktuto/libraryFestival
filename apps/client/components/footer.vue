<template>
  <div class="footerContainer bgGradient">
    <div class="innerGrid">
      <div class="remark">
        {{attr.remarkEN}}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useLang} from "~/composables/lang";
import {getStrapiData} from "~/utils/helpers";
import {Footer} from '~/models/footer'
import {SingleResponse} from "~/models/strapi";
const { find } = useStrapi()

const {currentLang} = useLang()

const attr = computed(() => getStrapiData<Footer>(data.value))

const { data, refresh, error } = await useAsyncData(
    'footerData',
    () => find<SingleResponse<Footer>>('footer')
)
</script>

<style lang="scss" scoped> 
.innerGrid{
  padding: var(--app-padding);
}
.remark{
  font-size: .8rem;
  color: var(--text-body-color);
}
</style>