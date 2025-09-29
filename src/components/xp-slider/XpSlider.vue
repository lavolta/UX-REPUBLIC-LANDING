<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import {
  useEventListener,
  useElementBounding,
  useWindowScroll,
} from '@vueuse/core'
import { xpItems } from '@/data'
import { globalStore } from '@/store'
// MES REF AUX DIFFERENTS ITEM QUE JE CIBLE
const xpSection = useTemplateRef('xpSection')

// const xpbgcontainer = useTemplateRef('xpbgcontainer')
const { top: xpSectionTop, height: xpSectionHeight } = useElementBounding(xpSection)
const { y } = useWindowScroll()

const items = ref(xpItems)
const activeSlide = ref(0)

const sliderFitWithTopOfTheViewport = ref(false)
const disableSlideTransition = ref(false)

const userGoingBottom = ref(true)

const scrollOutsideOfXpSection = (goingToBottomOfTheSection: boolean) => {
  if (!window) {
    return
  }
  let offset
  if (goingToBottomOfTheSection) {
    offset = y.value + xpSectionHeight.value
  }
  else {
    offset = y.value - xpSectionHeight.value
  }
  window.scrollTo({
    top: offset, // aligne le haut de la section à 0
    behavior: 'smooth',
  })
  setTimeout(() => {
    resetSliderState()
  }, 500)
}

const scrollToTopOfXpSection = () => {
  if (!window) {
    return
  }
  globalStore.setForcedHideHeader(true)
  const offset = y.value + xpSectionTop?.value
  window.scrollTo({
    top: offset, // aligne le haut de la section à 0
    behavior: 'smooth',
  })
  handleForcedHideHeader()
  sliderFitWithTopOfTheViewport.value = true
  setTimeout(() => {
    disableSlideTransition.value = false
  }, 200)
}
const resetSliderState = () => {
  disableSlideTransition.value = false
  sliderFitWithTopOfTheViewport.value = false
}
const handleChangeSlide = () => {
  disableSlideTransition.value = true
  const tempSlideIndex = userGoingBottom.value ? activeSlide.value + 1 : activeSlide.value - 1
  if (tempSlideIndex < 0) {
    scrollOutsideOfXpSection(false)
    return
  }
  else if (tempSlideIndex > items.value.length - 1) {
    scrollOutsideOfXpSection(true)
    return
  }
  activeSlide.value = tempSlideIndex
  setTimeout(() => {
    disableSlideTransition.value = false
  }, 500)
}
useEventListener(
  xpSection,
  'wheel',
  (e: WheelEvent) => {
    // Toujours empêcher le scroll natif dans la section
    e.stopPropagation()
    e.preventDefault()
    userGoingBottom.value = e.deltaY > 0

    if (!sliderFitWithTopOfTheViewport.value) {
      disableSlideTransition.value = true
      scrollToTopOfXpSection()
    }
    if (!disableSlideTransition.value) {
      handleChangeSlide()
    }
  },
  { passive: false }, // IMPORTANT pour que preventDefault() soit respecté
)

// Pour masquer le menu
const timoutIdentifier = ref()
const handleForcedHideHeader = () => {
  if (timoutIdentifier.value) {
    clearTimeout(timoutIdentifier.value)
  }
  timoutIdentifier.value = setTimeout(() => globalStore.setForcedHideHeader(false), 2000)
}

</script>
<template>
  <section
    ref="xpSection"
    class="xp"
  >
    <h2 class="xp__sectiontitle section-title">
      Nos expertises en action
    </h2>
    <div class="xp__inner">
      <div class="xp__titlelist">
        <p
          v-for="(item, key) in items"
          :key="`xp-title-item-${key}`"
          class="xp__title"
          :class="{'actif': activeSlide === key}"
        >
          <span class="xp__number">
            0{{ key + 1 }}
          </span>
          <!-- eslint-disable vue/no-v-html -->
          <span v-html="item.title" />
        </p>
      </div>
      <div class="xp__picturelist">
        <img
          v-for="(item, key) in items"
          :key="`xp-main-picture-${key}`"
          :src="item.mainpicture.href"
          :alt="item.mainpicture.alt"
          :class="{'actif': activeSlide >= key}"
          :style="{zIndex: 10 * key}"
        >
      </div>
      <div class="xp__textlist">
        <p
          v-for="(item, key) in items"
          :key="`xp-text-item-${key}`"
          :class="{'actif': activeSlide === key }"
        >
          {{ item.text }}
        </p>
        <div
          v-for="(item, key) in items"
          :key="`xp-tag-item-${key}`"
          class="xp__tags"
          :class="{'actif': activeSlide === key }"
        >
          <span
            v-for="(tag, keytag) in item.tags"
            :key="keytag"
            class="button"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="xp__bg"
    >
      <img
        v-for="(item, key) in items"
        :key="`xp-bg-item-${key}`"
        :src="item.secondarypicture.href"
        :alt="item.secondarypicture.alt"
        :class="{'actif': activeSlide >= key}"
        :style="{zIndex: 10 * key}"
      >
    </div>
  </section>
