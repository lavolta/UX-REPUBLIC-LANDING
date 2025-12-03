import 'vue-i18n'
import type {
  NewsItemType,
  ProjectItemInterface,
  NavigationItem,
  SeoPageInterface,
  CountItem,
  StackSliderItem,
} from '@/interfaces'
// https://vue-i18n.intlify.dev/guide/advanced/typescript
declare module 'vue-i18n' {
  export interface DefineLocaleMessage {
    header: {
      navigation: NavigationItem[]
    }
    footer: {
      infiniteTitle: string
      contact: {
        title: string
        ctaItems: NavigationItem[]
      }
      copyRight: string
    }
    seo: {
      home: SeoPageInterface
      contact: SeoPageInterface
    }
    uxrep: {
      title: string
      content: string
      count: CountItem[]
    }
    skill: {
      title: string
      items: StackSliderItem[]
    }
    growth: {
      title: string
      content: string
    }
    agency: {
      title: string
    }
    project: {
      title: string
      items: ProjectItemInterface[]
    }
    news: {
      items: NewsItemType[]
    }
  }
}
