<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CardStack from '@/components/card/CardStack.vue'
import cards from '@/content/expertises.json'

const sectionRef = ref(null)
const activeStep = ref(0)
const scrollProgress = ref(0)
const scrollDirection = ref('down')
const lastScrollY = ref(0)

let animationFrameId = null
const leavingTop = ref(false)

const upSegment = ref({
  active: false,
  startIndex: null,
  startPos: null,
})

const scrollToPrevSection = () => {
  if (leavingTop.value) return
  leavingTop.value = true
  const prev = sectionRef.value?.previousElementSibling
  if (prev) {
    prev.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }
  setTimeout(
    () => { leavingTop.value = false },
    600,
  )
}

const handleScroll = () => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)

  animationFrameId = requestAnimationFrame(() => {
    if (!sectionRef.value || leavingTop.value) return

    const currentScrollY = window.scrollY
    const dir = currentScrollY > lastScrollY.value ? 'down' : 'up'
    scrollDirection.value = dir
    lastScrollY.value = currentScrollY

    const section = sectionRef.value
    const rect = section.getBoundingClientRect()
    const sectionTop = rect.top
    const sectionHeight = rect.height
    const isInSection = rect.top <= 0 && rect.bottom >= 0

    if (!isInSection) {
      if (upSegment.value.active) {
        upSegment.value = { active: false, startIndex: null, startPos: null }
        scrollProgress.value = 0
      }
      return
    }

    const cardCount = cards.length
    const stepHeight = sectionHeight / cardCount
    const scrollPosition = Math.max(0, Math.abs(sectionTop))
    let pos = scrollPosition / stepHeight
    pos = Math.min(cardCount - 1, Math.max(0, pos))

    if (dir === 'down') {
      upSegment.value = { active: false, startIndex: null, startPos: null }

      const downIndex = Math.floor(pos)
      const stepProgress = pos - downIndex

      activeStep.value = downIndex
      scrollProgress.value = stepProgress
    }
    else {
      if (!upSegment.value.active) {
        upSegment.value = {
          active: true,
          startIndex: Math.min(Math.ceil(pos), cardCount - 1),
          startPos: pos,
        }
        activeStep.value = upSegment.value.startIndex
      }

      const progress = Math.max(0, Math.min(1, (upSegment.value.startPos - pos)))
      scrollProgress.value = progress

      if (progress >= 0.99) {
        if (upSegment.value.startIndex === 0) {
          upSegment.value = { active: false, startIndex: null, startPos: null }
          scrollProgress.value = 0
          scrollToPrevSection()
        }
        else {
          const newIndex = upSegment.value.startIndex - 1
          activeStep.value = newIndex
          upSegment.value = {
            active: true,
            startIndex: newIndex,
            startPos: upSegment.value.startPos - 1,
          }
          scrollProgress.value = 0
        }
      }
    }
  })
}

onMounted(() => {
  lastScrollY.value = window.scrollY
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <section
    id="expertises"
    ref="sectionRef"
    class="expertises"
  >
    <div class="expertises__sticky">
      <header class="expertises__head">
        <h2>Nos expertises en action</h2>
        <p>De l'analyse à l'exécution, nous construisons des expériences qui comptent.</p>
      </header>

      <CardStack
        :cards="cards"
        :active="activeStep"
        :scroll-progress="scrollProgress"
        :direction="scrollDirection"
        @exit-top="scrollToPrevSection"
      />
    </div>

    <div class="expertises__steps">
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        class="step"
        :data-index="index"
      />
    </div>
  </section>
</template>
