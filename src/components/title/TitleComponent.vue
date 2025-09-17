<script setup lang="ts">
import { withDefaults } from 'vue'

interface Props {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  uppercase?: boolean
}

withDefaults(defineProps<Props>(), {
  tag: 'h2',
  uppercase: false,
})
</script>

<template>
  <component
    :is="tag"
    class="title"
    :style="{ textTransform: uppercase ? 'uppercase' : 'none' }"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.title {
  margin: 0;
  color: var(--color-white);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1rem;
  font-weight: 200;
  letter-spacing: 10%;
  line-height: 119%;

  &::first-letter {
    text-transform: uppercase;
  }
}
</style>
