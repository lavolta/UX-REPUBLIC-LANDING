<script lang="ts" setup>
import { xpItems } from '@/data'
import {
  onMounted,
  onUnmounted,
  ref,
  useTemplateRef,
} from 'vue'
import { useSwipe } from '@vueuse/core'
import type {
  StackSliderConfig,
  StackSliderPropsInterface,
  StackSliderState,
  StackSliderObbserverType,
} from './StackSlider.interface'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { globalStore } from '@/store'

const props = defineProps<StackSliderPropsInterface>()
const stackSliderRef = useTemplateRef('stackSliderRef')
type GoToType = 'next' | 'prev'

const handleSwipeCurrentItem = (goTo: GoToType) => {
  if (!stackSliderItems) return
  globalStore.setForcedHideHeader(true)
  if (stackSliderState.value.isTransitionning) return
  const goToNextSlide = goTo === 'next'
  const tempIndex = goToNextSlide ? stackSliderState.value.currentIndex + 1 : stackSliderState.value.currentIndex - 1
  stackSliderState.value.isTransitionning = true
  if (tempIndex === -1) {
    stackSliderState.value.nextIndex = stackSliderItems.length - 1
  }
  else if (tempIndex >= stackSliderItems.length) {
    stackSliderState.value.nextIndex = 0
  }
  else {
    stackSliderState.value.nextIndex = tempIndex
  }
  if (goToNextSlide) {
    slideInMobile()
  }
  else {
    slideOutMobile()
  }
}
const isDesktopDevice = ref(false)
useSwipe(stackSliderRef, {
  onSwipeStart() {
    if (isDesktopDevice.value) return
    globalStore.scrollSmoother?.scrollTo(stackSliderRef.value, true)
  },
  onSwipeEnd(e, direction) {
    const leftOrRightDirection = direction === 'left' || direction === 'right'
    if (isDesktopDevice.value) return
    if (!leftOrRightDirection) return
    window.scrollTo({
      behavior: 'smooth',

    })
    globalStore.scrollSmoother?.scrollTo(stackSliderRef.value, true)
    globalStore.setForcedHideHeader(false)
    const goTo: GoToType = direction === 'left' ? 'next' : 'prev'
    handleSwipeCurrentItem(goTo)
  },
})

const stackSliderState = ref<StackSliderState>({
  currentIndex: 0,
  nextIndex: 0,
  allowScroll: false,
  isTransitionning: false,
  direction: 'down',
})

const stackSliderConfig: StackSliderConfig = {
  trigger: `#${props.id}`,
  items: `#${props.id} .stackslider-item`,
  itemImagesBg: `#${props.id} .stackslider-item__bg img`,
  itemImageCenter: `#${props.id} .stackslider-item__center img`,
  itemOuter: `#${props.id} .stackslider-item__outer`,
  itemInner: `#${props.id} .stackslider-item__inner`,
  itemTitle: `#${props.id} .stackslider-item__title`,
  itemTitleAnimationType: 'words',
  stackSliderTimelineParameter: {
    duration: 0.8,
    ease: 'slow.inOut',
  },
}

let stackSliderContext: gsap.Context | null = null
let stackSliderObserver: StackSliderObbserverType = null
let stackSliderScrollTrigger: ScrollTrigger | null = null
let stackSliderItems: HTMLElement[] | null = null

let stackSliderItemImageBg: HTMLElement[] | null = null
let stackSliderItemOuter: HTMLElement[] | null = null
let stackSliderItemInner: HTMLElement[] | null = null
let stackSliderItemTitle: HTMLElement[] | null = null
let stackSliderItemTitlesSplitted: SplitText[] | null = null

const userCheckAllSlide = ref<boolean>(false)

const handleSplitTitle = () => {
  if (!stackSliderItemTitle) return
  stackSliderItemTitlesSplitted = stackSliderItemTitle.map((title) => {
    return new SplitText(title, {
      type: stackSliderConfig.itemTitleAnimationType,
      linesClass: 'clip-text',
    })
  })
}

const revealSectionHeading = () => {
  if (!stackSliderItemTitlesSplitted) return
  return gsap.to(stackSliderItemTitlesSplitted[stackSliderState.value.nextIndex][stackSliderConfig.itemTitleAnimationType], {
    autoAlpha: 1,
    yPercent: 0,
    duration: 0.8,
    ease: 'power2',
    stagger: {
      each: 0.03,
      from: 'random',
    },
  })
}

