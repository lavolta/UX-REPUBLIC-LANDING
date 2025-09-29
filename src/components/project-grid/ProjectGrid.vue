<script lang="ts" setup>
import InfiniteScrollSlider from '@/components/infinite-scroll-slider/InfiniteScrollSlider.vue'
import ProjectGridBG from './ProjectGridBG.vue'
import { useI18n } from 'vue-i18n'
const { tm } = useI18n()
const projectItems = tm('project.items')

</script>
<template>
  <section class="project-grid">
    <ProjectGridBG />
    <div class="project-grid__inner">
      <p class="project-grid__title section-title">
        {{ $t('project.title') }}
      </p>
      <div class="project-grid__list grid">
        <div
          v-for="(item, key) in projectItems"
          :key="`project-item-${key}`"
          :class="`project-item ${item.theme}`"
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
                  {{ key + 1 < 10 ? `0${key + 1}` : key + 1 }}
                </span>
                <h3 class="project-item__title">
                  {{ item.title }}
                </h3>
                <p class="project-item__text">
                  {{ item.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <InfiniteScrollSlider />
  </section>
</template>
<style lang="scss" scoped>
.project-grid {
  position: relative;
  padding: 4rem 2rem;
  overflow: hidden;

  @include mq(desktop) {
    padding: 130px 0 190px;
  }

  &__inner {
    position: relative;
    width: 100%;
    max-width: var(--max-section-width);
    margin: 0 auto;
    padding-bottom:9.375rem;
  }

  &__title {
    position: relative;
    z-index: 2;
    margin-bottom: 2rem;

    @include mq(desktop) {
      margin-bottom: 4.625rem;
    }
  }

  &__list {
    display: block;
    position: relative;
    z-index: 2;

    @include mq(desktop) {
      display: grid;
      grid-template-areas:
      ". i1 i1 i1 i1 i1 i1 i1 . . . ."
      "i2 i2 i2 i2 i2 i2 i2 i2 i2 i2 i2 i2"
      ". . . . i3 i3 i3 i3 i3 i3 i3 i3";
      grid-template-rows: repeat(3, auto);
    }

    > div {
      &:nth-child(1) {grid-area: i1;}
      &:nth-child(2) {grid-area: i2;}
      &:nth-child(3) {grid-area: i3;}

      &:not(:last-child) {
        margin-bottom: 8rem;

        @include mq(desktop) {
          margin-bottom: 4.25rem;
        }
      }
    }
  }
}

.project-item {
  $c: &;

  &__inner {
    display: flex;
    align-items: start;
  }

  &__media {
    flex-shrink: 0;
    width: 50%;
    max-width: 50%;
    height: auto;
    overflow: hidden;
    border-radius: 3px;

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
      width: 100%;
      height: 100%;
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
      font-size: 1rem;
      font-weight: 300;

      @include mq(desktop) {
        margin-bottom: 2.25rem;
        font-size: 1.25rem;
      }
  }

  &__title {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 400;
    line-height: 2rem;

    @include mq(desktop) {
      margin-bottom: 2.75rem;
      font-size: 2.375rem;
      line-height: 2.8125rem;
    }
  }

  &__text {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.8rem;

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
