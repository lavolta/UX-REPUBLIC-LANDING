import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import routes from './router'
import { en, fr } from './locales'

import './assets/scss/main.scss'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  ({ app }) => {
    const i18n = createI18n({
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
