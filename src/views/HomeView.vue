<script lang="ts" setup>
import { useDefaultSeo } from '@/composable/useDefaultSeo'
import HeroComponent from '@/components/hero/HeroComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
import ExpertiseComponent from '@/components/expertise/ExpertiseComponent.vue'

useDefaultSeo('home')
</script>
<template>
  <div>
    <h1>{{ $t('hero.title') }}</h1>
    <HeroComponent />
    <ExpertiseComponent />
    <FooterComponent />
  </div>

</template>

<style lang="scss" scoped>
p {
  color: var(--testing-color);
}
</style>
