<script setup lang="ts">
import { ref, onMounted, type ComponentPublicInstance, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { HeroBannerTextInterface } from '@/interfaces'

const { tm } = useI18n()
const words = ref<HeroBannerTextInterface[]>(tm('heroHome'))
const wordRefs = ref<HTMLSpanElement[]>([])
const vectorRef = ref<HTMLImageElement>()
const setWordRef = (i: number) => (el: Element | ComponentPublicInstance | null) => {
  if (el) {
    wordRefs.value[i] = el as HTMLSpanElement
  }
}
const accessibilityContent = computed(() => {
  return words.value.reduce((acc, item) => {
    acc = acc + ' ' + item.text
    return acc
  }, '')
})
const editWordPosition = () => {
  const progress = window.scrollY
  wordRefs.value.forEach((el) => {
    el.style.transform = `translateY(-${progress * 0.6}%) rotate(-${progress * 0.03}deg)`
  })
  if (vectorRef.value) {
    const vectorScaleLevel = progress === 0 ? 1 : 1.2
    vectorRef.value.style.transform = `scale(${vectorScaleLevel})`
  }
}
onMounted(() => {
  wordRefs.value.forEach((el, i) => {
    const delay = i * 0.1
    el.style.transitionDelay = `${delay}s`
    setTimeout(() => el.classList.add('visible'), delay)
  })
  if (vectorRef.value) {
    setTimeout(() => {
      if (vectorRef.value) {
        vectorRef.value.classList.add('visible')
      }
    }, wordRefs.value.length * 10)
  }
  window.addEventListener('scroll', editWordPosition)
})
onUnmounted (() => window.removeEventListener('scroll', editWordPosition))
</script>
<template>
  <section class="hero">
    <div class="hero__bg">
      <img
        ref="vectorRef"
        src="/images/vector.svg"
        alt=""
        class="hero__vector"
      >
      <img
        src="/images/lion2.png"
        alt="Lion"
        class="hero__lion"
      >
    </div>

    <div class="hero__content">
      <img
        src="/images/uxrepublic.png"
        alt="Logo UX Republic"
        class="hero__logo"
      >
      <h1>
        <span class="visually-hidden">
          {{ accessibilityContent }}
        </span>
        <span
          v-for="(word, i) in words"
          :key="i"
          class="hero__wordContainer"
          aria-hidden="true"
        >
          <span
            :ref="setWordRef(i)"
            class="hero__word"
            :class="{'special': word.isSpecialStyle}"
          >
            {{ word.text }}
          </span>
        </span>
      </h1>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.hero {
  display: grid;
  position: relative;
  grid-template-columns: 1fr;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 4.8125rem 5.875rem;
  overflow: hidden;

  &__bg {
    position: absolute;
    z-index: 0;
    inset: 0;

    &::after {
      content: '';
      position: absolute;
      z-index: 1;
      background: radial-gradient(circle, rgb(70 47 113 / 100%) 0%, rgb(0 0 0 / 100%) 100%);
      inset: 0;
    }
  }

  &__vector {
    position: absolute;
          z-index: 3;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.1);
    transition: transform 2s cubic-bezier(0.39, 0.58, 0.57, 1);

    &.visible {
      transform: scale(1);
    }
  }

  &__lion {
    position: absolute;
    z-index: 4;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__content {
    display: flex;
    position: relative;
    z-index: 3;
    align-items: center;
    max-width: 100%;
    height: 100%;
    color: var(--color-white);

    h1 {
      font-family: var(--font-heading);
      font-size: 4.875rem;
      font-weight: 100;
      line-height: 1;
    }
  }

  &__logo {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    max-width: 9.75rem;
    height: auto;
  }

  &__wordContainer {
    display: block;
    overflow: hidden;
  }

  &__word {
    display: block;
    transform: translateY(-100%) rotate(-10deg);
    transform-origin: left center;
    transition: transform 0.7s cubic-bezier(0.39, 0.58, 0.57, 1);

    &.special {
       color: var(--color-primary);
      font-style: italic;
    }

    &.visible {
      transform: translateY(0) rotate(0);
    }
  }
}
</style>
