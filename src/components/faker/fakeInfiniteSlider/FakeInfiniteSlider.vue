<script lang="ts" setup>
import type { InfiniteSliderItem } from '@/interfaces'
import FakerHeadline from '@/components/faker/FakerHeadline.vue'
defineProps<{
  title?: string
  subtitle?: string
  sliderLists: InfiniteSliderItem[][]
}>()
</script>
<template>
  <div class="infinite-slider">
    <FakerHeadline
      v-if="title && subtitle"
      :title="title"
      :subtitle="subtitle"
    />
    <div class="infinite-slider__wrapper">
      <ul
        v-for="(sliderList, key) in sliderLists"
        :key="`sliderlist-${key}`"
        class="infinite-slider__list"
        :style="{ '--animation-duration': `${40 + ((key + 1) * 10)}s` }"
      >
        <li
          v-for="(sliderListItem, sliderListItemKey) in sliderList"
          :key="`sliderListeItem-${key}-${sliderListItemKey}`"
          class="infinite-slider__item"
          :style="{ '--i': String(sliderListItemKey + 1) }"
        >
          <img
            :src="sliderListItem.picture.href"
            :alt="sliderListItem.picture.alt"
          >
        </li>
        <li
          v-for="(sliderListItem, sliderListItemKey) in sliderList"
          :key="`sliderListeItem-${key}-${sliderListItemKey}`"
          class="infinite-slider__item"
          :style="{ '--i': String(sliderListItemKey + 1) }"
        >
          <img
            :src="sliderListItem.picture.href"
            :alt="sliderListItem.picture.alt"
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.infinite-slider {
  --slider-height: 3.125rem;

  padding: 8.5rem 0;
  background-color: var(--color-bg-dark);

  .headline {
    margin-bottom: 4.5625rem;
  }

  @keyframes slide {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-100%);
    }
  }

  &__wrapper {
    position: relative;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
    mask-image: linear-gradient(
      to right,
      rgb(0 0 0 / 0%),
      rgb(0 0 0 / 100%) 10%,
      rgb(0 0 0 / 100%) 90%,
      rgb(0 0 0 / 0%)
    );
  }

  &__list {
    display: block;
    height: var(--slider-height);
    animation: var(--animation-duration) slide infinite linear;

    &:not(:last-child) {
      margin-bottom: 3rem;
    }

    &:nth-child(even) {
      animation-direction: reverse;
    }

    &:hover {
      animation-play-state: paused;
    }
  }

  &__item {
      display: inline-block;
      height: var(--slider-height);
      margin: 0 40px;
      filter: grayscale(100%);
      transition: filter ease-in .3s;

      &:hover {
        filter: grayscale(0);
      }

      > img {
        display: block;
        height: var(--slider-height);
      }
  }
}
</style>
