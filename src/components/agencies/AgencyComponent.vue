<script setup lang="ts">
import { ref, onMounted, defineExpose, computed } from 'vue'

const props = defineProps<{
  agency: {
    id: number
    name: string
    address: string
    email: string
  }
}>()

const imageAnimation = ref('hidden')
const isLeaving = ref(false)

const agencyImages: Record<number, string> = {
  1: '/images/agencies/paris.svg',
  2: '/images/agencies/bordeaux.svg',
  3: '/images/agencies/lyon.svg',
  4: '/images/agencies/lille.svg',
  5: '/images/agencies/lausanne.svg',
  6: '/images/agencies/bruxelles.svg',
  7: '/images/agencies/luxembourg.svg',
}

// Définition des typographies pour chaque agence
const agencyFonts: Record<number, string> = {
  1: '\'Bricolage Grotesque\', sans-serif', // Paris
  2: '\'Carattere\', cursive', // Bordeaux
  3: '\'Bowlby One\', sans-serif', // Lyon
  4: '\'Dawning of a New Day\', cursive', // Lille
  5: '\'Helvetica\', sans-serif', // Lausanne
  6: '\'VT323\', monospace', // Bruxelles
  7: '\'Zen Loop\', cursive', // Luxembourg
}

const fontClass = computed(() => `font-${props.agency.id}`)

const leaveAnimation = (): Promise<void> => {
  return new Promise((resolve) => {
    isLeaving.value = true
    imageAnimation.value = 'exit-to-top'

    setTimeout(() => {
      isLeaving.value = false
      resolve()
    }, 500)
  })
}

onMounted(() => {
  setTimeout(() => {
    imageAnimation.value = 'enter-from-bottom'
  }, 100)
})

defineExpose({
  leaveAnimation,
})
</script>

<template>
  <div class="agency">
    <!-- Image SVG avec animation -->
    <img
      :src="agencyImages[agency.id]"
      :alt="agency.name"
      class="agency__image"
      :class="imageAnimation"
    >

    <h1
      class="agency__title"
      :class="fontClass"
      :style="{ fontFamily: agencyFonts[agency.id] }"
    >
      {{ agency.name }}
    </h1>
    <p class="agency__address">
      {{ agency.address }}
    </p>
    <p class="agency__email">
      {{ agency.email }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.agency {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;

  &__image {
    position: absolute;
    z-index: 10;
    top: 60%;
    left: 50%;
    width: 300px;
    height: 300px;
    object-fit: contain;
    transition: all 0.5s ease-in-out;

    &.hidden {
      transform: translate(-50%, 100%);
      opacity: 0%;
    }

    &.enter-from-bottom {
      transform: translate(-50%, -50%);
      opacity: 100%;
    }

    &.exit-to-top {
      transform: translate(-50%, -150%);
      opacity: 0%;
    }
  }

  &__title {
    position: relative;
    z-index: 5;
    margin-bottom: -3.75rem;
    color: #333333;
    font-size: 14.375rem;
    font-weight: 400;

    // Styles spécifiques pour chaque police
    &.font-1 {
      letter-spacing: -6%;
    }

    &.font-2 {
      letter-spacing: -2%;
    }

    &.font-3 {
      letter-spacing: -3%;

    }

    &.font-4 {
      letter-spacing: -3%;
    }

    &.font-5 {
      letter-spacing: 0%;
    }

    &.font-6 {
      letter-spacing: -3%;
    }

    &.font-7 {
      letter-spacing: -6%;
    }
  }

  &__address, &__email {
    position: relative;
    z-index: 5;
    margin: 0;
    color: #666666;
    font-size: 1rem;
    font-weight: 300;
  }
}
</style>
