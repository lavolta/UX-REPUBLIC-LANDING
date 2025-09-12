<script lang="ts" setup>
import { useDefaultSeo } from '@/composable/useDefaultSeo'
import FakeCardSticky from '@/components/faker/FakerCardSticky.vue'
import FakeSection from '@/components/faker/FakeSection.vue'
import FakeHeadline from '@/components/faker/FakerHeadline.vue'

const fakeContent = {
  title: 'Créateur d\'expériences performantes centrées utilisateurs',
  subtitle: 'Précurseurs du design à Paris, nous avons grandi avec audace. Aujourd’hui, dans un paysage où les discours se ressemblent, nous choisissons de nous réinventer. Fidèles à nos valeurs — innovation, proximité, pragmatisme et partage — nous affirmons une nouvelle ambition : créer des expériences justes, utiles, performantes et profondément humaines.',
}
useDefaultSeo('home')
</script>
<template>
  <FakeSection>
    <h1>{{ $t('hero.title') }}</h1>
    <FakeHeadline
      :title="fakeContent.title"
      :subtitle="fakeContent.subtitle"
    />
  </FakeSection>
  <FakeCardSticky />
  <FakeSection />
</template>

<style lang="scss" scoped>
p {
  color: var(--testing-color);
}
</style>