const handleSlideIn = () => {
  if (!stackSliderItems) return
  const tempIndex = stackSliderState.value.currentIndex + 1
  if (tempIndex >= stackSliderItems.length) {
    stackSliderObserver?.disable()
    userCheckAllSlide.value = true
    return
  }
  stackSliderState.value.isTransitionning = true
  stackSliderState.value.nextIndex = tempIndex
  slideIn()
}

const slideIn = () => {
  if (!stackSliderItems || !stackSliderItemImageBg || !stackSliderItemOuter || !stackSliderItemInner) return

  const current = stackSliderState.value.currentIndex
  const next = stackSliderState.value.nextIndex
  const tlParams = stackSliderConfig.stackSliderTimelineParameter
  const headingTween = revealSectionHeading()

  gsap.set(stackSliderItems[current], { zIndex: 0 })
  gsap.set(stackSliderItems[next], { autoAlpha: 1, zIndex: 1 })
  gsap.set(stackSliderItemImageBg[next], { yPercent: 0 })

  if (stackSliderItemTitlesSplitted) {
    gsap.set(stackSliderItemTitlesSplitted[next][stackSliderConfig.itemTitleAnimationType], { autoAlpha: 0, yPercent: 80 })
  }

  const tl = gsap.timeline({
    defaults: tlParams,
    onComplete() {
      stackSliderState.value.currentIndex = next
      stackSliderState.value.isTransitionning = false
    },
  }).to([stackSliderItemOuter[next], stackSliderItemInner[next]], { yPercent: 0 }, 0)
    .from(stackSliderItemImageBg[next], { yPercent: 15 }, 0)

  if (headingTween) {
    tl.add(headingTween, 0)
  }

  if (current !== next && current >= 0) {
    tl.add(
      gsap.to(stackSliderItemImageBg[current], { yPercent: -15, ...tlParams }), 0,
    ).add(
      gsap.timeline()
        .set(stackSliderItemOuter[current], { yPercent: 100 })
        .set(stackSliderItemInner[current], { yPercent: -100 })
        .set(stackSliderItemImageBg[current], { yPercent: 0 })
        .set(stackSliderItems[current], { autoAlpha: 0 }),
    )
  }
}

const slideInMobile = () => {
  if (!stackSliderItems || !stackSliderItemImageBg || !stackSliderItemOuter || !stackSliderItemInner) return

  const current = stackSliderState.value.currentIndex
  const next = stackSliderState.value.nextIndex
  const tlParams = stackSliderConfig.stackSliderTimelineParameter
  const headingTween = revealSectionHeading()

  gsap.set(stackSliderItems[current], { zIndex: 0 })
  gsap.set(stackSliderItems[next], { autoAlpha: 1, zIndex: 1 })
  gsap.set(stackSliderItemImageBg[next], { xPercent: 0 })

  if (stackSliderItemTitlesSplitted) {
    gsap.set(stackSliderItemTitlesSplitted[next][stackSliderConfig.itemTitleAnimationType], { autoAlpha: 0, yPercent: 80 })
  }

  const tl = gsap.timeline({
    defaults: tlParams,
    onComplete() {
      stackSliderState.value.currentIndex = next
      stackSliderState.value.isTransitionning = false
      globalStore.setForcedHideHeader(false)
    },
  }).to([stackSliderItemOuter[next], stackSliderItemInner[next]], { xPercent: 0 }, 0)
    .from(stackSliderItemImageBg[next], { xPercent: 15 }, 0)

  if (headingTween) {
    tl.add(headingTween, 0)
  }

  if (current !== next && current >= 0) {
    tl.add(
      gsap.to(stackSliderItemImageBg[current], { xPercent: -15, ...tlParams }), 0,
    ).add(
      gsap.timeline()
        .set(stackSliderItemOuter[current], { xPercent: 100 })
        .set(stackSliderItemInner[current], { xPercent: -100 })
        .set(stackSliderItemImageBg[current], { xPercent: 0 })
        .set(stackSliderItems[current], { autoAlpha: 0 }),
    )
  }
}

const handleSlideOut = () => {
  if (!stackSliderItems) return
  const tempIndex = stackSliderState.value.currentIndex - 1
  if (tempIndex < 0) {
    stackSliderObserver?.disable()
    return
  }
  stackSliderState.value.isTransitionning = true
  stackSliderState.value.nextIndex = tempIndex
  slideOut()
}

