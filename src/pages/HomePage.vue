<script lang="ts" setup>
import AgencySlider from '@/components/agency/AgencySliderComponent.vue'
import NewsGrid from '@/components/news-grid/NewsGrid.vue'
import ProjectGrid from '@/components/project-grid/ProjectGrid.vue'
import PresentationHero from '@/components/presentation/PresentationHero.vue'
import HeroBanner from '@/components/hero-banner/HeroBanner.vue'
import CountComponent from '@/components/count/CountComponent.vue'
import InfiniteScrollText from '@/components/infinite-scroll-text/InfiniteScrollText.vue'
import StarsIcon from '@/components/icons/StarsIcon.vue'
import StackSlider from '@/components/stack-slider/StackSlider.vue'
import {
  usePageTransition,
  useDefaultSeo,
} from '@/composable'
useDefaultSeo('home')
usePageTransition()
</script>
<template>
  <HeroBanner />
  <PresentationHero
    id="uxrepublic"
    background-color="black"
  >
    <template #title>
      {{ $t('uxrep.title') }}
    </template>
    <template #content>
      {{ $t('uxrep.content') }}
    </template>
    <template #secondaryContent>
      <CountComponent
        theme="white"
        :items="$tm('uxrep.count')"
      />
    </template>
  </PresentationHero>
  <StackSlider
    id="expert"
    :title="$t('skill.title')"
    :items="$tm('skill.items')"
  />
  <PresentationHero
    id="croissance"
    background-color="white"
  >
    <template #title>
      {{ $t('growth.title') }}
    </template>
    <template #content>
      {{ $t('growth.content') }}
    </template>
  </PresentationHero>
  <ProjectGrid id="reussites" />
  <AgencySlider
    id-agency="nos-agences"
  />
  <NewsGrid id="actus" />
  <InfiniteScrollText id="contacteznousinfinitescrollcontent">
    {{ $t('footer.infiniteTitle') }}
    <template #icon>
      <StarsIcon />
    </template>
  </InfiniteScrollText>
</template>
