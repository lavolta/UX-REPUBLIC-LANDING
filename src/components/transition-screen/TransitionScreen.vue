<script lang="ts" setup>
import {
  onMounted,
  defineEmits,
  nextTick,
  watchEffect,
} from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{
  playTransitionEnter?: boolean
  playTransitionLeave: boolean
}>()

const emit = defineEmits<{
  (e: 'start'): void
  (e: 'startTransitionEnter'): void
  (e: 'endTransitionEnter'): void
  (e: 'startTransitionLeave'): void
  (e: 'endTransitionLeave'): void
  (e: 'transitioning'): void
  (e: 'end'): void
}>()

watchEffect(() => {
  if (props.playTransitionEnter) {
    transitionEnter()
  }
  if (props.playTransitionLeave) {
    transitionLeave()
  }
})

const transitionEnter = () => {
  gsap.to(
    '.transition-screen__clip',
    {
      clipPath: 'polygon(0% 0%, 100% 100%, 100% 100%, 0% 100%)',
      ease: 'expo.out',
      duration: 1,
      onStart: () => {
        emit('startTransitionEnter')
      },
    },
  )
  gsap.to(
    '.transition-screen__clip',
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'expo.out',
      duration: 0.9,
      delay: 0.1,
      onComplete() {
        emit('endTransitionEnter')
      },
    },
  )
}
const transitionLeave = () => {
  emit('startTransitionLeave')
  gsap.to(
    '.transition-screen__clip',
    {
      clipPath: 'polygon(0% 0%, 100% 100%, 100% 100%, 0% 100%)',
      ease: 'expo.out',
      duration: 3,
    },
  )
  gsap.to(
    '.transition-screen__clip',
    {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      ease: 'expo.out',
      duration: 1,
      delay: 0.1,
      onComplete() {
        emit('endTransitionLeave')
      },
    },
  )
}

onMounted(async () => {
  await nextTick()
  emit('start')
  transitionEnter()
})

</script>
<template>
  <div
    class="transition-screen"
  >
    <div class="transition-screen__clip" />
  </div>
</template>
<style lang="scss" scoped>
.transition-screen {
  position: fixed;
  z-index: 400;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--window-height);

  &__clip {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: var(--animation-secondary);
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
    background-color: var(--color-bg);

    // background-color: white;
  }
}
</style>
