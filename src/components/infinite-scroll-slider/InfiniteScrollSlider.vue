<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const items = ref([
  { src: '/images/clients/adeo.png', alt: 'Ils nous ont fait confiance | adeo', hidden: true },
  { src: '/images/clients/bouygues.png', alt: 'Ils nous ont fait confiance | bouygues Télécom', hidden: true },
  { src: '/images/clients/generali.png', alt: 'Ils nous ont fait confiance | generali', hidden: true },
  { src: '/images/clients/le_Monde.png', alt: 'Ils nous ont fait confiance | le monde', hidden: true },
  { src: '/images/clients/adeo.png', alt: 'Ils nous ont fait confiance | adeo', hidden: false },
  { src: '/images/clients/bouygues.png', alt: 'Ils nous ont fait confiance | bouygues Télécom', hidden: false },
  { src: '/images/clients/generali.png', alt: 'Ils nous ont fait confiance | generali', hidden: false },
  { src: '/images/clients/le_Monde.png', alt: 'Ils nous ont fait confiance | le monde', hidden: false },
])
const disabledAnimation = ref(false)
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) disabledAnimation.value = true
})
</script>
<template>
  <div
    class="scroller"
    :style="{ '--animation-duration': `${items.length / 4 * 10}s` }"
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
      // 16 -> -25%  | 8 -> -50%
      transform: translateX(calc(-25% - 1rem));
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