const slideOutMobile = () => {
  if (!stackSliderItems || !stackSliderItemImageBg || !stackSliderItemOuter || !stackSliderItemInner) return

  const current = stackSliderState.value.currentIndex
  const next = stackSliderState.value.nextIndex
  const tlParams = stackSliderConfig.stackSliderTimelineParameter
  const headingTween = revealSectionHeading()

  gsap.set(stackSliderItems[current], { zIndex: 1 })
  gsap.set(stackSliderItems[next], { autoAlpha: 1, zIndex: 0 })
  gsap.set(stackSliderItemImageBg[next], { xPercent: 0 })
  gsap.set([stackSliderItemOuter[next], stackSliderItemInner[next]], { xPercent: 0 })

  if (stackSliderItemTitlesSplitted) {
    gsap.set(stackSliderItemTitlesSplitted[next][stackSliderConfig.itemTitleAnimationType], { autoAlpha: 0, yPercent: 80 })
  }

  const tl = gsap.timeline({
    defaults: tlParams,
    onComplete() {
      stackSliderState.value.currentIndex = next
      stackSliderState.value.isTransitionning = false
      globalStore.setForcedHideHeader(false)
    },
  })
    .to(stackSliderItemOuter[current], { xPercent: 100 }, 0)
    .to(stackSliderItemInner[current], { xPercent: -100 }, 0)
    .to(stackSliderItemImageBg[current], { xPercent: 15 }, 0)
    .from(stackSliderItemImageBg[next], { xPercent: -15 }, 0)
    .set(stackSliderItemImageBg[current], { xPercent: 0 })

  if (headingTween) {
    tl.add(headingTween, '>-1')
  }
}

const slideOut = () => {
  if (!stackSliderItems || !stackSliderItemImageBg || !stackSliderItemOuter || !stackSliderItemInner) return

  const current = stackSliderState.value.currentIndex
  const next = stackSliderState.value.nextIndex
  const tlParams = stackSliderConfig.stackSliderTimelineParameter
  const headingTween = revealSectionHeading()

  gsap.set(stackSliderItems[current], { zIndex: 1 })
  gsap.set(stackSliderItems[next], { autoAlpha: 1, zIndex: 0 })
  gsap.set(stackSliderItemImageBg[next], { yPercent: 0 })
  gsap.set([stackSliderItemOuter[next], stackSliderItemInner[next]], { yPercent: 0 })

  if (stackSliderItemTitlesSplitted) {
    gsap.set(stackSliderItemTitlesSplitted[next][stackSliderConfig.itemTitleAnimationType], { autoAlpha: 0, yPercent: 80 })
  }

  const tl = gsap.timeline({
    defaults: tlParams,
    onComplete() {
      stackSliderState.value.currentIndex = next
      stackSliderState.value.isTransitionning = false
    },
  })
    .to(stackSliderItemOuter[current], { yPercent: 100 }, 0)
    .to(stackSliderItemInner[current], { yPercent: -100 }, 0)
    .to(stackSliderItemImageBg[current], { yPercent: 15 }, 0)
    .from(stackSliderItemImageBg[next], { yPercent: -15 }, 0)
    .set(stackSliderItemImageBg[current], { yPercent: 0 })

  if (headingTween) {
    tl.add(headingTween, '>-1')
  }
}

const isMobileDevice = ref<boolean | null>(null)
const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  // Vérifie la présence d'un écran tactile (mobile ou tablette)
  return (
    ('ontouchstart' in window && navigator.maxTouchPoints > 0)
    || navigator.userAgent.toLowerCase().includes('mobile')
    || navigator.userAgent.toLowerCase().includes('android')
    || navigator.userAgent.toLowerCase().includes('iphone')
    || navigator.userAgent.toLowerCase().includes('ipad')
  )
}

const createStackSliderObserver = (isDesktop: boolean) => {
  if (stackSliderObserver) {
    stackSliderObserver.kill()
    stackSliderObserver = null
  }
  if (!isDesktop) return
  stackSliderObserver = ScrollTrigger.observe({
    type: 'wheel',
    preventDefault: true,
    tolerance: 10,
    onEnable(self) {
      globalStore.setForcedHideHeader(true)
      if (isDesktop) {
        const savedScroll = self.scrollY()
        self._restoreScroll = () => {
          globalStore.scrollSmoother?.scrollTop(savedScroll)
          self.scrollY(savedScroll)
        }
        document.addEventListener('scroll', self._restoreScroll, { passive: false })
      }
    },

    onDisable(self) {
      globalStore.setForcedHideHeader(false)
      if (isDesktop) {
        document.removeEventListener('scroll', self._restoreScroll)
      }
    },

    onUp() {
      if (stackSliderState.value.isTransitionning) return
      if (isDesktop) {
        handleSlideOut()
      }
      else {
        handleSlideIn()
      }
    },

    onDown() {
      if (stackSliderState.value.isTransitionning) return
      if (isDesktop) {
        handleSlideIn()
      }
      else {
        handleSlideOut()
      }
    },
  })
  stackSliderObserver.disable()
}

