<script lang="ts" setup>
import { xpItems } from '@/data'
import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'
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

const stackDebug = ref({
  displayDebug: true,
  stackSliderEnter: false,
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
  itemTitleAnimationType: 'chars',
  stackSliderTimelineParameter: {
    duration: 0.8,
    ease: 'slow.inOut',
  },
}

let stackSliderContext: gsap.Context | null = null
let stackSliderObserver: StackSliderObbserverType = null
let stackSliderScrollTrigger: ScrollTrigger | null = null

const scrollTimeout = gsap.delayedCall(1, () => {
  stackSliderState.value.allowScroll = true
}).pause()

let stackSliderItems: HTMLElement[] | null = null

let stackSliderItemImageBg: HTMLElement[] | null = null
let stackSliderItemOuter: HTMLElement[] | null = null
let stackSliderItemInner: HTMLElement[] | null = null
let stackSliderItemTitle: HTMLElement[] | null = null
let stackSliderItemTitlesSplitted: SplitText[] | null = null

const handleSlideIn = () => {
  if (!stackSliderItems) return
  const tempIndex = stackSliderState.value.currentIndex + 1

  if (tempIndex >= stackSliderItems.length) {
    stackSliderObserver?.disable()
    return
  }
  stackSliderState.value.isTransitionning = true
  stackSliderState.value.nextIndex = tempIndex
  slideIn()
}

const handleSplitTitle = () => {
  if (!stackSliderItemTitle) return
  stackSliderItemTitlesSplitted = stackSliderItemTitle.map((title) => {
    return new SplitText(title, {
      type: 'chars, words, lines',
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
      each: 0.01,
      from: 'random',
    },
  })
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

const createStackSliderObserver = () => {
  if (stackSliderObserver) return
  stackSliderObserver = ScrollTrigger.observe({
    type: 'wheel,touch',
    preventDefault: true,
    tolerance: 10,
    onEnable(self) {
      globalStore.setForcedHideHeader(true)
      stackSliderState.value.allowScroll = false
      scrollTimeout.restart(true)
      const savedScroll = self.scrollY()
      self._restoreScroll = () => self.scrollY(savedScroll)
      document.addEventListener('scroll', self._restoreScroll, { passive: false })
    },
    onDisable(self) {
      globalStore.setForcedHideHeader(false)
      document.removeEventListener('scroll', self._restoreScroll)
    },
    onUp() {
      if (!stackSliderState.value.isTransitionning && stackSliderState.value.allowScroll) {
        handleSlideOut()
      }
    },
    onDown() {
      if (!stackSliderState.value.isTransitionning && stackSliderState.value.allowScroll) {
        handleSlideIn()
      }
    },
  })
  stackSliderObserver.disable()
}

const createStackSliderScrollTriger = () => {
  stackSliderScrollTrigger = ScrollTrigger.create({
    trigger: stackSliderConfig.trigger,
    start: 'top top',
    pin: true,
    end: '+=200',
    onEnter(self) {
      stackDebug.value.stackSliderEnter = true
      if (stackSliderObserver?.isEnabled) return
      // On jump d'un pixel pour pouvoir fixer l'utilisateur dans la section
      self.scroll(self.start + 1)
      switchStackSliderObserver(true)
    },
    onLeave() {
      stackDebug.value.stackSliderEnter = false
    },
    onLeaveBack() {
      stackDebug.value.stackSliderEnter = false
    },
    onEnterBack(self) {
      stackDebug.value.stackSliderEnter = true
      if (stackSliderObserver?.isEnabled) return
      self.scroll(self.end - 1)
      switchStackSliderObserver(true)
    },
  })
}

const switchStackSliderObserver = (enableObserver: boolean) => {
  if (!stackSliderObserver) return
  if (enableObserver) {
    stackSliderObserver.enable()
  }
  else {
    stackSliderObserver.disable()
  }
}

const handleSetDefaultGsapValue = () => {
  stackSliderItems = gsap.utils.toArray<HTMLElement>(stackSliderConfig.items)

  if (!stackSliderItems) return

  stackSliderItemImageBg = gsap.utils.toArray<HTMLElement>(stackSliderConfig.itemImagesBg)
  stackSliderItemOuter = gsap.utils.toArray<HTMLElement>(stackSliderConfig.itemOuter)
  stackSliderItemInner = gsap.utils.toArray<HTMLElement>(stackSliderConfig.itemInner)
  stackSliderItemTitle = gsap.utils.toArray<HTMLElement>(stackSliderConfig.itemTitle)

  handleSplitTitle()

  gsap.set(stackSliderItemOuter, { yPercent: 100 })
  gsap.set(stackSliderItemInner, { yPercent: -100 })

  slideIn()
}

onMounted(() => {
  handleSetDefaultGsapValue()
  createStackSliderObserver()

  stackSliderContext = gsap.context(() => {
    createStackSliderScrollTriger()
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
    class="stackslider"
  >
    <div
      v-if="stackDebug.displayDebug"
      class="stackslider__debugger"
    >
      {{ stackDebug.stackSliderEnter ? 'in' : 'out' }}
      <p>
        isTransitionning: {{ stackSliderState.isTransitionning }}
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
                    class="button"
                  >
                    {{ tag }}
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
  </div>
</template>
<style lang="scss" scoped>
.stackslider {
  position: relative;
  width: 100%;
  height: 100svh;
  overflow: hidden;

  @include mq(desktop) {
    height: 100vh;
  }

  &__debugger {
    position: fixed;
    z-index: 200;
    bottom: 0;
    left: 0;
    padding: 1rem;
    background-color: white;
    color: black;
  }

  &__content {
    position: relative;
  }
}

.stackslider-item {
    display: flex;
    visibility: hidden;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 100svh;
    will-change: transform;

    @include mq(desktop) {
      min-height: 100vh;
    }

    --bg-gradient: radial-gradient(circle,rgb(0 0 0 / 40%) 0%, rgb(0 0 0 / 0%) 100%);

    &__content {
      display: flex;
      position: relative;
      z-index: 4;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: var(--max-section-width);
      height: 100%;
      margin: 0 auto;

      > div {
        width: 33.33%;
      }
    }

    &__number {
      display: block;
      position: relative;
      margin-bottom: 1rem;
      font-size: 1rem;
      font-weight: 200;

      @include mq(desktop) {
        margin-bottom: 2.125rem;
      }
    }

    &__title {
      font-size: 1.19rem;
      font-weight: 400;
      line-height: 1.41rem;

      @include mq(desktop) {
        font-size: 2.375rem;
        line-height: 2.8125rem;
      }

      .clip-text {
        overflow: hidden;
      }
    }

    &__center {
      position: relative;
      flex: 0 0 33.33%;
      padding-top: 33.33%;

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
      p {
        min-height: 6rem;
        font-size: 1rem;
        font-weight: 300;
        line-height: 1.5rem;

        @include mq(desktop) {
          min-height: auto;
          margin-top: 0;
          margin-left: auto;
          font-size: 1.125rem;
          font-weight: 300;
          line-height: 1.875rem;
        }
      }
    }

  &__tags {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    margin-top: 1rem;
    margin-left: auto;
    overflow-x: auto;
    transform: translateY(10px);

    @include mq(desktop) {
      flex-wrap: wrap;
      max-width: 20.25rem;
      overflow-x: none;
    }

    > .button {
      display: block;
      flex: 1 0 auto;
      margin-right: 5px;
      margin-bottom: 5px;
      padding: .75rem;
      font-size: .75rem;

      @include mq(smartphone) {
        padding: 1rem;
        font-size: 1rem;
      }

      @include mq(desktop) {
        flex: 0 1 auto;
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
