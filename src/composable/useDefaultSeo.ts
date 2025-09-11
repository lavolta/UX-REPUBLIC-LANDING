import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import type { PageType } from '@/types'
export function useDefaultSeo(page: PageType) {
  const { t, locale } = useI18n()

  useHead({
    title: t(`seo.${page}.title`),
    titleTemplate: '%s | MySite',
    htmlAttrs: {
      lang: locale.value,
    },
    meta: [
      {
        name: 'description',
        content: t(`seo.${page}.description`),
      },
    ],
  })
}
