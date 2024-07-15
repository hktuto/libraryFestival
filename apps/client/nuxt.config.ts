
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr:false,
    css:[
        '~/assets/style.scss'
    ],
    nitro: {
        prerender: {
          crawlLinks: true,
          routes: [
            '/',
          ]
        }
      },
    runtimeConfig:{
        
        public: {
            google_analytics_id: process.env.google_analytics_id,
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
            siteName: '夏日圖書館節 2023 | Summer Library Festival 2023',
            siteDescription: '今年夏天，香港公共圖書館將以「玩樂大自然」為主題，舉辦「夏日圖書館節2023」。我們會於暑假期間，在各公共圖書館以實體或網上形式舉行閱讀活動，包括逾百場以兒童、青少年及成年人為對象的節目，例如手工藝工作坊、故事劇場、讀書會、故事分享會、專題講座、書籍展覽及原創音樂劇等。這些豐富多元的活動，不但有助擴闊參加者的閱讀領域，還能讓他們在以大自然為主題的故事、圖書、手工藝或表演中，體驗無窮樂趣。',
            language: 'en', 
        }
    },
    app:{
        head:{
            title: '夏日圖書館節 2023 | Summer Library Festival 2023',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name:'robots', content:'noindex' }
                ],
            }
    },
    devtools: true,
    modules: ['nuxt-icon', '@nuxtjs/strapi', 'nuxt-gtag'],
    extends:['../../packages/i18n'],
    gtag: {
        id: process.env.google_analytics_id
      },
    strapi: {
        // prefix: '/api',
        devtools: false,
    },
    
})
