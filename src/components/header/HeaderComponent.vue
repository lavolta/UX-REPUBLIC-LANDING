<script lang="ts" setup>
import StickyLogoHover from '@/components/logo/StickyLogoHover.vue'
import MobileNavComponent from './MobileNavComponent.vue'
import { gsap } from 'gsap'
import { useScroll } from '@vueuse/core'
import { ref, watchEffect, shallowRef, onMounted, watch, useTemplateRef } from 'vue'
import { globalStore } from '@/store'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeaderToggleButton from './HeaderToggleButton.vue'
import HeaderNavComponent from './HeaderNavComponent.vue'

const disabledNavMenu = ref(false)

const mobileNavComponent = useTemplateRef('mobileNavComponent')
const headerToggleButton = useTemplateRef('headerToggleButton')

const windowTarget = shallowRef<Window | null>(null)
const { y, directions } = useScroll(windowTarget)
const menuMobileVisible = ref(false)

const masterTimeLine = gsap.timeline({
  defaults: {
    ease: 'back.inOut(2)',
  },
})

masterTimeLine.pause()

const playMasterTimeline = (reversed: boolean) => {
  if (reversed) {
    masterTimeLine.reverse()
  }
  else {
    masterTimeLine.play()
  }
}

const defineTimeline = () => {
  const mobileNavTimeline = mobileNavComponent.value?.mobileNavComponentTimeline ?? ''
  const headerToggleButtonTimeline = headerToggleButton.value?.buttonTimeLine ?? ''

  masterTimeLine.add(headerToggleButtonTimeline).add(mobileNavTimeline, '<')
  masterTimeLine.eventCallback('onReverseComplete', () => {
    ScrollTrigger.refresh()
  })
}

watch(menuMobileVisible, (newValue) => {
  if (newValue) {
    playMasterTimeline(false)
  }
  else {
    playMasterTimeline(true)
  }
})

const handleMenuMobile = () => {
  document.querySelector('html')?.classList.toggle('overflow')
  menuMobileVisible.value = !menuMobileVisible.value
  globalStore.setGlobalOverflow(menuMobileVisible.value)
}

onMounted(() => {
  windowTarget.value = window
  defineTimeline()
})

watchEffect(() => {
  if (menuMobileVisible.value) {
    return
  }
  if (y.value <= 50 && !globalStore.forcedHideHeader) {
    disabledNavMenu.value = false
  }
  else if (directions.bottom && !globalStore.forcedHideHeader) {
    disabledNavMenu.value = true
  }
  else if (directions.top && !globalStore.forcedHideHeader) {
    disabledNavMenu.value = false
  }
  else if (globalStore.forcedHideHeader) {
    disabledNavMenu.value = true
  }
})

</script>
<template>
  <header
    class="header"
    :class="{'hidden': disabledNavMenu}"
  >
    <div class="header__inner">
      <StickyLogoHover />
      <HeaderNavComponent class="header__nav" />
      <HeaderToggleButton
        ref="headerToggleButton"
        class="header__toggle"
        :open="menuMobileVisible"
        @click="handleMenuMobile"
      />
      <MobileNavComponent
        ref="mobileNavComponent"
        class="header__mobile"
      />
    </div>
  </header>
</template>
<style lang="scss" scoped>
.header {
  $c: &;

  --header-vertical-padding: .8125rem;
  --nav-translate-y: calc(-100% - var(--header-vertical-padding));

  position: fixed;
  z-index: 40;
  top: 0;
  left: 0;
  width: 100%;
  padding: var(--header-vertical-padding) 0;
  transition: transform ease-in .3s;

  &.hidden {
    transform: translateY(var(--nav-translate-y));
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: var(--max-section-width);
    margin: 0 auto;
    padding: 0 1rem;

    @include mq(desktop) {
      padding: 0 2rem;
    }

    @include mq(desktop) {
      align-items: stretch;
      padding: 0;
    }
  }

  &__toggle {
    display: flex;

    @include mq(desktop) {
      display: none;
    }
  }

  &__nav {
    display: none;
    align-items: center;

    @include mq(desktop) {
      display: flex;
    }
  }

  &__mobile {
    display: block;

    @include mq(desktop) {
      display: none;
    }
  }

  .sticky-logo {
    position: relative;
    left: 0;

    @include mq(desktop) {
      left: -4.75rem;
    }
  }
}
</style>
