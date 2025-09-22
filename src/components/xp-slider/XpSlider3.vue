<script lang="ts" setup>
import { ref, useTemplateRef, computed, watch } from 'vue'
import {
  useEventListener,
  useSwipe,
  useElementBounding,
  useWindowScroll,
} from '@vueuse/core'
import { xpItems } from '@/data'
// MES REF AUX DIFFERENTS ITEM QUE JE CIBLE
const xpSection = useTemplateRef('xpSection')

// const xpbgcontainer = useTemplateRef('xpbgcontainer')
const { top: xpSectionTop, height: xpSectionHeight } = useElementBounding(xpSection)
const { y } = useWindowScroll()

const { direction } = useSwipe(xpSection)

const userScrollingBottom = ref(true)
const items = ref(xpItems)
const activeSlide = ref(0)

const lockUserOnSlider = ref(false)
const debug = ref(false)

const stepThreshold = 200 // à ajuster: 120–200 selon la sensibilité souhaitée
const wheelAcc = ref(0) // accumulateur de deltaY
const edgeArmed = ref<null | 'top' | 'bottom'>(null)

const morThanThirdPartOnScreen = computed(() => {
  return Math.abs(xpSectionTop.value) <= xpSectionHeight.value / 3
})

watch(morThanThirdPartOnScreen, (newValue) => {
  if (lockUserOnSlider.value && !newValue) {
    lockUserOnSlider.value = false
  }
})

const scrollOutsideOfXpSection = (goingToBottomOfTheSection: boolean) => {
  let offset
  if (goingToBottomOfTheSection) {
    offset = y.value + xpSectionHeight.value
  }
  else {
    offset = y.value - xpSectionHeight.value
  }
  window.scrollTo({
    top: offset, // aligne le haut de la section à 0
    behavior: 'smooth',
  })
}

const scrollToTopOfXpSection = () => {
  const offset = y.value + xpSectionTop?.value
  window.scrollTo({
    top: offset, // aligne le haut de la section à 0
    behavior: 'smooth',
  })
}

useEventListener(
  xpSection,
  'wheel',
  (e: WheelEvent) => {
    // Toujours empêcher le scroll natif dans la section
    e.stopPropagation()
    e.preventDefault()

    // Accumuler le delta
    wheelAcc.value += e.deltaY

    // Pas assez de "matière" pour déclencher une action -> on attend
    if (Math.abs(wheelAcc.value) < stepThreshold) return

    // On a franchi le seuil: on "consomme" l'impulsion et on décide d'une direction
    const goingDown = wheelAcc.value > 0
    wheelAcc.value = 0
    userScrollingBottom.value = goingDown

    // 1) Si pas encore locké sur le slider: on s'aligne en haut et on lock, sans changer de slide
    if (!lockUserOnSlider.value) {
      scrollToTopOfXpSection()
      lockUserOnSlider.value = true
      // On réinitialise toute intention de sortie
      edgeArmed.value = null
      return
    }

    // 2) Déjà locké -> on gère slides + bord
    const atFirst = activeSlide.value === 0
    const atLast = activeSlide.value === items.value.length - 1

    if (goingDown) {
      if (!atLast) {
        // Avancer d'une slide et désarmer la sortie
        activeSlide.value += 1
        edgeArmed.value = null
      }
      else {
        // On est au bord bas
        if (edgeArmed.value === 'bottom') {
          edgeArmed.value = null
          scrollOutsideOfXpSection(true) // sortie vers le bas
        }
        else {
          edgeArmed.value = 'bottom' // première impulsion: on arme seulement
        }
      }
    }
    else {
      if (!atFirst) {
        // Reculer d'une slide et désarmer la sortie
        activeSlide.value -= 1
        edgeArmed.value = null
      }
      else {
        // On est au bord haut
        if (edgeArmed.value === 'top') {
          edgeArmed.value = null
          scrollOutsideOfXpSection(false) // sortie vers le haut
        }
        else {
          edgeArmed.value = 'top' // première impulsion: on arme seulement
        }
      }
    }
  },
  { passive: false }, // IMPORTANT pour que preventDefault() soit respecté
)

const isAligning = ref(false)

const isSectionAligned = computed(() => Math.abs(xpSectionTop.value || 0) <= 2)
watch([() => lockUserOnSlider.value, isSectionAligned], () => {
  if (lockUserOnSlider.value && isSectionAligned.value) {
    isAligning.value = false
  }
})

