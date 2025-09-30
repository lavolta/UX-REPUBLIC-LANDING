import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import routes from './router'
import { en, fr } from './locales'

import './assets/scss/main.scss'
import type { i18nLocalType } from '@/types'
type MessageSchema = import('vue-i18n').DefineLocaleMessage

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  ({ app }) => {
    const i18n = createI18n<[MessageSchema], i18nLocalType>({
      legacy: false,
      globalInjection: true,
      locale: 'fr',
      fallbackLocale: 'fr',
      messages: {
        fr,
        en,
      },
    })

    app.use(i18n)
  },
)