const createStackSliderScrollTriger = (isDesktop: boolean) => {
  if (stackSliderScrollTrigger) {
    stackSliderScrollTrigger.kill()
    stackSliderScrollTrigger = null
  }

  stackSliderScrollTrigger = ScrollTrigger.create({
    trigger: stackSliderConfig.trigger,
    start: 'top top',
    pin: isDesktop,
    end: !isDesktop ? '0' : '+=200',
    onEnter(self) {
      if (!isDesktop) return
      if (userCheckAllSlide.value) return
      if (stackSliderObserver?.isEnabled) return
      // On jump d'un pixel pour pouvoir fixer l'utilisateur dans la section
      self.scroll(self.start + 1)
      switchStackSliderObserver(true)
    },
    onEnterBack(self) {
      if (!isDesktop) return
      if (userCheckAllSlide.value) return
      if (stackSliderObserver?.isEnabled) return
      self.scroll(self.end - 1)
      switchStackSliderObserver(true)
    },
  })
}

const switchStackSliderObserver = (enableObserver: boolean) => {
  if (globalStore.disabledObserver) return
  if (!stackSliderObserver) return
  if (enableObserver) {
    stackSliderObserver.enable()
  }
  else {
    stackSliderObserver.disable()
  }
}

const handleSetDefaultGsapValue = (isDesktop: boolean) => {
  stackSliderItems = gsap.utils.toArray<HTMLElement>(stackSliderConfig.items)

  if (!stackSliderItems) return

  stackSliderItemImageBg = gsap.utils.toArray<HTMLElement>(stackSliderConfig.itemImagesBg)
  stackSliderItemOuter = gsap.utils.toArray<HTMLElement>(stackSliderConfig.itemOuter)
  stackSliderItemInner = gsap.utils.toArray<HTMLElement>(stackSliderConfig.itemInner)
  stackSliderItemTitle = gsap.utils.toArray<HTMLElement>(stackSliderConfig.itemTitle)

  handleSplitTitle()
  if (isDesktop) {
    gsap.set(stackSliderItemOuter, { yPercent: 100 })
    gsap.set(stackSliderItemInner, { yPercent: -100 })
    slideIn()
  }
  else {
    gsap.set(stackSliderItemOuter, { xPercent: 100 })
    gsap.set(stackSliderItemInner, { xPercent: -100 })
    slideInMobile()
  }
}

const timerIdForceHideHeader = ref<null | number>(null)
const handleScrollOnTopOfStackSlider = async () => {
  globalStore.setForcedHideHeader(true)

  window.scrollTo({
    behavior: 'smooth',

  })
  globalStore.scrollSmoother?.scrollTo(stackSliderRef.value, true)
  if (timerIdForceHideHeader.value) {
    clearTimeout(timerIdForceHideHeader.value)
    timerIdForceHideHeader.value = null
  }
  timerIdForceHideHeader.value = setTimeout(() => {
    globalStore.setForcedHideHeader(false)
  }, 1000)
}
const handleClickOnDot = (value: number) => {
  const tempIndex = stackSliderState.value.currentIndex
  const goToNextItem = value > tempIndex
  stackSliderState.value.nextIndex = value
  handleScrollOnTopOfStackSlider()
  if (goToNextItem) {
    slideInMobile()
  }
  else {
    slideOutMobile()
  }
}

const handlePrevSlide = () => {
  if (!stackSliderItems) return
  if (stackSliderState.value.isTransitionning) return
  handleScrollOnTopOfStackSlider()

  const tempIndex = stackSliderState.value.currentIndex - 1
  if (tempIndex < 0) return
  stackSliderState.value.isTransitionning = true
  stackSliderState.value.nextIndex = tempIndex
  slideOut()
}

