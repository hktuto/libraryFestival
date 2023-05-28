// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr:false,
    css:[
        '~/assets/style.scss'
    ],
    devtools: true,
    modules: ['nuxt-icon', '@nuxtjs/strapi'],
    strapi: {
        devtools: true
    },
    
})
