<script lang="ts" setup>
import StickyLogoHover from '@/components/logo/StickyLogoHover.vue'
import { useScroll } from '@vueuse/core'
import { ref, watchEffect, shallowRef, onMounted } from 'vue'
import { globalStore } from '@/store'

const disabledNavMenu = ref(false)

const windowTarget = shallowRef<Window | null>(null)
const { y, directions } = useScroll(windowTarget)

onMounted(() => {
  windowTarget.value = window
})

watchEffect(() => {
  if (y.value <= 0 && !globalStore.forcedHideHeader) {
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
          href="https://jobs.smile.eu/departments/ux-republic"
          target="_blank"
          class="button"
        >
          Rejoignez-nous
        </a>
        <a
          href="mailto:contact@ux-republic.com"
          class="button"
        >
          Contactez-nous
        </a>
      </nav>
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
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
    max-width: var(--max-section-width);
    margin: 0 auto;
    padding: 0 2rem;

    @include mq(desktop) {
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

  .sticky-logo {
    position: relative;
    left: 0;

    @include mq(desktop) {
      left: -4.75rem;
    }
  }
}
</style>
