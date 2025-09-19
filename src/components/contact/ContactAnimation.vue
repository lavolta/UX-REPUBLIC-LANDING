<script lang="ts" setup>
import { useScroll } from '@vueuse/core'
import { computed } from 'vue'

// si tu veux écouter sur la fenêtre entière
const { arrivedState } = useScroll(window)

const isBottom = computed(() => arrivedState.bottom)
</script>

<template>
  <div
    class="contact"
    :class="{
      'visible': isBottom
    }"
  >
    <span class="contact-title">
      contactez-nous
    </span>
  </div>
</template>

<style lang="scss" scoped>
.contact {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  transform: translateY(100%);
  transition: transform 0.4s ease-in-out;
  line-height: 1;
  text-align: center;

  &.visible {
    transform: translateY(25%);
  }

  &-title {
    display: block;
    color: #22252C;
    font-size: 14.375rem;
    font-weight: 400;
    line-height: 1;
    white-space: nowrap;
  }
}

</style>
