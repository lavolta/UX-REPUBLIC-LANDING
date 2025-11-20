<script lang="ts" setup>
import StickyLogoHover from '@/components/logo/StickyLogoHover.vue'
import {
  useTemplateRef,
  onMounted,
  onUnmounted,
} from 'vue'
import { gsap } from 'gsap'
import { transitionStore } from '@/store'

const welcomeContainer = useTemplateRef('welcomeContainer')
const welcomeLogo = useTemplateRef('welcomeLogo')
const emit = defineEmits<{
  (e: 'start'): void
}>()
let welcomeGsapContext: gsap.Context | null = null

onMounted(() => {
  welcomeGsapContext = gsap.context(() => {
    const timeline = gsap.timeline({
      onComplete() {
        transitionStore.setStateTransition('welcomeAnimation', false)
      },
    })
    timeline.fromTo('.welcome__logo', { opacity: 0 }, {
      opacity: 1,
      ease: 'power1',
      duration: 0.5,
      delay: 1,
      onComplete() {
        emit('start')
      },
    }).to('.welcome__logo', {
      top: 0,
      ease: 'power3',
      duration: 1,
      delay: 0.5,
    }, '>').to('.welcome', {
      opacity: 0,
      duration: 0.5,
      ease: 'power1',
    }, '>')
  })
})

onUnmounted(() => {
  if (welcomeGsapContext) {
    welcomeGsapContext.revert()
  }
})

</script>

<template>
  <div
    ref="welcomeContainer"
    class="welcome"
  >
    <div class="welcome__inner">
      <StickyLogoHover
        ref="welcomeLogo"
        class="welcome__logo"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.welcome {
  position:fixed;
  z-index: 200;
  top: 0; left: 0;
  width:100%;
  height: 100svh;
  background-color: var(--color-bg);

  &::before {
    content: '';
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 100%);
      background-color:transparent;
  }

  &__inner {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: var(--max-section-width);
    height: 100%;
    margin: 0 auto;
    padding: .8125rem 1rem;

    @include mq(smartphone) {
      padding: .8125rem 2rem;
    }

    @include mq(desktop) {
      padding: .8125rem 0;
    }
  }

  &__logo {
    display: block;
    position: relative;
    top: calc(50% - 37px);
    left: 0;
    pointer-events: none;

    @include mq(desktop) {
      left: -4.75rem;
    }
  }
}
</style>
