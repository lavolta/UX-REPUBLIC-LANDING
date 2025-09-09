import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  ssgOptions: {
    includedRoutes(paths: string[]) {
      // 1) normaliser: ajouter le slash, transformer '' -> '/'
      const norm = paths
        .map(p => (p === '' ? '/' : p))
        .map(p => (p.startsWith('/') ? p : `/${p}`))

      // 2) garder seulement les routes "concrètes"
      //    (pas de params dynamiques ni de variantes déjà préfixées)
      const base = norm.filter(p =>
        !p.includes(':') && !p.includes('(') && !p.startsWith('/fr') && !p.startsWith('/en')
      )

      // 3) dédupliquer
      const unique = Array.from(new Set(base))

      // 4) dupliquer uniquement en /en (pas de /fr)
      const out = new Set<string>()
      for (const p of unique) {
        out.add(p)                          // ex: '/', '/about'
        out.add(p === '/' ? '/en' : `/en${p}`) // ex: '/en', '/en/about'
      }
      return Array.from(out)
    },
  }
})
