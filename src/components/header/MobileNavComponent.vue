<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import HeaderLangSwitcher from '@/components/header/HeaderLangSwitcher.vue'

defineEmits<{
  (e: 'click', value: string): void
}>()

const mobileNavComponentTimeline = gsap.timeline()
const mobileNav = useTemplateRef('mobileNav')
const mobileNavItems = useTemplateRef('mobileNavItems')
const mobileNavLang = useTemplateRef('mobileNavLang')

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
  }
  if (mobileNavLang.value) {
    mobileNavComponentTimeline.fromTo(mobileNavLang.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power1' },
      '<+0.5',
    )
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
            v-for="(item, key) in $tm('header.navigation')"
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
      <div
        ref="mobileNavLang"
        class="mobile-nav__lang"
      >
        <HeaderLangSwitcher />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mobile-nav {
  /* stylelint-disable max-nesting-depth, selector-class-pattern */
  position: fixed;
  z-index: 100;
  overflow: hidden;

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

        @include mq(desktop) {
          margin-bottom: 1.5rem;
        }
      }

      .button {
        display: block;
        border: none;
        color: var(--color-bg);
        font-size: 1.3rem;
        text-align: center;

        @include mq(desktop) {
          font-size: 2.3rem;
        }

        &.internal {
          display: block;

          @include mq(desktop) {
            display: none;
          }
        }
      }
    }
  }

  &__lang {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
