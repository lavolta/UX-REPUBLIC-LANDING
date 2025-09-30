<script lang="ts" setup>
import { useScroll } from '@vueuse/core'
import { computed, shallowRef, onMounted } from 'vue'
const windowTarget = shallowRef<Window | null>(null)
const { arrivedState } = useScroll(windowTarget)
const isBottom = computed(() => arrivedState.bottom)
onMounted(() => {
  windowTarget.value = window
})
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
  left: 50%;
  width: 100%;
  max-width: var(--max-section-width);
  overflow: hidden;
  transform: translate(-50%, 100%);
  transition: transform 0.4s ease-in-out;
  line-height: 1;
  text-align: center;

  &.visible {
    transform: translate(-50%, 25%);
  }

  &-title {
    display: block;
    color: #22252C;
    font-size: 3.7rem;
    font-weight: 400;
    line-height: 1;
    white-space: nowrap;

    @include mq(desktop) {
      font-size: 12.075rem;
    }
  }
}

</style>
