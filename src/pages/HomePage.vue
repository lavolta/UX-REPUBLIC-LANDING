<script lang="ts" setup>
import { useDefaultSeo } from '@/composable/useDefaultSeo'
import NumberComponent from '@/components/numbers/NumberComponent.vue'
import PresentationHero from '@/components/presentation/PresentationHero.vue'
import FooterSection from '@/components/footer/FooterSection.vue'

useDefaultSeo('home')
</script>
<template>
  <PresentationHero />
  <NumberComponent />
  <FooterSection />
</template>

<style lang="scss" scoped>
.main-content {
  padding-bottom: 400px; // Correspond à la hauteur du footer

  @include mq(tablet) {
    padding-bottom: 350px;
  }

  @include mq(mobile) {
    padding-bottom: 300px;
  }

  @include mq(mobile-small) {
    padding-bottom: 250px;
  }
}
</style>
