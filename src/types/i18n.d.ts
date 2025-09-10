import 'vue-i18n'

// https://vue-i18n.intlify.dev/guide/advanced/typescript
declare module 'vue-i18n' {
  export interface DefineLocaleMessage {
    hero: {
      title: string
      subtitle: string
    }
  }
}
