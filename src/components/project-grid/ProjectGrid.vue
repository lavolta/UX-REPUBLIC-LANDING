<script lang="ts" setup>
import InfiniteScrollSlider from '@/components/infinite-scroll-slider/InfiniteScrollSlider.vue'
import ProjectGridBG from './ProjectGridBG.vue'
import ProjectItem from './ProjectItem.vue'
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
        <ProjectItem
          v-for="(item, key) in projectItems"
          :key="`project-item-${key}`"
          :item="item"
          :number="key + 1 < 10 ? `0${key + 1}` : `${key + 1}`"
        />
      </div>
    </div>
    <InfiniteScrollSlider />
  </section>
</template>
<style lang="scss" scoped>
.project-grid {
  position: relative;
  padding: 4rem 1rem;
  overflow: hidden;

  @include mq(smartphone) {
    padding: 4rem 2rem;
  }

  @include mq(desktop) {
    padding: 130px 0 190px;
  }

  &__inner {
    position: relative;
    width: 100%;
    max-width: var(--max-section-width);
    margin: 0 auto;
    padding-bottom:6rem;

    @include mq(smartphone) {
      padding-bottom:9.375rem;
    }
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
        margin-bottom: 4rem;

        @include mq(smartphone) {
          margin-bottom: 8rem;
        }

        @include mq(desktop) {
          margin-bottom: 4.25rem;
        }
      }
    }
  }
}
</style>
