<script setup lang="ts">
import { ref } from 'vue'

const { logos, altText = 'Logo' } = defineProps<{
  logos: string[]
  altText?: string
}>()

const currentIndex = ref(0)
</script>

<template>
  <img
    :src="logos[currentIndex]"
    :alt="altText"
    class="sticky-logo"
    @mouseenter="currentIndex = (currentIndex + 1) % logos.length"
  >
</template>

<style lang="scss">
.sticky-logo {
  position: fixed;
  z-index: 1000;
  top: 0.875rem; // 14px
  left: 0.6875rem; // 11px
  width: 3.125rem; // 50px
  height: 3.125rem; // 50px
  padding: 0.25rem; // 4px
  transition: transform 0.2s ease;
  border-radius: 0.5rem; // 8px
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  cursor: pointer;
  object-fit: contain;

  &:hover {
    transform: scale(1.1);
  }

  // Responsive
  @include mq(tablet) {
    width: 3.75rem; // 60px
    height: 3.75rem; // 60px
  }

  @media (width <= 47.9375rem) { // 767px
    top: 0.625rem; // 10px
    left: 0.625rem; // 10px
    width: 2.5rem; // 40px
    height: 2.5rem; // 40px
  }
}
</style>
