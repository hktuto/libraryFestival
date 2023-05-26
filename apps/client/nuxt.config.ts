// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr:false,
    devtools: true,
    modules: ['@nuxtjs/strapi'],
    strapi: {
        devtools: true
      }
})
