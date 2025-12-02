import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import routes from './router'
import { en, fr, es } from './locales'

// PLUGINS GSAP

import './assets/scss/main.scss'
import type { i18nLocalType } from '@/types'
type MessageSchema = import('vue-i18n').DefineLocaleMessage

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  ({ app, router }) => {
    const i18n = createI18n<[MessageSchema], i18nLocalType>({
      legacy: false,
      globalInjection: true,
      locale: 'fr',
      fallbackLocale: 'fr',
      messages: {
        fr,
        en,
        es,
      },
    })
    app.use(i18n)

    router.beforeEach((to) => {
      if (to.path.startsWith('/en')) {
        console.log('ici')
        i18n.global.locale.value = 'en'
      }
      else if (to.path.startsWith('/es')) {
        i18n.global.locale.value = 'es'
      }
      else {
        i18n.global.locale.value = 'fr'
      }
    })
  },
)
