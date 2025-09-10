<script lang="ts" setup>
import { useDefaultSeo } from '@/composable/useDefaultSeo'
useDefaultSeo('home')
</script>
<template>
  <h1>{{ $t('hero.title') }}</h1>
  <p>
    coucou
  </p>
</template>

<style lang="scss" scoped>
p {
  color: var(--testing-color);
}
</style>
