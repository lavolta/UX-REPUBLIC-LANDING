<script lang="ts" setup>
import NewsGrid from '@/components/news-grid/NewsGrid.vue'
import ProjectGrid from '@/components/project-grid/ProjectGrid.vue'
import PresentationHero from '@/components/presentation/PresentationHero.vue'
import HeroBanner from '@/components/hero-banner/HeroBanner.vue'
import AgencySlider from '@/components/agency/AgencySliderComponent_GSAP.vue'
import XpSlider from '@/components/xp-slider/XpSlider_GSAP.vue'
import {
  usePageTransition,
  useDefaultSeo,
} from '@/composable'
import InfiniteScrollText from '@/components/infinite-scroll-text/InfiniteScrollText.vue'
import StarsIcon from '@/components/icons/StarsIcon.vue'
useDefaultSeo('home')
usePageTransition()
</script>
<template>
  <HeroBanner />
  <PresentationHero />
  <XpSlider id="xpslider-1" />
  <ProjectGrid />
  <AgencySlider id-agency="agency-1" />
  <NewsGrid />
  <InfiniteScrollText id="contacteznousinfinitescrollcontent">
    {{ $t('footer.infiniteTitle') }}
    <template #icon>
      <StarsIcon />
    </template>
  </InfiniteScrollText>
</template>
