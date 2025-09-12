<script lang="ts" setup>
import ButtonComponent from '@/components/button/ButtonComponent.vue'

const testcta = () => {
  console.log('waw <3')
}
</script>
<template>
  <ButtonComponent
    type="primary"
    size="large"
    @click="testcta"
  >
    <span>{{ $t('button.contactCta') }}</span>
  </ButtonComponent>
  <ButtonComponent
    type="redtags"
    size="large"
    @click="testcta"
  >
    <span>{{ $t('tags.accessibility') }}</span>
  </ButtonComponent>
  <section>
    <slot />
  </section>
</template>
<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-bg-dark);
}
</style>
