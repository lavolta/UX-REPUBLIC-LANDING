<script lang="ts" setup>
import FakeSection from '@/components/faker/FakeSection.vue'
import NewsGrid from '@/components/news-grid/NewsGrid.vue'
import ProjectGrid from '@/components/project-grid/ProjectGrid.vue'
import PresentationHero from '@/components/presentation/PresentationHero.vue'
import FooterSection from '@/components/footer/FooterSection.vue'
import HeroBanner from '@/components/hero-banner/HeroBanner.vue'
import { useDefaultSeo } from '@/composable/useDefaultSeo'

useDefaultSeo('home')
</script>
<template>
  <main class="main-section">
    <HeroBanner />
    <PresentationHero />
    <FakeSection color="teal" />
    <ProjectGrid />
    <FakeSection color="teal" />
    <NewsGrid />
  </main>
  <FooterSection />
</template>

<style lang="scss" scoped>
.main-section {
  position: relative;
  z-index: 10;
  margin-bottom: 42.3125rem;
  background-color: var(--color-bg);

}

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