const alignSectionInstant = () => {
  // Scroll instantané (pas 'smooth') = pas d’inertie parasite
  const offset = y.value + (xpSectionTop?.value || 0)
  window.scrollTo({ top: offset, behavior: 'auto' })
  isAligning.value = false
}
useSwipe(xpSection, {
  threshold: 40, // 30–60 selon feeling
  passive: false,
  onSwipeStart(e) {
    e?.preventDefault?.()
    if (!lockUserOnSlider.value) {
      lockUserOnSlider.value = true
      isAligning.value = true
      edgeArmed.value = null
      alignSectionInstant() // pas de smooth !
      return
    }
  },

  onSwipeEnd(e, dir) {
    e?.preventDefault?.()
    // Tant que l’alignement n’est pas “verrouillé”, on ignore
    if (!lockUserOnSlider.value || isAligning.value) return

    const goingDown = dir === 'up' // doigt vers le haut => on veut descendre
    userScrollingBottom.value = goingDown

    const atFirst = activeSlide.value === 0
    const atLast = activeSlide.value === items.value.length - 1

    if (goingDown) {
      if (!atLast) {
        activeSlide.value += 1
        edgeArmed.value = null
      }
      else {
        if (edgeArmed.value === 'bottom') {
          edgeArmed.value = null
          scrollOutsideOfXpSection(true)
        }
        else {
          edgeArmed.value = 'bottom'
        }
      }
    }
    else {
      if (!atFirst) {
        activeSlide.value -= 1
        edgeArmed.value = null
      }
      else {
        if (edgeArmed.value === 'top') {
          edgeArmed.value = null
          scrollOutsideOfXpSection(false)
        }
        else {
          edgeArmed.value = 'top'
        }
      }
    }
  },
})

</script>
<template>
  <section
    ref="xpSection"
    class="xp"
  >
    <div
      v-if="debug"
      class="xp__debugger"
    >
      <span>
        Swip direction: {{ direction }}<br>
      </span>
      <span>
        isAligning: {{ isAligning }}<br>
      </span>
      <span>
        isSectionAligned: {{ isSectionAligned }} <br>
      </span>
    </div>
    <h2 class="xp__sectiontitle section-title">
      Nos expertises en action
    </h2>
    <div class="xp__inner">
      <div class="xp__titlelist">
        <p
          v-for="(item, key) in items"
          :key="`xp-title-item-${key}`"
          class="xp__title"
          :class="{'actif': activeSlide === key}"
        >
          <span>
            0{{ key + 1 }}
          </span>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="item.title" />
        </p>
      </div>
      <div class="xp__picturelist">
        <img
          v-for="(item, key) in items"
          :key="`xp-main-picture-${key}`"
          :src="item.mainpicture.href"
          :alt="item.mainpicture.alt"
          :class="{'actif': activeSlide >= key}"
          :style="{zIndex: 10 * key}"
        >
      </div>
      <div class="xp__textlist">
        <p
          v-for="(item, key) in items"
          :key="`xp-text-item-${key}`"
          :class="{'actif': activeSlide === key }"
        >
          {{ item.text }}
        </p>
      </div>
    </div>
    <div
      class="xp__bg"
    >
      <img
        v-for="(item, key) in items"
        :key="`xp-bg-item-${key}`"
        :src="item.secondarypicture.href"
        :alt="item.secondarypicture.alt"
        :class="{'actif': activeSlide >= key}"
        :style="{zIndex: 10 * key}"
      >
    </div>
  </section>
</template>
<style lang="scss" scoped>
.xp {
  --transition-timing: all cubic-bezier(0.65, 0.05, 0.36, 1) .5s;

  position: relative;
  width: 100%;
  height: 100vh;
  overscroll-behavior: contain; /* empêche la propagation au viewport */
  touch-action: pan-x;

  // background-color: rgb(170 42 42);
  overflow: hidden;

  &__debugger {
    position: fixed;
    z-index: 200;
    right: 0;
    bottom: 0;
    padding: 2rem;
    background-color: white;
    color: black;
  }

  &__sectiontitle {
    position: absolute;
    z-index: 3;
    top: 3.125rem;
    left: 50%;
    width: 100%;
    max-width: var(--max-section-width);
    transform: translateX(-50%);
  }

  &__bg {
    position: absolute;
    z-index: 1;
    inset: 0;

    > img {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition-timing);

      &.actif {
        top: 0;
      }
    }
  }

  &__inner {
    display: flex;
    position: relative;
    z-index: 2;
    align-items: center;
    width: 100%;
    max-width: var(--max-section-width);
    height: 100%;
    margin: 0 auto;

    // background-color: rgb(69 69 104);

    >div {
      width: 33.33%;
    }
  }

  &__title {
    span {
      display: block;

      &:first-child {
        margin-bottom: 2.1875rem;
        font-size: 1rem;
        font-weight: 200;
      }

      &:last-child {
        font-size: 2.375rem;
        font-weight: 400;
        line-height: 2.8125rem;
      }
    }

    &:not(.actif) {
      display: none;
    }
  }

  &__textlist {
    p {
      width: 100%;
      max-width: 20.25rem;
      margin-left: auto;
      font-size: 1.125rem;
      font-weight: 300;
      line-height: 1.875rem;

      &:not(.actif) {
        display: none;
      }
    }
  }

  &__picturelist {
    position: relative;
    width: 100%;
    padding-top: 33.33%;
    overflow: hidden;

    > img {
      display: block;
      position: absolute;
      top: 100%; left: 0;
      width: 100%;
      height: 100%;
      transition: var(--transition-timing);

      &.actif {
        top: 0;
      }
    }

    > div {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
