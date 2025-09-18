<script lang="ts" setup>
import type { GridItemTextInterface } from '@/interfaces'
withDefaults(defineProps<{
  noLeftPadding?: boolean
  noRightPadding?: boolean
  item: GridItemTextInterface
}>(), {
  noLeftPadding: false,
  noRightPadding: false,
})
</script>
<template>
  <div
    class="news-grid-item"
    :class="{
      'no-left-p': noLeftPadding,
      'no-right-p': noRightPadding
    }"
  >
    <div>
      <h3 class="news-grid-item__title text-clamp text-clamp-1">
        {{ item.title }}
      </h3>
      <p
        v-if="item.text.length > 0"
        class="news-grid-item__text text-clamp text-clamp-3"
      >
        {{ item.text }}
      </p>
    </div>
    <div class="news-grid-item__info">
      <span>{{ item.date }}</span>
      <a
        :href="item.href"
        class="button"
        target="_blank"
      >
        <span>
          Lire la suite
        </span>
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.news-grid-item {
  $c: &;

  --lateral-padding: 1.5625rem;

  padding: 2.5rem var(--lateral-padding);

  &.no-left-p {
    #{$c}__info {
      left: 0;
    }

    padding-left: 0;
  }
  &.no-right-p {padding-right: 0;}

  &__title {
    margin-bottom: .875rem;
    font-size: 1.375rem;
    font-weight: 500;

    &:only-child {
      -webkit-line-clamp: 4;
    }
  }

  &__info {
    display: flex;
    position: absolute;
    bottom: 1.5rem;
    left: var(--lateral-padding);
    flex-direction: column;
    align-items: flex-start;

    span {
      margin-bottom: 1rem;
      font-size: 0.875rem;
      font-weight: 300;
    }
  }
}
</style>
