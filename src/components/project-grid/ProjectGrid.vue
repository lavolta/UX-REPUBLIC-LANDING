<script lang="ts" setup>
import InfiniteScrollSlider from '@/components/infinite-scroll-slider/InfiniteScrollSlider.vue'
import ProjectGridBG from './ProjectGridBG.vue'
</script>
<template>
  <section class="project-grid">
    <ProjectGridBG />
    <div class="project-grid__inner">
      <p class="project-grid__title section-title">
        Nos réussites
      </p>
      <div class="project-grid__list grid">
        <div
          class="project-item project-item--first"
        >
          <div class="project-item__inner">
            <div class="project-item__media">
              <img
                src="/images/project/project-item-media-1.png"
                alt="Image verre Schmidt"
              >
            </div>
            <div class="project-item__content">
              <div>
                <span class="project-item__number">01</span>
                <h3 class="project-item__title">
                  BPCE
                </h3>
                <p class="project-item__text">
                  Nos experts UX/UI, Product et Analytics travaillent avec BPCE depuis 2017 pour optimiser leur performance digitale.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="project-item project-item--second"
        >
          <div class="project-item__inner">
            <div class="project-item__media">
              <img
                src="/images/project/project-item-media-2.png"
                alt="Image verre Schmidt"
              >
            </div>
            <div class="project-item__content">
              <div>
                <span class="project-item__number">02</span>
                <h3 class="project-item__title">
                  LVMH
                </h3>
                <p class="project-item__text">
                  Depuis 2014, notre design d'expérience accompagne LVMH, reflétant l'excellence initiée avec Louis Vuitton.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="project-item project-item--third"
        >
          <div class="project-item__inner">
            <div class="project-item__media">
              <img
                src="/images/project/project-item-media-3.png"
                alt="Image verre Schmidt"
              >
            </div>
            <div class="project-item__content">
              <div>
                <span class="project-item__number">03</span>
                <h3 class="project-item__title">
                  NAVBLUE
                </h3>
                <p class="project-item__text">
                  Partenaires de NAVBLUE (Groupe Airbus) depuis 2018, nous créons des produits digitaux qui assurent leur avance technologique.
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
        margin-bottom: 4.25rem;
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
    width: 100%;
    max-width: 13.4375rem;
    height: 21.25rem;
    overflow: hidden;
    border-radius: 3px;

    > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    padding-top: 7.5rem;
  }

  &__number {
      display: block;
      margin-bottom: 2.25rem;
      font-size: 1.25rem;
      font-weight: 300;
  }

  &__title {
    margin-bottom: 2.75rem;
    font-size: 2.375rem;
    font-weight: 400;
    line-height: 2.8125rem;
  }

  &__text {
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 2.25rem;
  }

  &--first {
    #{$c}__inner {
      padding-left: 0;

      @include mq(desktop) {
        padding-left: 10.1%;
      }
    }
    #{$c}__media {
      position: relative;
      max-width: 19rem;
      height: 23.125rem;

      > img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    #{$c}__content {
      padding-left: 2rem;

      @include mq(desktop) {
        padding-left: 2.8%;
      }
    }
  }

  &--second {
    #{$c}__inner {
      flex-direction: row-reverse;
      justify-content: space-between;
    }
    #{$c}__media {
      position: relative;
      max-width: 19.5rem;
      height: 21.3125rem;

      > img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    #{$c}__content {
      padding-top: 8.125rem;
      padding-left: 5.6%;
    }
    #{$c}__text {
      width: 100%;
      max-width: 20.25rem;
    }
  }

  &--third {
    #{$c}__inner {
      padding-left: 8.5%;
    }
    #{$c}__media {
      max-width: 20.25rem;
      height: 20rem;
    }
    #{$c}__content {
      padding-left: 14.4%;
    }
  }
}

</style>
