<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

function toggle() {
  locale.value = locale.value === 'fr' ? 'en' : 'fr'
}
</script>

<template>
  <button @click="toggle">
    {{ locale === 'fr' ? 'EN' : 'FR' }}
  </button>
</template>
<style scoped>
pre {
  color: white;
}
</style>