const handleNextSlide = () => {
  if (!stackSliderItems) return
  if (stackSliderState.value.isTransitionning) return
  handleScrollOnTopOfStackSlider()
  const tempIndex = stackSliderState.value.currentIndex + 1
  if (tempIndex >= stackSliderItems.length) return
  stackSliderState.value.isTransitionning = true
  stackSliderState.value.nextIndex = tempIndex
  slideIn()
}

onMounted(() => {
  isMobileDevice.value = isTouchDevice()
  stackSliderContext = gsap.context(() => {
    const mm = gsap.matchMedia()
    mm.add({
      isDesktop: '(min-width:1280px)',
      isMobile: '(min-width:200px)',
    }, (context) => {
      const { isDesktop } = context.conditions
      isDesktopDevice.value = isDesktop
      handleSetDefaultGsapValue(isDesktop)
      createStackSliderObserver(isDesktop)
      createStackSliderScrollTriger(isDesktop)
    })
  })

  if (stackSliderScrollTrigger) {
    stackSliderScrollTrigger.refresh()
  }
})

onUnmounted(() => {
  if (stackSliderContext) {
    stackSliderContext.revert()
  }
})
</script>
<template>
  <div
    :id="id"
    ref="stackSliderRef"
    class="stackslider"
  >
    <div class="stackslider__title">
      <p class="section-title">
        {{ title }}
      </p>
    </div>
    <div class="stackslider__content">
      <section
        v-for="(item, key) in xpItems"
        :key="`stackslider-item-${key}`"
        class="stackslider-item"
      >
        <div class="stackslider-item__outer">
          <div class="stackslider-item__inner">
            <div class="stackslider-item__content">
              <div class="stackslider-item__left">
                <span class="stackslider-item__number">
                  {{ (key + 1 < 10) ? `0${key + 1}` : `${key + 1}` }}
                </span>
                <span
                  class="stackslider-item__title"
                  v-html="item.title"
                />
              </div>
              <div class="stackslider-item__center">
                <img
                  :src="item.mainpicture.href"
                  :alt="item.mainpicture.alt"
                >
              </div>
              <div class="stackslider-item__right">
                <div
                  v-if="item.text"
                  class="stackslider-item__text"
                >
                  <p v-html="item.text" />
                </div>
                <div class="stackslider-item__tags">
                  <span
                    v-for="(tag, keyTag) in item.tags"
                    :key="`stackslider-item-tag-${key}-${keyTag}`"
                    class="stackslider-item__tag button"
                  >
                    <span>#</span>{{ tag }}
                  </span>
                </div>
              </div>
            </div>
            <div class="stackslider-item__bg">
              <img
                :src="item.secondarypicture.href"
                :alt="item.secondarypicture.alt"
              >
            </div>
          </div>
        </div>
      </section>
    </div>
    <div
      class="stackslider__dots"
    >
      <button
        v-for="(item, key) in xpItems"
        :key="`${props.id}-dot-${key}`"
        class="stackslider__dot"
        :class="{'actif': stackSliderState.currentIndex === key}"
        :aria-label="`afficher item ${key}`"
        @click="handleClickOnDot(key)"
      />
    </div>
    <div
      class="stackslider__arrows"
      :class="{'visible': userCheckAllSlide}"
    >
      <button @click="handlePrevSlide">
        &lt;
      </button>
      <button @click="handleNextSlide">
        &gt;
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.stackslider {
  $c: &;

  position: relative;
  width: 100%;
  height: var(--window-height);
  overflow: hidden;

  @include mq(desktop) {
    height: 100vh;
  }

  &__title {
    // display: none;
    position: absolute;
    z-index: 2;
    top: 3.125rem;
    left: 0;
    width: 100%;

    @include mq(desktop) {
      display: block;
    }

    p {
      width: 100%;
      max-width: var(--max-section-width);
      margin: 0 auto;
      padding: 0 1rem;

      @include mq(smartphone) {
        padding: 0 2rem;
      }

      @include mq(desktop) {
        padding: 0;
      }
    }
  }

  &__dots {
    display: flex;
    position: absolute;
    z-index: 30;
    bottom: 47px;
    left: 0;
    justify-content: center;
    width: 100%;

    @include mq(desktop) {
      display: none;
    }
  }

  &__dot {
    display: block;
    width: 10px;
    height: 10px;
    transition: all ease-in .2s;

    &.actif {
      background-color: #D9D9D9;
    }

    border-radius: 99rem;
    background-color: #595959;

    &:not(:last-child) {
      margin-right: 7px;
    }
  }

  &__arrows {
    display: none;
    position: absolute;
    z-index: 30;
    right: 0;
    bottom: 0;
    padding: 2rem;
    transform: translateY(100%);
    transition: all ease-in .2s;

    @include mq(desktop) {
      display: flex;
    }

    &.visible {
      transform: translateY(0);
    }

    >button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      transition: all ease-in .2s;
      border: 1px solid var(--color-white);
      border-radius: 99rem;
      background-color: transparent;

      &:hover {
        background-color: var(--color-white);
        color: var(--color-bg);
        cursor: pointer;
      }

      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }

  &__content {
    position: relative;
  }
}

