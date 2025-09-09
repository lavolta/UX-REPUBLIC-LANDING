<template>
  <div class="stack">
    <!-- PREV - Visible seulement en scroll UP -->
    <div
      v-if="showPrevCard"
      class="card card--prev"
      :style="getPrevCardStyle()"
    >
      <CardContent :card="cards[active - 1]" />
    </div>

    <!-- ACTIVE -->
    <div
      v-if="active >= 0"
      class="card card--active"
      :style="getActiveCardStyle()"
    >
      <CardContent :card="cards[active]" />
    </div>

    <!-- NEXT - Visible seulement en scroll DOWN -->
    <div
      v-if="showNextCard"
      class="card card--next"
      :style="getNextCardStyle()"
    >
      <CardContent :card="cards[active + 1]" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CardContent from './CardContent.vue'

const props = defineProps({
  cards: { type: Array, required: true },
  active: { type: Number, required: true },
  scrollProgress: { type: Number, default: 0 },
  direction: { type: String, default: 'down' }
})

const emit = defineEmits(['exit-top'])

const isUp = computed(() => props.direction === 'up')
const isDown = computed(() => props.direction === 'down')

const showNextCard = computed(() => {
  return props.active < props.cards.length - 1 && isDown.value
})

const showPrevCard = computed(() => {
  return props.active > 0 && isUp.value
})

const getActiveCardStyle = () => {
  if (isDown.value) {
    // Scroll DOWN: la carte active disparaît complètement
    return {
      transform: 'translateY(0) scale(1)',
      opacity: (1 - props.scrollProgress).toString(),
      zIndex: 100,
      transition: props.scrollProgress > 0 ? 'all 0.4s ease-out' : 'none'
    }
  } else {
    // Scroll UP: la carte active descend vers le bas
    return {
      transform: `translateY(${props.scrollProgress * 100}%) scale(1)`,
      opacity: (1 - props.scrollProgress).toString(),
      zIndex: 100,
      transition: props.scrollProgress > 0 ? 'all 0.4s ease-out' : 'none'
    }
  }
}

const getNextCardStyle = () => {
  // Scroll DOWN: la carte suivante monte depuis le bas
  const translateY = (1 - props.scrollProgress) * 100
  return {
    transform: `translateY(${translateY}%) scale(1)`,
    opacity: props.scrollProgress.toString(),
    zIndex: 90,
    transition: 'all 0.4s ease-out'
  }
}

const getPrevCardStyle = () => {
  // Scroll UP: la carte précédente apparaît DIRECTEMENT
  return {
    transform: 'translateY(0) scale(1)',
    opacity: '1',
    zIndex: 90,
    transition: 'none', // Aucune transition
    pointerEvents: 'none'
  }
}
</script>
