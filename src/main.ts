import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import routes from './router'
import './assets/scss/main.scss'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL
  },
  ({app}) => {
    const i18n = createI18n({
      locale: 'fr',
      fallbackLocale: 'fr',
      messages: {
        en: {
          hero: {
            title: 'Hero Title',
            subtitle: 'Hero Subtitle'
          }
        },
        fr: {
          hero: {
            title: 'Hero titre',
            subtitle: 'Hero sous titre'
          }
        }
      }
    })
    app.use(i18n)
  }
)