.stackslider-item {
    $c: &;

    display: flex;
    visibility: hidden;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: var(--window-height);
    will-change: transform;
    overflow: hidden;

    @include mq(desktop) {
      min-height: 100vh;
    }

    --bg-gradient: radial-gradient(circle,rgb(0 0 0 / 40%) 0%, rgb(0 0 0 / 0%) 100%);

    &__inner {
      padding: 3.75rem 2.5rem 3.562rem;

      @include mq(smartphone) {
        padding: 2.06rem 1.25rem;
      }

      @include mq(desktop) {
        padding: 0;
      }
    }

    &__left {
      margin-bottom: 1.743rem;

      @include mq(desktop) {
        margin-bottom: 0;
      }
    }

    &__content {
      display: flex;
      position: relative;
      z-index: 4;
      flex-flow: column wrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: var(--max-section-width);
      height: 100%;
      margin: 0 auto;

      @include mq(desktop) {
        flex-flow: row nowrap;
        justify-content: center;
      }

      > div {
        width: 100%;

        @include mq(desktop) {
          width: 33.33%;
        }
      }
    }

    &__number {
      display: block;
      position: relative;
      margin-bottom: 1.6875rem;
      font-size: 1rem;
      font-weight: 200;
      text-align: center;

      @include mq(desktop) {
        margin-bottom: 2.125rem;
        text-align: left;
      }
    }

    &__title {
      display: block;
      font-size: 2rem;
      line-height: 2.1rem;
      text-align: center;

      @include mq(xsphone) {
        font-size: 2.375rem;
        font-weight: 400;
        line-height: 2.8125rem;
      }

      @include mq(desktop) {
        font-size: 2.375rem;
        line-height: 2.8125rem;
        text-align: left;
      }

      .clip-text {
        overflow: hidden;
      }
    }

    &__center {
      display: none;
      position: relative;
      flex: 0 0 auto;
      padding-top: 100%;
      overflow: hidden;
      border-radius:  3px;

      @include mq(desktop) {
        display: block;
        flex: 0 0 33.33%;
        padding-top: 33.33%;
      }

      >img {
        display: block;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__right {
      padding-top: 2rem;

      @include mq(desktop) {
        padding-top: 0;
        padding-left: 6.75rem;
      }
    }

    &__text {
      display: block;

      p {
        font-size: 1.2rem;
        font-weight: 300;
        line-height: 1.3rem;
        text-align: center;

        @include mq(desktop) {
          // min-height: auto;
          margin-top: 0;
          margin-left: auto;
          font-size: 1.125rem;
          font-weight: 300;
          line-height: 1.875rem;
          text-align: left;
        }
      }
    }

    &__tags {
      // display: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      margin-top: 1rem;
      margin-left: auto;

      .button {
        padding: 0;
        border: none;

        &::after {
          display: none;

          @include mq(desktop) {
            display: block;
          }
        }

        @include mq(desktop) {
         padding: 0.8125rem 1rem;
         border: 1px solid var(--color-btn-border);
        }

        span {
          display: inline-block;

          @include mq(desktop) {
            display: none;
          }
        }
      }

      @include mq(desktop) {
        align-items: flex-start;
        justify-content: flex-start;
        max-width: 20.25rem;
      }
    }

    &__tag {
      display: block;
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      white-space: nowrap ;

      @include mq(desktop) {
        font-size: 0.8rem;
        text-transform: capitalize;
      }

      &:not(:last-child) {
        margin: 0 5px;
        margin-bottom: 5px;

        @include mq(desktop) {
          margin: 0 10px 10px 0;
        }
      }
    }

    &__bg {
      position: absolute;
      z-index: 3;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      &::before {
        content: '';
        display: block;
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        background: var(--bg-gradient);
        inset: 0;
      }

      img {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__outer,
    &__inner {
      width: 100%;
      height: 100%;
      overflow-y: hidden;
      will-change: transform;
    }
}
</style>
