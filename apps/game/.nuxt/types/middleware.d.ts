import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/seantsang/Documents/work/library_festival/library-festival-web/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}