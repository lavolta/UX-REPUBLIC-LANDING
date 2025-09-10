<template>
  <h1>{{ $t('hero.title') }}</h1>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
console.log('i18n t', t('hero.title'))
</script>
