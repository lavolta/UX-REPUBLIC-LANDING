<script lang="ts" setup>
import { useElementVisibility } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import type { ProjectItemInterface } from '@/interfaces'
defineProps<{ item: ProjectItemInterface, number: string }>()
const target = useTemplateRef<HTMLDivElement>('target')
const targetIsVisible = useElementVisibility(target, {
  threshold: 0.8,
  once: true,
})
</script>
<template>
  <div
    ref="target"
    :class="[
      `project-item ${item.theme}`,
      {'actif': targetIsVisible}
    ]"
  >
    <div class="project-item__inner">
      <div class="project-item__media">
        <img
          :src="item.picture.href"
          :alt="item.picture.alt"
        >
      </div>
      <div class="project-item__content">
        <div>
          <span class="project-item__number">
            <span>{{ number }}</span>
          </span>
          <h3 class="project-item__title">
            <span>{{ item.title }}</span>
          </h3>
          <p class="project-item__text">
            <span>{{ item.content }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@keyframes slide-panel {
  0% {
    right: 100%;
  }

  25% {
    right: 0;
  }

  50% {
    right: 0;
    left: 0;
  }

  100% {
    right: 0;
    left: 100%;
  }
}

@keyframes switch-opacity {
  from {
    opacity: 0%;
  }

 to {
    opacity: 100%;
  }
}

.project-item {
  $c: &;

  --bezier: cubic-bezier(0.4, 0, 0.2, 1);

  &__inner {
    display: flex;
    align-items: start;
  }

  &.actif {
    #{$c}__media {
      &::before {
        animation-name: slide-panel;
        animation-duration: 1s;
        animation-timing-function: var(--bezier);
        animation-delay: 0s;
        animation-fill-mode: forwards;
      }

      > img {
        animation-name: switch-opacity;
        animation-fill-mode: forwards;
        animation-duration: .1s;
        animation-delay: .5s;
      }
    }

    #{$c}__title {
      >span {
        transform: translateY(0) rotate(0deg);
      }
    }
    #{$c}__text {
      >span {
        transform: translateY(0);
        opacity: 100%;
      }
    }
    #{$c}__number {
      transform: translateY(0);
      opacity: 100%;
    }
  }

  &__media {
    position: relative;
    flex-shrink: 0;
    width: 50%;
    max-width: 50%;
    height: auto;
    overflow: hidden;
    border-radius: 3px;

    &::before {
      content: '';
      position: absolute;
      z-index: 2;
      top: 0;
      right: 100%;
      left: 0;
      height: 100%;
      background-color: #2f3339;
    }

    @include mq(tablet) {
      width: 33.33%;
      max-width: 33.33%;
    }

    @include mq(desktop) {
      width: 100%;
      max-width: 13.4375rem;
    }

    > img {
      display: block;
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      opacity: 0%;
      object-fit: cover;
    }
  }

  &__content {
    width: 50%;
    padding-top: 4rem;

    @include mq(tablet) {
      width: 66.66%;
    }

    @include mq(desktop) {
      width: auto;
      padding-top: 7.5rem;
    }
  }

  &__number {
      display: block;
      margin-bottom: 1rem;
      transform: translateY(-50px);
      transition: all var(--bezier) .5s;
      transition-delay: .5s;
      opacity: 0%;
      font-size: 1rem;
      font-weight: 300;

      @include mq(desktop) {
        margin-bottom: 2.25rem;
        font-size: 1.25rem;
      }
  }

  &__title {
    margin-bottom: 1rem;
    overflow: hidden;
    font-size: 2rem;
    font-weight: 400;
    line-height: 2rem;

    > span {
      display: block;
      transform: translateY(100%) rotate(10deg);
      transform-origin: bottom left;
      transition: transform var(--bezier) .5s;
      transition-delay: .5s;
    }

    @include mq(desktop) {
      margin-bottom: 2.75rem;
      font-size: 2.375rem;
      line-height: 2.8125rem;
    }
  }

  &__text {
    overflow: hidden;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.8rem;

    > span {
      display: block;
      transform: translateY(50px);
      transform-origin: bottom left;
      transition: all var(--bezier) .5s;
      transition-delay: .6s;
      opacity: 0%;
    }

    @include mq(desktop) {
      font-size: 1.25rem;
      font-weight: 300;
      line-height: 2.25rem;
    }
  }

  &.theme-1 {
    #{$c}__inner {
      padding-left: 0;

      @include mq(desktop) {
        padding-left: 10.1%;
      }
    }
    #{$c}__media {
      position: relative;
      width: 100%;
      max-width: 50%;

      @include mq(tablet) {
        max-width: calc(33.33% + 2.93rem);
      }

      @include mq(desktop) {
        max-width: 19rem;
        height: 23.125rem;
      }

      > img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    #{$c}__content {
      width: 50%;
      padding-left: 2rem;

      @include mq(tablet) {
        width: calc(66.66% - 2.93rem);
      }

      @include mq(desktop) {
        padding-left: 1.2rem;
      }
    }
  }

  &.theme-2 {
    #{$c}__inner {
      flex-direction: row-reverse;
      justify-content: space-between;
    }
    #{$c}__media {
      position: relative;
      width: 50%;

      @include mq(tablet) {
        width: 100%;
        max-width: calc(33.33% + 8.03rem);
      }

      @include mq(desktop) {
        max-width: 19.5rem;
        height: 21.3125rem;
      }

      > img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    #{$c}__content {
      width: 50%;
      padding-top: 4rem;
      padding-left: 0;

      @include mq(tablet) {
        width: calc(66.66% - 2.93rem);
        max-width: calc(33.33% + 2.93rem);
      }

      @include mq(desktop) {
        width: auto;
        padding-top: 8.125rem;
        padding-left: 5.6%;
      }
    }
    #{$c}__text {
      width: 100%;
      max-width: 20.25rem;
    }
  }

  &.theme-3 {
    #{$c}__inner {
      padding-left: 0;

      @include mq(desktop) {
        padding-left: 8.5%;
      }
    }
    #{$c}__media {
      max-width: 100%;
      height: auto;

      @include mq(tablet) {
        max-width: 33.33%;
      }

      @include mq(desktop) {
        max-width: 20.25rem;
        height: 20rem;
      }
    }
    #{$c}__content {
      padding-left: 2rem;

      @include mq(tablet) {
        padding-left: 4.93rem;
      }

      @include mq(desktop) {
        padding-left: 6.8rem;
      }
    }
  }
}
</style>
