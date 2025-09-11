<script lang="ts" setup>
import HeadlineComponent from '@/components/headline/HeadlineComponent.vue'
</script>

<template>
  <section class="hero">
    <HeadlineComponent
      title="UX Republic"
      description="Créateurs d'expériences digitales"
    />
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utilities/flex';

.hero {
  display: flex;
  justify-content: center;
  background: var(--dark-section);
  color: var(--dark-title-section);
}
</style>
