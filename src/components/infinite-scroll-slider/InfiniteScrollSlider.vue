<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const items = ref([
  { src: '/images/slider-client/logo-1.png', alt: 'Ils nous ont fait confiance | LVMH', hidden: false },
  { src: '/images/slider-client/logo-2.png', alt: 'Ils nous ont fait confiance | Petit Bateau', hidden: false },
  { src: '/images/slider-client/logo-3.png', alt: 'Ils nous ont fait confiance | Shopmium', hidden: false },
  { src: '/images/slider-client/logo-4.png', alt: 'Ils nous ont fait confiance | generali', hidden: false },
  { src: '/images/slider-client/logo-5.png', alt: 'Ils nous ont fait confiance | lrm', hidden: false },
  { src: '/images/slider-client/logo-6.png', alt: 'Ils nous ont fait confiance | adeo', hidden: false },
  { src: '/images/slider-client/logo-7.png', alt: 'Ils nous ont fait confiance | manomano', hidden: false },
  { src: '/images/slider-client/logo-8.png', alt: 'Ils nous ont fait confiance | casino', hidden: false },
  { src: '/images/slider-client/logo-9.png', alt: 'Ils nous ont fait confiance | Groupama', hidden: false },
  { src: '/images/slider-client/logo-10.png', alt: 'Ils nous ont fait confiance | BPCE', hidden: false },
  { src: '/images/slider-client/logo-11.png', alt: 'Ils nous ont fait confiance | SG', hidden: false },
  { src: '/images/slider-client/logo-12.png', alt: 'Ils nous ont fait confiance | Carrefour', hidden: false },
  { src: '/images/slider-client/logo-13.png', alt: 'Ils nous ont fait confiance | AXA', hidden: false },
  { src: '/images/slider-client/logo-14.png', alt: 'Ils nous ont fait confiance | BNP', hidden: false },
])
const disabledAnimation = ref(false)
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) disabledAnimation.value = true
})
</script>
<template>
  <div
    class="scroller"
    :style="{ '--animation-duration': `${items.length / 2 * 10}s` }"
    :class="{'disabled-animation': disabledAnimation}"
  >
    <div
      class="scroller__inner"
    >
      <img
        v-for="(item, key) in items"
        :key="`scroller-item-${key}`"
        :src="item.src"
        :alt="item.alt"
        :aria-hidden="item.hidden"
      >
      <template v-if="!disabledAnimation">
        <img
          v-for="(item, key) in items"
          :key="`scroller-item-${key}`"
          :src="item.src"
          :alt="item.alt"
          aria-hidden="true"
          :class="{'red': key===0}"
        >
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.scroller {
  $c: &;

  @keyframes scroll {
    to {
      // 28 -> -14.29% | 16 -> -25%  | 8 -> -50%
      transform: translateX(calc(-50.25% - 1rem));
    }
  }

  position: relative;
  z-index:2;
  width: 100%;
  height: 3.375rem;
  overflow: hidden;

  &.disabled-animation {
    height: auto;
    overflow: visible;
    #{$c}__inner {
      flex-wrap: wrap;
    }
  }

  &:not(.disabled-animation) {
    #{$c}__inner {
      flex-wrap: nowrap;
      width: max-content;
      animation: scroll var(--animation-duration) linear infinite;
    }
  }

  &:hover {
    #{$c}__inner {
      animation-play-state: paused;
    }
  }

  &__inner {
    display: flex;
    align-items: center;
    gap: 4rem;
  }

}
</style>
