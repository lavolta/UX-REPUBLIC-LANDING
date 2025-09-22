<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TitleComponent from '../title/TitleComponent.vue'
import AgencyComponent from './AgencyComponent.vue'

interface Agency {
  id: number
  name: string
  address: string
  email: string
}

const AGENCIES: Agency[] = [
  { id: 1, name: 'Paris', address: '163 quai du Docteur Dervaux 92600, Asnières-sur-Seine', email: 'paris@ux-republic.com' },
  { id: 2, name: 'Bordeaux', address: '2 Rue du Jardin de l/’Ars 33800, Bordeaux', email: 'bordeaux@ux-republic.com' },
  { id: 3, name: 'Lyon', address: 'Boulevard de Stalingrad 69100, Villeurbanne', email: 'lyon@ux-republic.com' },
  { id: 4, name: 'Lille', address: 'Boulevard Louis XIV, 59800 Lille', email: 'lille@ux-republic.com' },
  { id: 5, name: 'Lausanne', address: 'Avenue de la Gare 15, 1003 Lausanne', email: 'suisse@ux-republic.com' },
  { id: 6, name: 'Bruxelles', address: '12 Avenue de Broqueville, B-1150 Woluwe-Saint-Pierre', email: 'belgique@ux-republic.com' },
  { id: 7, name: 'Luxembourg', address: 'Rue Emile Mark, Differdange, 1136 Luxembourg', email: 'luxembourg@ux-republic.com' },
]

const selectedAgency = ref(AGENCIES[0])
const currentAgencyIndex = ref(0)
const isUnlocked = ref(false)
const isInSection = ref(false)
const agencyKey = ref(0)
const agencyComponent = ref<InstanceType<typeof AgencyComponent> | null>(null)

const selectAgency = async (index: number) => {
  if (agencyComponent.value) {
    await agencyComponent.value.leaveAnimation()
  }

  currentAgencyIndex.value = index
  selectedAgency.value = AGENCIES[index]
  agencyKey.value++
}

const handleWheel = (event: WheelEvent) => {
  if (!isInSection.value || isUnlocked.value) return

  event.preventDefault()

  if (event.deltaY < 0) {
    if (currentAgencyIndex.value < AGENCIES.length - 1) {
      selectAgency(currentAgencyIndex.value + 1)
    }
    else {
      isUnlocked.value = true
      selectAgency(0)
    }
  }
  else if (event.deltaY > 0) {
    if (currentAgencyIndex.value > 0) {
      selectAgency(currentAgencyIndex.value - 1)
    }
  }
}

let scrollTimeout: number
const checkSectionVisibility = () => {
  const section = document.querySelector('.agencies')
  if (!section) return false

  const rect = section.getBoundingClientRect()
  return rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3
}

const handleScroll = () => {
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    const visible = checkSectionVisibility()

    if (visible && !isInSection.value) {
      isInSection.value = true
      isUnlocked.value = false
      selectAgency(0)
    }
    else if (!visible && isInSection.value) {
      isInSection.value = false
    }
  }, 50)
}

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('scroll', handleScroll)
  isInSection.value = checkSectionVisibility()
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('scroll', handleScroll)
  clearTimeout(scrollTimeout)
})
</script>

<template>
  <section
    class="agencies"
    :class="{ unlocked: isUnlocked }"
  >
    <div class="agencies__inner">
      <div class="agencies__title">
        <TitleComponent class="title-section">
          Un réseau international <br>au service de vos projets
        </TitleComponent>
      </div>

      <AgencyComponent
        ref="agencyComponent"
        :key="agencyKey"
        :agency="selectedAgency"
      />

      <nav class="agencies__nav">
        <ul>
          <li
            v-for="(agency, index) in AGENCIES"
            :key="agency.id"
            :class="{ active: selectedAgency.id === agency.id }"
          >
            <button
              class="agencies__link"
              :class="{ 'agencies__link--active': selectedAgency.id === agency.id }"
              @click="selectAgency(index)"
            >
              {{ agency.name }}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style scoped lang="scss">
.agencies {
  position: relative;
  overflow: hidden;
  background-color: #F7F7F7;

  &.unlocked {
    overflow: auto;
  }

  &__inner {
    position: relative;
    width: 100%;
    max-width: var(--max-section-width, 84.75rem);
    height: 100%;
    margin: 0 auto;
    padding: 9.1875rem 0 23.3125rem;
  }

  &__title {
    margin-bottom: 6.063rem;

    .title-section {
      color: #181C23;
    }
  }

  &__nav {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;

    ul {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 1.3125rem;
      list-style: none;
      gap: 10rem;
    }
  }

  &__link {
    padding: 0.5rem 0;
    transition: all 0.3s ease;
    border: none;
    background: none;
    color: #333333;
    font-size: 0.75rem;
    font-weight: 200;
    text-decoration: none;
    cursor: pointer;

     &--active {
      font-weight: 800;
    }

    // &:hover {
    //   color: #007bff;
    // }
  }
}

</style>
