<script lang="ts" setup>
import NewsGrid from '@/components/news-grid/NewsGrid.vue'
import ProjectGrid from '@/components/project-grid/ProjectGrid.vue'
import PresentationHero from '@/components/presentation/PresentationHero.vue'
import HeroBanner from '@/components/hero-banner/HeroBanner.vue'
import AgencySlider from '@/components/agency/AgencySliderComponent3.vue'
import CountComponent from '@/components/count/CountComponent.vue'
import InfiniteScrollText from '@/components/infinite-scroll-text/InfiniteScrollText.vue'
import StarsIcon from '@/components/icons/StarsIcon.vue'
import StackSlider from '@/components/stack-slider/StackSlider4.vue'
import {
  usePageTransition,
  useDefaultSeo,
} from '@/composable'

useDefaultSeo('home')
usePageTransition()
</script>
<template>
  <HeroBanner />
  <PresentationHero background-color="black">
    <template #title>
      UX-REPUBLIC
    </template>
    <template #content>
      Dompteur d'expériences digitales qui mettent l'utilisateur au centre. Précurseurs du design à Paris, nous avons grandi avec audace. Aujourd'hui, dans un paysage où les discours se ressemblent, nous choisissons de nous réinventer. Fidèles à nos valeurs — innovation, proximité, pragmatisme et partage — nous affirmons une nouvelle ambition : créer des expériences justes, utiles, performantes et profondément humaines.
    </template>
    <template #secondaryContent>
      <CountComponent theme="white" />
    </template>
  </PresentationHero>
  <StackSlider
    id="agencyStackSlider"
    title="Nos expertises en action"
  />
  <PresentationHero background-color="white">
    <template #title>
      Propulsez votre croissance
    </template>
    <template #content>
      Vous cherchez un partenaire pour aller au-delà du simple digital, captiver vos utilisateurs et propulser votre croissance ?
      Depuis plus de 12 ans, nos expertises transforment l'Expérience Utilisateur en un véritable levier stratégique.
    </template>
  </PresentationHero>
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
