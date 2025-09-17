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
  top: 14px;
  left: 11px;
  width: 50px;
  height: 50px;
  padding: 4px;
  transition: transform 0.2s ease;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  cursor: pointer;
  object-fit: contain;

  &:hover {
    transform: scale(1.1);
  }

  // Responsive
  @include mq(tablet) {
    width: 60px;
    height: 60px;
  }

  @media (width <= 767px) {
    top: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
  }
}
</style>
