import {isProduction} from "std-env";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr:false,
    css:[
        '~/assets/style.scss'
    ],
    runtimeConfig:{
        public: {
            google_analytics_id: process.env.google_analytics_id,
            production_mode: isProduction
        }
    },
    devtools: true,
    modules: ['nuxt-icon', '@nuxtjs/strapi'],
    strapi: {
        devtools: true,
    },
    
})
