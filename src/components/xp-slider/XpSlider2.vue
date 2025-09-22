<script lang="ts" setup>
import { ref, useTemplateRef, computed, watch } from 'vue'
import {
  useEventListener,
  useElementBounding,
  useWindowScroll,
  useWindowSize,
} from '@vueuse/core'
import { xpItems } from '@/data'
const { height: windowHeight } = useWindowSize()
// MES REF AUX DIFFERENTS ITEM QUE JE CIBLE
const xpSection = useTemplateRef('xpSection')

// const xpbgcontainer = useTemplateRef('xpbgcontainer')
const { top: xpSectionTop, height: xpSectionHeight } = useElementBounding(xpSection)
const { y } = useWindowScroll()

const userScrollingBottom = ref(true)
const items = ref(xpItems)
const activeSlide = ref(0)
const blockingChangingActiveSlide = ref(false)
const lockUserOnSlider = ref(false)

const morThanThirdPartOnScreen = computed(() => {
  return Math.abs(xpSectionTop.value) <= xpSectionHeight.value / 3
})

watch(morThanThirdPartOnScreen, (newValue) => {
  if (lockUserOnSlider.value && !newValue) {
    lockUserOnSlider.value = false
  }
})

const edgeIntent = ref<null | 'top' | 'bottom'>(null)
const EDGE_RESET_MS = 500

const maybeUnlock = () => {
  if (blockingChangingActiveSlide.value) return

  // bas : sur la dernière slide
  if (userScrollingBottom.value && activeSlide.value === items.value.length - 1) {
    if (edgeIntent.value === 'bottom') {
      edgeIntent.value = null
      scrollOutsideOfXpSection(true)
    }
    else {
      edgeIntent.value = 'bottom'
      setTimeout(() => {
        if (edgeIntent.value === 'bottom') edgeIntent.value = null
      }, EDGE_RESET_MS)
    }
    return
  }
  else if (!userScrollingBottom.value && activeSlide.value === 0) {
    if (edgeIntent.value === 'top') {
      edgeIntent.value = null
      scrollOutsideOfXpSection(false)
    }
    else {
      edgeIntent.value = 'top'
      setTimeout(() => {
        if (edgeIntent.value === 'top') edgeIntent.value = null
      }, EDGE_RESET_MS)
    }
    return
  }

  // si on est au milieu, on réinitialise
  edgeIntent.value = null
}
// Si l'utilisateur scroll vers le haut et que l'activeSlide === 0 alors l'utilisateur peut aller vers le haut

const changeActiveSlide = () => {
  if (blockingChangingActiveSlide.value) {
    return
  }
  blockingChangingActiveSlide.value = true
  const tempValue = userScrollingBottom.value ? activeSlide.value + 1 : activeSlide.value - 1
  activeSlide.value = tempValue <= 0 ? 0 : tempValue >= items.value.length ? activeSlide.value : tempValue
  setTimeout(() => {
    blockingChangingActiveSlide.value = false
  }, 500)
}

const scrollOutsideOfXpSection = (goingToBottomOfTheSection: boolean) => {
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
}

const scrollToTopOfXpSection = () => {
  const offset = y.value + xpSectionTop?.value
  window.scrollTo({
    top: offset, // aligne le haut de la section à 0
    behavior: 'smooth',
  })
}

useEventListener(xpSection, 'wheel', (e) => {
  userScrollingBottom.value = e.deltaY > 0
  if (!lockUserOnSlider.value) {
    scrollToTopOfXpSection()
    blockingChangingActiveSlide.value = true
    lockUserOnSlider.value = true
    blockingChangingActiveSlide.value = false
    return
  }

  e.stopPropagation()
  e.preventDefault()
  changeActiveSlide()
  maybeUnlock()
}, { passive: true })

</script>
<template>
  <section
    ref="xpSection"
    class="xp"
  >
    <div class="xp__debugger">
      <span>
        Window Height: {{ windowHeight }} <br>
      </span>
      <span>
        Window Scroll: {{ y }} <br>
      </span>
      <span>
        Xp Section Top {{ xpSectionTop }}<br>
      </span>
      <span>
        Xp Section middle {{ }}
      </span>
      <span>
        Xp Section Height: {{ xpSectionHeight }}<br>
      </span>
      <span>
        More than half on screen {{ Math.abs(xpSectionTop) <= xpSectionHeight / 3 }}<br>
      </span>
      <span>blockingChangingActiveSlide :{{ blockingChangingActiveSlide }}<br></span>
      <span>lockUserOnSlider :{{ lockUserOnSlider }}<br></span>
    </div>
    <div class="xp__inner">
      <div class="xp__titlelist">
        <p
          v-for="(item, key) in items"
          :key="`xp-title-item-${key}`"
          class="xp__title"
          :class="{'actif': activeSlide === key}"
        >
          <span>
            0{{ key + 1 }}
          </span>
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

  // background-color: rgb(170 42 42);
  overflow: hidden;

  &__debugger {
    position: fixed;
    z-index: 200;
    right: 0;
    bottom: 0;
    padding: 2rem;
    background-color: white;
    color: black;
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
    align-items: center;
    width: 100%;
    max-width: var(--max-section-width);
    height: 100%;
    margin: 0 auto;

    // background-color: rgb(69 69 104);

    >div {
      width: 33.33%;
    }
  }

  &__title {
    span {
      display: block;

      &:first-child {
        margin-bottom: 2.1875rem;
        font-size: 1rem;
        font-weight: 200;
      }

      &:last-child {
        font-size: 2.375rem;
        font-weight: 400;
        line-height: 2.8125rem;
      }
    }

    &:not(.actif) {
      display: none;
    }
  }

  &__textlist {
    p {
      width: 100%;
      max-width: 20.25rem;
      margin-left: auto;
      font-size: 1.125rem;
      font-weight: 300;
      line-height: 1.875rem;

      &:not(.actif) {
        display: none;
      }
    }
  }

  &__picturelist {
    position: relative;
    width: 100%;
    padding-top: 33.33%;
    overflow: hidden;

    > img {
      display: block;
      position: absolute;
      top: 100%; left: 0;
      width: 100%;
      height: 100%;
      transition: var(--transition-timing);

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
