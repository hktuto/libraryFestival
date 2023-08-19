
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: {
        enabled: true,
    },
    css:['~/assets/app.scss'],
    modules:['nuxt-gtag', ],
    gtag: {
        id: process.env.google_analytics_id
      },
      extends:['../../packages/i18n'],
})
