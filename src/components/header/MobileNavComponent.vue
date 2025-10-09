<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'

const { tm } = useI18n()
const items = tm('header.navigation')
const mobileNavComponentTimeline = gsap.timeline()
const mobileNav = useTemplateRef('mobileNav')
const mobileNavItems = useTemplateRef('mobileNavItems')

const defineMobileTimeLine = () => {
  if (!mobileNav) {
    return
  }
  const menuNavItems = gsap.utils.toArray(mobileNavItems.value)

  mobileNavComponentTimeline.to(mobileNav.value, {
    skewY: 15,
    yPercent: 20,
    duration: 0.5,
    ease: 'expo.inOut',
  }).to(mobileNav.value, {
    skewY: 0,
    yPercent: 100,
    duration: 0.5,
    ease: 'expo.inOut',
  }, '>-0.1')

  if (mobileNavItems.value) {
    console.log('jfioejhfeio')
    menuNavItems.forEach((menuNavItem, index) => {
      mobileNavComponentTimeline.fromTo(menuNavItem, {
        opacity: 0,
        y: 10,
        duration: 0.25,
      }, { opacity: 1, y: 0 }, index === 0 ? '>' : `<+0.${index}`)
    })
  }
}

onMounted(() => {
  defineMobileTimeLine()
})

defineExpose({
  mobileNavComponentTimeline,
})
</script>
<template>
  <div
    ref="mobileNav"
    class="mobile-nav"
  >
    <div class="mobile-nav__inner">
      <nav class="mobile-nav__list">
        <ul>
          <li
            v-for="(item, key) in items"
            :key="`mobile-nav-item-${key}`"
            ref="mobileNavItems"
          >
            <a
              :href="item.href"
              class="button"
            >
              {{ item.content }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mobile-nav {
  position: fixed;
  z-index: 100;
  transform: translateY(-100%);
  background-color: transparent;
  background-color: var(--color-bg);
  inset: 0;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
  }

  &__list {
    li {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }

      .button {
        display: block;
      }
    }
  }
}
</style>
