<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const inst = getCurrentInstance()
const { t, te, locale, availableLocales } = useI18n()

onMounted(() => {
  console.log('[i18n] has $t on globalProperties =',
    typeof inst?.appContext.config.globalProperties.$t)
  console.log('[i18n] locale =', locale.value)
  console.log('[i18n] availableLocales =', availableLocales)
  console.log('[i18n] te(hero.title) =', te('hero.title'))
  console.log('[i18n] t(hero.title) =', t('hero.title'))
})
</script>

<template>
  <pre style="white-space: pre-wrap">
    locale: {{ locale }}
    availableLocales: {{ availableLocales }}
    te(hero.title): {{ te('hero.title') }}
    t(hero.title): {{ t('hero.title') }}
  </pre>
</template>
