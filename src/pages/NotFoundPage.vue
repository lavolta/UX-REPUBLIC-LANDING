<script lang="ts" setup>
import InfiniteScrollText from '@/components/infinite-scroll-text/InfiniteScrollText.vue'
import StarsIcon from '@/components/icons/StarsIcon.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { transitionStore } from '@/store'
import {
  usePageTransition,
  useDefaultSeo,
} from '@/composable'
import { useTemplateRef, onMounted, onUnmounted, ref, watch } from 'vue'
const notfounditem = useTemplateRef('notfounditem')
const notfound = useTemplateRef('notfound')
const contentVisible = ref(false)
let notFoundContext: gsap.Context | null = null

useDefaultSeo('home')
usePageTransition()
watch(() => transitionStore.state.welcomeAnimation, (welcomeAnimation: boolean) => {
  console.log('welcomeAnimation change', welcomeAnimation)
  if (!welcomeAnimation) {
    console.log('pret a lancer l\'animation')
    handleGsapAnimation()
  }
})
const handleGsapAnimation = () => {
  console.log('handleGsapAnimation')
  if (!contentVisible.value) {
    notFoundContext = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete() {
          contentVisible.value = true
          ScrollTrigger.create({
            trigger: notfound.value,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
            animation: gsap.fromTo(
              [notfounditem.value],
              { opacity: 1 },
              {

                opacity: 0,
                duration: 1,
              }),
          })
        },
      })
      timeline.fromTo(
        [notfounditem.value],
        { translateY: 150, opacity: 0 },
        {
          translateY: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: 'power1',
        })
    })
  }
}
onMounted(() => {
  if (!transitionStore.state.welcomeAnimation) {
    handleGsapAnimation()
  }
})
onUnmounted(() => {
  if (notFoundContext) {
    notFoundContext.revert()
  }
})
</script>
<template>
  <div
    ref="notfound"
    class="not-found"
  >
    <div
      v-for="item in 2"
      :key="`not-found-item-${item}`"
      class="not-found__item"
    >
      <div ref="notfounditem">
        <InfiniteScrollText
          :id="`404-item-text-${item}`"
          :reveal-text-on-scroll="false"
          theme="white"
          :duration="`${10 + (item * 10)}`"
          :direction="item % 2 ? 'reverse' : 'normal'"
        >
          404 ooopss
          <template #icon>
            <StarsIcon />
          </template>
        </InfiniteScrollText>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.not-found {
  display: flex;
  position: relative;
  align-items: center;
  height: var(--window-height);
  overflow: hidden;

  &__item {
    position: absolute;
    overflow: hidden;
    transform-origin: center center;

    > div {
      opacity: 0%;
    }

    &:nth-child(1) {
      top: 25vh;
      left: 0;
      transform: rotate(6deg);
    }

    &:nth-child(2) {
      // transform: rotate(-40deg);
      bottom: 25vh;
      left: 0;
      transform: rotate(-10deg);
    }

    &:nth-child(3) {
      top: 27vh;
      left: -56px;
      transform: rotate(-23deg);

      @include mq(desktop) {
        display: none;
      }
    }
  }
}
</style>
