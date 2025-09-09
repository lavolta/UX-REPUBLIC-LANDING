import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, router } from './router'
import { en, fr } from '@/locales'
import {createI18n} from 'vue-i18n'
import {type AppLocale, isAppLocale} from '@/locales'
import './assets/scss/main.scss'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL
  },
  ({app}) => {
    const i18n = createI18n<import('vue-i18n').DefineLocaleMessage, AppLocale, false>({
      legacy: false,
      locale: 'fr',
      fallbackLocale: 'en',
      messages: { fr, en },
    })
    app.use(i18n)
    app.use(router)

    router.beforeEach((to, _from, next) => {
      const param = (to.params.locale as string) || 'fr'
      const nextLocale: AppLocale = isAppLocale(param) ? param : 'fr'

      if (i18n.global.locale.value !== nextLocale) {
        i18n.global.locale.value = nextLocale
      }
      next()
    })
  }
)
