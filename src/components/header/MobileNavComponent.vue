<script lang="ts" setup>
import { onMounted, useTemplateRef, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
defineEmits<{
  (e: 'click', value: string): void
}>()
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
  mobileNavComponentTimeline.fromTo(mobileNav.value,
    { yPercent: -100 },
    { yPercent: 0, duration: 0.5, ease: 'slow' }, '<',
  )

  if (mobileNavItems.value) {
    mobileNavComponentTimeline.fromTo([menuNavItems], {
      opacity: 0,
      translateY: 100,
    }, {
      opacity: 1,
      translateY: 0,
      stagger: 0.05,
      ease: 'back.inOut',
      duration: 0.5,
    }, '>-=0.2')
    // menuNavItems.forEach((menuNavItem, index) => {
    //   mobileNavComponentTimeline.fromTo(menuNavItem, {
    //     opacity: 0,
    //     y: 10,
    //     duration: 0.1,
    //     stagger: 0.01,
    //   }, { opacity: 1, y: 0 }, index === 0 ? '>' : `<+0.03`)
    // })
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
              v-else-if="item.type === 'internal' || item.type === 'anchor'"
              :to="item.href"
              :class="['button', {'anchor': item.type === 'anchor'}, {'internal': item.type === 'internal'}]"
              @click="$emit('click', item.type)"
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
  /* stylelint-disable max-nesting-depth, selector-class-pattern */
  position: fixed;
  z-index: 100;

  // transform: translateY(-110%);
  background-color: transparent;
  background-color: var(--color-white);
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
        color: var(--color-bg);
        text-align: center;

        &.internal {
          display: block;

          @include mq(desktop) {
            display: none;
          }
        }
      }
    }
  }
}
</style>
