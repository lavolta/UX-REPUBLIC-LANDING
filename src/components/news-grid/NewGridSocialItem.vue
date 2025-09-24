<script setup lang="ts">
import type { GridItemSocialInterface } from '@/interfaces'

defineProps<{
  item: GridItemSocialInterface
  noLeftPadding?: boolean
  noRightPadding?: boolean
}>()

</script>

<template>
  <a
    class="social"
    :class="{
      'no-left-p': noLeftPadding,
      'no-right-p': noRightPadding
    }"
    :href="item.link"
    target="_blank"
  >
    <div class="social__inner">
      <div class="social__media">
        <img
          :src="`/images/icons/social/${item.socialType}.svg`"
          alt=""
        >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span
          class="social__text"
          v-html="item.title"
        />
      </div>
      <div

        class="social__button"
      >
        <span>
          {{ item.buttonText }}
        </span>
        <img
          src="/images/icons/social/follow-arrow.svg"
          :alt="`nous suivre sur ${item.socialType}`"
        >
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.social {
  --bg-color: #82828233;

  $c: &;

  display: block;
  padding: 0.9375rem;

  &.no-right-p {
    @include mq(desktop) {
      padding-right: 0;
    }
  }

  &.no-right-l {
    @include mq(desktop) {
      padding-left: 0;
    }
  }

  &:hover {
    #{$c}__button {
      img {
        transform: translateX(10px);
      }
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 2.125rem 1.375rem;
    background: var(--bg-color);
  }

  &__media {
    display: flex;
    align-items: center;
    gap: 1.625rem;

    > img {
      display: block;
      width: 3.125rem;
      height: 3.125rem;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-white);
  }

  &__text {
    color: var(--color-white);
    font-size: 1.375rem;
    font-weight: 500;
    line-height: 119%;
    text-align: left;
  }

  &__button {
    display: flex;
    font-weight: 300;

    img {
      transition: transform ease-in-out .2s;
    }

    span {
      display: block;
      margin-right: 2.8125rem;
    }

  }

}
</style>
