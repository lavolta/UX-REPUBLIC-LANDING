<script lang="ts" setup>
import type { AgencyItemInterface } from '@/interfaces'
defineProps<{
  item: AgencyItemInterface
  actif: boolean
}>()
</script>
<template>
  <div
    class="agency-item"
    :data-theme="item.theme"
    :class="{
      'actif': actif
    }"
  >
    <h2 class="agency-item__title">
      <span>
        {{ item.title }}
      </span>
    </h2>
    <div>
      <p class="agency-item__address">
        {{ item.address }}
      </p>
      <a
        v-if="item.email"
        :href="`mailto:${item.email}`"
        class="agency-item__email"
      >
        {{ item.email }}
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.agency-item {
  $c: &;

  opacity: 0%;

  --animation: all ease-in-out .5s;
  --title-color: var(--agency-text-color);

  &[data-theme="theme-2"] {
    #{$c}__title {
      font-family: Carattere, cursive;
    }
  }

  &[data-theme="theme-3"] {
    #{$c}__title {
      font-family: "Bowlby One", sans-serif;
    }
  }

  &[data-theme="theme-4"] {
    #{$c}__title {
      font-family: "Dawning of a New Day", cursive;
    }
  }

  &[data-theme="theme-5"] {
    #{$c}__title {
      font-family: Questrial, sans-serif;
    }
  }

  &[data-theme="theme-6"] {
    #{$c}__title {
      font-family: "VT323", monospace;
    }
  }

  &[data-theme="theme-7"] {
    #{$c}__title {
      font-family: "Zen Loop", cursive;
    }
  }

  &.actif {
    opacity: 100%;
    #{$c}__title {
      >span {
        transform: translateY(0);
        opacity: 100%;
      }
    }
  }

  &.out {
    #{$c}__title {
      >span {
        transform: translateY(-3%);
      }
    }
  }

  >div {
    padding: 0 2rem;

    @include mq(desktop) {
      padding: 0;
    }
  }

  &__title {
    margin-bottom: 6.375rem;
    overflow: hidden;
    color: #C5C5C5;
    font-size: 6rem;
    font-weight: 400;
    line-height: 10rem;

    @include mq(desktop) {
      font-size: 14.375rem;
      font-weight: 400;
      line-height: 22.4rem;
    }

    > span {
      display: block;
      transform: translateY(-3%);
      transition: var(--animation);
      opacity: 0%;
    }

    // text-shadow: 0 0 2px var(--color-background);
  }

  &__address,
  &__email {
    color: #C5C5C5;
    font-weight: 300;
    line-height: 1;
  }

  &__email {
    text-decoration: underline;
  }

  &__address {
    &:not(:only-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>
