import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp
    nuxtApp.vueApp.use(VCalendar, {})
})