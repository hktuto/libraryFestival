<template>
  <div class="footerContainer">
    {{attr.remarkEN}}
  </div>
</template>

<script lang="ts" setup>
import {useLang} from "~/composables/lang";
import {getStrapiData} from "~/utils/helpers";

const { find } = useStrapi()

const {currentLang} = useLang()

const attr = computed<string>(() => getStrapiData(data.value))

const { data, refresh, error } = await useAsyncData(
    'footerData',
    () => find('footer')
)
</script>