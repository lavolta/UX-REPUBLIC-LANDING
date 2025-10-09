<script lang="ts" setup>
import StickyLogoHover from '@/components/logo/StickyLogoHover.vue'
import MobileNavComponent from './MobileNavComponent.vue'
import gsap from 'gsap'
import { useI18n } from 'vue-i18n'
import { useScroll } from '@vueuse/core'
import { ref, watchEffect, shallowRef, onMounted, computed, watch } from 'vue'
import { globalStore } from '@/store'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const { tm } = useI18n()
const navItems = tm('header.navigation')

const disabledNavMenu = ref(false)

const windowTarget = shallowRef<Window | null>(null)
const { y, directions } = useScroll(windowTarget)
const menuMobileVisible = ref(false)

const masterTimeLine = gsap.timeline({
  defaults: {
    ease: 'back.inOut(2)',
  },
})
const menuMobileButtonTimeline = gsap.timeline()
const menuMobileContentTimeLine = gsap.timeline()

masterTimeLine.pause()

const playMasterTimeline = (reversed: boolean) => {
  if (reversed) {
    masterTimeLine.reverse()
  }
  else {
    masterTimeLine.play()
  }
}

const defineMenuMobileContentTimeLine = () => {
  const menuNavItems = gsap.utils.toArray(`#mobile-nav .mobile-nav__list li`)
  menuNavItems.forEach((menuNavItem, index) => {
    menuMobileContentTimeLine.fromTo(menuNavItem, {
      opacity: 0,
      y: 10,
      duration: 0.25,
    }, { opacity: 1, y: 0 }, `<+0.${index}`)
  })
}
const defineMenuMobileButtonTimeLine = () => {
  menuMobileButtonTimeline.to('#span-line-1', {
    width: 0,
    duration: 0.25,
  }).to('#span-line-2', {
    width: 0,
    duration: 0.25,
  }, '<0.1')
    .to('#span-line-3', {
      width: 0,
      duration: 0.25,
    }, '<0.1').to('#span-line-1', {
      rotation: 45,
      top: 5,
      marginBottom: 0,
      duration: 0,
    }, '>').to('#span-line-3', {
      rotation: -45,
      top: -5,
      marginBottom: 0,
      duration: 0,
    }, '<').to('#span-line-1', {
      width: 30,
      duration: 0.5,
    }, '<').to('#span-line-3', {
      width: 30,
      duration: 0.5,
    }, '<0.1').to('.mobile-nav', {
      skewY: 15,
      yPercent: 20,
      duration: 0.5,
      ease: 'expo.inOut',
    }, '<').to('.mobile-nav', {
      skewY: 0,
      yPercent: 100,
      duration: 0.5,
      ease: 'expo.inOut',
    }, '<0.4')
}
const defineTimeline = () => {
  defineMenuMobileButtonTimeLine()
  defineMenuMobileContentTimeLine()
  masterTimeLine.add(menuMobileButtonTimeline).add(menuMobileContentTimeLine, '>-0.2')
  masterTimeLine.eventCallback('onReverseComplete', () => {
    console.log('onReverseComplete')
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
const ariaLabelBtnToggleNavMenu = computed(() => {
  return menuMobileVisible.value ? 'Fermer menu mobile' : 'Ouvrir menu mobile'
})
onMounted(() => {
  windowTarget.value = window
  defineTimeline()
})

watchEffect(() => {
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
      <nav
        class="header__nav"
      >
        <a
          v-for="(item, key) in navItems"
          :key="`header-nav-desktop-item-${key}`"
          :href="item.href"
          target="_blank"
          class="button"
        >
          {{ item.content }}
        </a>
      </nav>
      <button
        class="header__toggle"
        :class="{'header__toggle--open': menuMobileVisible}"
        :aria-label="ariaLabelBtnToggleNavMenu"
        @click="handleMenuMobile"
      >
        <span
          v-for="index in 3"
          :id="`span-line-${index}`"
          :key="`header-toggle-span-line-${index}`"
        />
      </button>
      <MobileNavComponent />
    </div>
  </header>
</template>
<style lang="scss" scoped>
.header {
  $c: &;

  --header-vertical-padding: .8125rem;
  --nav-translate-y: calc(-100% - var(--header-vertical-padding));

  position: fixed;
  z-index: 20;
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
    padding: 0 2rem;

    @include mq(desktop) {
      align-items: stretch;
      padding: 0;
    }
  }

  &__nav {
    display: none;
    align-items: center;

    @include mq(desktop) {
      display: flex;
    }

    > a,
    > button {
      padding: 1rem;

      @include mq(desktop) {
        padding: 1rem 1.5625rem;
      }

      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  }

  &__toggle {
    display: flex;
    position: relative;
    z-index:200;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30px;
    background-color: transparent;

    &:hover {
      cursor: pointer;
    }

    >span {
      display: block;
      position: relative;
      width: 30px;
      height: 3px;
      border-radius: 3px;
      background-color: var(--color-white);

      &:not(:last-child) {
        margin-bottom: 4px;
      }
    }

    @include mq(desktop) {
      // display: none;
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
