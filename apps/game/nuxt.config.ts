
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: {
        enabled: true,
    },
    css:['~/assets/app.scss'],
    extends:['../../packages/i18n'],
})
