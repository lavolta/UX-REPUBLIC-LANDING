import 'vue-i18n'
import type {
  CardExpertInterface,
  HeroBannerTextInterface,
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
    uxrep: {
      title: string
      content: string
      count: CountItem[]
    }
    skill: {
      title: string
      items: StackSliderItem[]
    }
    footer: {
      infiniteTitle: string
    }
    seo: {
      home: SeoPageInterface
      contact: SeoPageInterface
    }
    header: {
      navigation: NavigationItem[]
    }
    hero: {
      title: string
      subtitle: string
    }
    heroHome: HeroBannerTextInterface[]
    button: {
      navigationCta: string
      offerCta: string
      translateCta: string
      contactCta: string
    }
    tags: {
      accessibility: string
      security: string
      performance: string
    }
    expert: {
      title: string
      cards: CardExpertInterface[]
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
