<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const isScrollingUp = ref(false)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  if (currentScrollY + windowHeight >= documentHeight - 100) {
    isVisible.value = true
    isScrollingUp.value = false
  }
  else if (currentScrollY < lastScrollY.value) {
    isScrollingUp.value = true
  }
  else {
    isVisible.value = false
    isScrollingUp.value = false
  }

  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="contact"
    :class="{
      'visible': isVisible,
      'scrolling-up': isScrollingUp
    }"
  >
    <span class="contact-title">
      contactez-nous
    </span>
  </div>
</template>

<style lang="scss" scoped>
.contact {
  position: relative;
  bottom: -180px;
  left: 0;
  width: 100%;
  overflow: hidden;
  transition: all 0.8s ease;
  opacity: 0%;
  text-align: center;

  &.visible {
    bottom: -160px;
    opacity: 90%;
  }

  &.scrolling-up {
    animation: gentle-sway 3s ease-in-out infinite;
    opacity: 70%;
  }

  &-title {
    display: inline-block;
    min-width: 100%;
    margin: 0;
    padding: 0;
    transition: transform 0.4s ease;
    color: #22252C;
    font-size: 14.375rem;
    font-weight: 400;
    text-transform: uppercase;
    white-space: nowrap;
  }
}

@keyframes gentle-sway {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-4px);
  }

  50% {
    transform: translateX(2px);
  }

  75% {
    transform: translateX(-2px);
  }

  100% {
    transform: translateX(0);
  }
}

</style>
