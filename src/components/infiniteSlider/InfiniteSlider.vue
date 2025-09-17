<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// import type { InfiniteSliderItem } from '@/interfaces'
// defineProps<{
//   items: InfiniteSliderItem[]
// }>()
const stopMotion = ref(false)
onMounted(() => {
  console.log('toto', window)
  if (window && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('ici')
    stopMotion.value = true
  }
})
</script>
<template>
  <div class="slider">
    <ul class="slider__list">
      <li class="slider__item">
        <img
          src="/images/clients/deezer.svg"
          alt="picto"
        >
      </li>
      <li class="slider__item">
        <img
          src="/images/clients/radiofrance.png"
          alt="picto"
        >
      </li>
      <li class="slider__item">
        <img
          src="/images/clients/ratp.jpg"
          alt="picto"
        >
      </li>
      <li class="slider__item">
        <img
          src="/images/clients/leroymerlin.png"
          alt="picto"
        >
      </li>
      <li class="slider__item">
        <img
          src="/images/clients/casino.svg"
          alt="picto"
        >
      </li>
      <li class="slider__item">
        <img
          src="/images/clients/gameloft.png"
          alt="picto"
        >
      </li>

      <li
        class="slider__item"
        aria-hidden="true"
        style="background-color:red;"
      >
        <img
          src="/images/clients/deezer.svg"
          alt="picto"
        >
      </li>
      <li
        class="slider__item"
        aria-hidden="true"
      >
        <img
          src="/images/clients/radiofrance.png"
          alt="picto"
        >
      </li>
      <li
        class="slider__item"
        aria-hidden="true"
      >
        <img
          src="/images/clients/ratp.jpg"
          alt="picto"
        >
      </li>
      <li
        class="slider__item"
        aria-hidden="true"
      >
        <img
          src="/images/clients/leroymerlin.png"
          alt="picto"
        >
      </li>
      <li
        class="slider__item"
        aria-hidden="true"
      >
        <img
          src="/images/clients/casino.svg"
          alt="picto"
        >
      </li>
      <li
        class="slider__item"
        aria-hidden="true"
      >
        <img
          src="/images/clients/gameloft.png"
          alt="picto"
        >
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.slider {
  max-width: 64rem;
  border: 2px solid lime;

  &__list {
    display: flex;
    padding-block: 2rem;
    gap: 6.43rem;
  }

  &__item {
    flex-shrink: 0;
    height: 100%;

    img {
      display: block;
      width: auto;
      height: 45px;
    }
  }
}
</style>
