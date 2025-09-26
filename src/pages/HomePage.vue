<script lang="ts" setup>
import NewsGrid from '@/components/news-grid/NewsGrid.vue'
import ProjectGrid from '@/components/project-grid/ProjectGrid.vue'
import PresentationHero from '@/components/presentation/PresentationHero.vue'
import HeroBanner from '@/components/hero-banner/HeroBanner.vue'
import AgencyComponent from '@/components/agency/AgencyComponent.vue'
import XpSlider from '@/components/xp-slider/XpSlider.vue'

import { useDefaultSeo } from '@/composable/useDefaultSeo'
useDefaultSeo('home')
</script>
<template>
  <HeroBanner />
  <PresentationHero />
  <XpSlider />
  <ProjectGrid />
  <AgencyComponent />
  <NewsGrid />
</template>