</template>
<style lang="scss" scoped>
.xp {
  --transition-timing: all cubic-bezier(0.65, 0.05, 0.36, 1) .5s;

  position: relative;
  width: 100%;
  height: 100vh;
  overscroll-behavior: contain;
  touch-action: pan-x;
  overflow: hidden;

  &__tags {
    display: none;
    flex-wrap: wrap;
    max-width: 20.25rem;
    margin-top: 1rem;
    margin-left: auto;

    &.actif {
      display: flex;
    }

    > .button {
      margin-right: 5px;
      margin-bottom: 5px;
      padding: 1rem;

      // Font size en 12px
      // font-size: 0.75rem;
      font-size: 1rem;
    }
  }

  &__debugger {
    position: fixed;
    z-index: 200;
    right: 0;
    bottom: 0;
    padding: 2rem;
    background-color: white;
    color: black;
  }

  &__sectiontitle {
    position: absolute;
    z-index: 3;
    top: 3.125rem;
    left: 2rem;
    width: 100%;
    max-width: var(--max-section-width);

    @include mq(desktop) {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &__bg {
    position: absolute;
    z-index: 1;
    inset: 0;

    > img {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition-timing);

      &.actif {
        top: 0;
      }
    }
  }

  &__inner {
    display: flex;
    position: relative;
    z-index: 2;
    flex-flow: column wrap;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    max-width: var(--max-section-width);
    height: 100%;
    margin: 0 auto;
    padding: 2rem;

    @include mq(desktop) {
      flex-flow: row nowrap;
      flex-wrap: nowrap;
      align-items: center;
      padding: 0;
    }

    // background-color: rgb(69 69 104);

    >div {
      width: 100%;

      @include mq(desktop) {
        width: 33.33%;
      }
    }
  }

  &__titlelist {
    position: relative;
    margin-bottom: 2rem;

    @include mq(desktop) {
      margin-bottom: 0;
    }
  }

  &__title {
    span {
      display: block;

      &:last-child {
        font-size: 1.19rem;
        font-weight: 400;
        line-height: 1.41rem;

        @include mq(desktop) {
          font-size: 2.375rem;
          line-height: 2.8125rem;
        }
      }
    }

    &:not(.actif) {
      display: none;
    }
  }

  &__number {
    position: relative;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 200;

    @include mq(desktop) {
      position: absolute;
      bottom: calc(100% + 2.1875rem);
      margin-bottom: 0;
    }
  }

  &__textlist {
    p {
      width: 100%;
      margin-top: 2rem;
      font-size: 1rem;
      font-weight: 300;
      line-height: 1.5rem;

      @include mq(desktop) {
        max-width: 20.25rem;
        margin-top: 0;
        margin-left: auto;
        font-size: 1.125rem;
        font-weight: 300;
        line-height: 1.875rem;
      }

      &:not(.actif) {
        display: none;
      }
    }
  }

  &__picturelist {
    position: relative;
    width: 15rem!important;
    height: 15rem;
    overflow: hidden;

    @include mq(tablet) {
      width: 50%!important;
      height: auto;
      padding-top: 50%;
    }

    @include mq(desktop) {
      width: 33.33%!important;
      padding-top: 33.33%;
    }

    > img {
      display: block;
      position: absolute;
      top: 100%; left: 0;
      width: 100%;
      height: 100%;
      transition: var(--transition-timing);
      border-radius: 3px;

      &.actif {
        top: 0;
      }
    }

    > div {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
