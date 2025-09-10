import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import {fr} from './src/locales'
const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  messages: { fr }
})

config.global.plugins = [i18n]
