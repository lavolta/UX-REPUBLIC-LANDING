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
  mobileNavComponentTimeline.to(mobileNav.value, { opacity: 1, duration: 0.1 }, '<').fromTo(mobileNav.value,
    { skewY: 15, yPercent: -110 },
    { skewY: 0, yPercent: 0, duration: 1.5, ease: 'expo.inOut' }, '<',
  )

  if (mobileNavItems.value) {
    menuNavItems.forEach((menuNavItem, index) => {
      mobileNavComponentTimeline.fromTo(menuNavItem, {
        opacity: 0,
        y: 10,
        duration: 0.25,
      }, { opacity: 1, y: 0 }, index === 0 ? '<+1' : `<+0.${index}`)
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
              v-if="item.type === 'link'"
              :href="item.href"
              class="button"
            >
              {{ item.content }}
            </a>
            <router-link
              v-else-if="item.type === 'internal'"
              :to="item.href"
              class="button"
            >
              {{ item.content }}
            </router-link>
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
  opacity: 0%;

  // transform: translateY(-110%);
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
