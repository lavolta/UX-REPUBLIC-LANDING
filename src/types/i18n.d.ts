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
    agencies: {
      paris: {
        title: string
        address: string
      }
      bordeaux: {
        title: string
        address: string
      }
      lyon: {
        title: string
        address: string
      }
      lille: {
        title: string
        address: string
      }
      bellgique: {
        title: string
        address: string
      }
      suisse: {
        title: string
        address: string
      }
      luxembourge: {
        title: string
        address: string
      }
      paysbas: {
        title: string
        address: string
      }
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
