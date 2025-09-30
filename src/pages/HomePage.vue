<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import NewsGrid from '@/components/news-grid/NewsGrid.vue'
import ProjectGrid from '@/components/project-grid/ProjectGrid.vue'
import PresentationHero from '@/components/presentation/PresentationHero.vue'
import HeroBanner from '@/components/hero-banner/HeroBanner.vue'
import AgencyComponent from '@/components/agency/AgencyComponent.vue'
import XpSlider from '@/components/xp-slider/XpSlider.vue'
import { useDefaultSeo } from '@/composable/useDefaultSeo'
import { useGsap, useGsapPlugins } from '@/composable'
useDefaultSeo('home')

const gsap = useGsap()
const { ScrollSmoother } = useGsapPlugins()
let ctx = null
onMounted(() => {
  if (!ctx) {
    ctx = gsap.context(() => {
      ScrollSmoother.create({
        smooth: 1,
        smoothTouch: 0.1,
      })
    })
  }
})
onUnmounted(() => {
  ctx?.revert()
})
</script>
<template>
  <HeroBanner />
  <PresentationHero />
  <XpSlider />
  <ProjectGrid />
  <AgencyComponent />
  <NewsGrid />
</template>
