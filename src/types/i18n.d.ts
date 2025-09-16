import 'vue-i18n'
import type { CardExpertInterface, HeroBannerTextInterface } from '@/interfaces'
// https://vue-i18n.intlify.dev/guide/advanced/typescript
declare module 'vue-i18n' {
  export interface DefineLocaleMessage {
    seo: {
      home: {
        title: string
        description: string
      }
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
  }
}
