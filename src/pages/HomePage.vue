<script lang="ts" setup>
import { useDefaultSeo } from '@/composable/useDefaultSeo'
import FakeCardSticky from '@/components/faker/FakerCardSticky.vue'
import FakeSection from '@/components/faker/FakeSection.vue'
import FakeHeadline from '@/components/faker/FakerHeadline.vue'
import HeroStyle1 from '@/components/faker/hero/HeroStyle1.vue'
import ButtonComponent from '@/components/button/ButtonComponent.vue'

const fakeContent = {
  title: 'Créateur d\'expériences performantes centrées utilisateurs',
  subtitle: 'Précurseurs du design à Paris, nous avons grandi avec audace. Aujourd’hui, dans un paysage où les discours se ressemblent, nous choisissons de nous réinventer. Fidèles à nos valeurs — innovation, proximité, pragmatisme et partage — nous affirmons une nouvelle ambition : créer des expériences justes, utiles, performantes et profondément humaines.',
}
useDefaultSeo('home')
</script>
<template>
  <HeroStyle1 />
  <FakeSection>
    <FakeHeadline
      :title="fakeContent.title"
      :subtitle="fakeContent.subtitle"
    />
  </FakeSection>
  <FakeSection>
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
