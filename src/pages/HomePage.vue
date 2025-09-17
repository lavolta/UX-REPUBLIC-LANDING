<script lang="ts" setup>
import { useDefaultSeo } from '@/composable/useDefaultSeo'
import FakeCardSticky from '@/components/faker/FakerCardSticky.vue'
import FakeSection from '@/components/faker/FakeSection.vue'
import FakeHeadline from '@/components/faker/FakerHeadline.vue'
import NavbarComponent from '@/components/navbar/NavbarComponent.vue'
import HeroStyle1 from '@/components/faker/hero/HeroStyle1.vue'
import ButtonComponent from '@/components/button/ButtonComponent.vue'
import StickyLogoHover from '@/components/logo/StickyLogoHover.vue'

const fakeContent = {
  title: 'Créateur d\'expériences performantes centrées utilisateurs',
  subtitle: 'Précurseurs du design à Paris, nous avons grandi avec audace. Aujourd’hui, dans un paysage où les discours se ressemblent, nous choisissons de nous réinventer. Fidèles à nos valeurs — innovation, proximité, pragmatisme et partage — nous affirmons une nouvelle ambition : créer des expériences justes, utiles, performantes et profondément humaines.',
}
useDefaultSeo('home')

const handleCtaClick = (index) => {
  console.log(`CTA ${index} a été cliqué`)
  // Ici vous pouvez ajouter la logique pour chaque CTA
}
</script>
<template>
  <StickyLogoHover
    :logos="[
      '/logos/logo.svg',
      '/logos/logo-2.svg',
      '/logos/logo-3.svg',
      '/logos/logo-4.svg',
      '/logos/logo-5.svg',
      '/logos/logo-6.svg',
      '/logos/logo-7.svg',
      '/logos/logo-8.svg',
      '/logos/logo-9.svg',
      '/logos/logo-10.svg'
    ]"
    alt-text="ux-republic"
  />
  <HeroStyle1 />
  <FakeSection>
    <FakeHeadline
      :title="fakeContent.title"
      :subtitle="fakeContent.subtitle"
    />
  </FakeSection>
  <FakeSection>
    <NavbarComponent @cta-click="handleCtaClick" />
    <ButtonComponent
      type="primary"
      size="large"
    >
      <span>{{ $t('button.contactCta') }}</span>
    </ButtonComponent>
    <ButtonComponent
      type="warning"
      size="large"
    >
      <span>{{ $t('tags.accessibility') }}</span>
    </ButtonComponent>
  </FakeSection>
  <FakeCardSticky />
  <FakeSection />
</template>

<style lang="scss" scoped>
p {
  color: var(--testing-color);
}
</style>
