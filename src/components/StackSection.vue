<!-- components/StackSection.vue -->
<template>
  <section class="stack-section" ref="sectionEl">
    <div class="stack-content">
      <header class="info">
        <h2 class="title">{{ title }}</h2>
        <p class="desc">{{ description }}</p>
      </header>

      <CardStack :cards="cards" :active="activeStep" />
    </div>
    <div class="steps" ref="stepsEl" aria-hidden="true">
      <div v-for="(_, i) in cards" :key="i" class="step" :data-step="i" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CardStack from './CardStack.vue'

const props = defineProps({
  title: String,
  description: String,
  cards: { type: Array, required: true }
})

const sectionEl = ref(null)
const stepsEl = ref(null)
const activeStep = ref(0)
let observer = null

onMounted(() => {
  if (!stepsEl.value) return
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const idx = Number(e.target.dataset.step)
        activeStep.value = idx
      }
    })
  }, { root: null, threshold: 0.6 })

  stepsEl.value.querySelectorAll('.step').forEach(el => observer.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.stack-section { position: relative; background: #0b1015; }
.stack-content {
  position: sticky; top: 0; height: 100vh; overflow: clip;
  display: grid; grid-template-columns: 1.2fr 1fr; align-items: center;
  gap: 6vh; padding: 6vh 6vw;
  color: #e6e8eb;
  background: linear-gradient(#0b1015, #0b1015); /* flat dark */
}
.title { margin: 0 0 .5rem; font-size: clamp(1.8rem, 3.3vw, 2.6rem); }
.desc  { margin: 0; color: #a0a7b0; line-height: 1.6; }

.steps {
  scroll-snap-type: y mandatory;
}
.step {
  height: 100vh;
  scroll-snap-align: start;
}

/* Responsive */
@media (max-width: 900px) {
  .stack-content {
    grid-template-columns: 1fr;
    padding: 5vh 5vw;
    gap: 3vh;
  }
}
</style>
