<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Accordion from '@/components/accordion/Accordion.vue'
import AccordionItem from '@/components/accordion/AccordionItem.vue'

interface Agency {
  title: string
  address: string
  image: string
}

const { t } = useI18n()
const activeAgency = ref<number>(0)

const agencies = computed<Agency[]>(() => [
  {
    title: t('agencies.paris.title'),
    address: t('agencies.paris.address'),
    image: '/images/agencies/paris-agency.webp',
  },
  {
    title: t('agencies.bordeaux.title'),
    address: t('agencies.bordeaux.address'),
    image: '/images/agencies/bordeaux-agency.webp',
  },
  {
    title: t('agencies.lyon.title'),
    address: t('agencies.lyon.address'),
    image: '/images/agencies/lyon-agency.webp',
  },
  {
    title: t('agencies.lille.title'),
    address: t('agencies.lille.address'),
    image: '/images/agencies/lille-agency.webp',
  },
  {
    title: t('agencies.bellgique.title'),
    address: t('agencies.bellgique.address'),
    image: '/images/agencies/bellgique-agency.webp',
  },
  {
    title: t('agencies.suisse.title'),
    address: t('agencies.suisse.address'),
    image: '/images/agencies/suisse-agency.webp',
  },
  {
    title: t('agencies.luxembourge.title'),
    address: t('agencies.luxembourge.address'),
    image: '/images/agencies/luxembourge-agency.webp',
  },
  {
    title: t('agencies.paysbas.title'),
    address: t('agencies.paysbas.address'),
    image: '/images/agencies/paysbas-agency.webp',
  },
])

const activeImage = computed(() => {
  return agencies.value[activeAgency.value]?.image
})

const selectAgency = (index: number) => {
  activeAgency.value = index
}
</script>

<template>
  <div class="agencies">
    <div class="agencies__content">
      <div class="agencies__list">
        <Accordion>
          <AccordionItem
            v-for="(agency, index) in agencies"
            :key="index"
          >
            <template #accordion-trigger>
              <div
                class="agency__header"
                @click="selectAgency(index)"
              >
                <h3 class="agency__title">
                  {{ agency.title }}
                </h3>
                <hr class="agency__divider">
              </div>
            </template>

            <template #accordion-content>
              <div class="agency__details">
                <p class="agency__address">
                  {{ agency.address }}
                </p>
              </div>
            </template>
          </AccordionItem>
        </Accordion>
      </div>
      <div class="agency__image">
        <img
          :src="activeImage"
          :alt="agencies[activeAgency]?.title"
          class="image__image--transition"
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.agencies {
  margin: 0 auto;
  padding: 4rem;
  background-color: var(--color-bg-dark);

  @include mq(tablet) {
    padding: 2rem;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @include mq(desktop) {
      flex-direction: row;
      gap: 3rem;
      align-items: flex-start;
    }
  }

  &__list {
    width: 100%;

    @include mq(desktop) {
      flex: 1;
      min-width: 300px;
    }
  }
}

.agency {
  &__header {
    padding: 1rem 0;
    cursor: pointer;

    @include mq(tablet) {
      padding: 1.5rem 0;
    }
  }

  &__title {
    margin: 0 0 0.5rem;
    transition: color 0.3s ease;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 500;

    @include mq(tablet) {
      font-size: 1.5rem;
    }

    &:hover {
      color: #dfe4e8;
    }
  }

  &__divider {
    width: 50px;
    height: 2px;
    margin: 0;
    transition: width 0.3s ease;
    border: none;
  }

  &__details {
    padding: 1rem 0;
  }

  &__address {
    margin: 0;
    color: #ffffff;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  &__image {
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgb(0 0 0 / 10%);

    @include mq(desktop) {
      flex: 1;
      min-width: 400px;
      height: 900px;
    }
  }
}

.image {
  &__image--transition {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease, opacity 0.5s ease;
    animation: fade-in 0.5s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
}

@keyframes fade-in {
  from {
    transform: scale(1.1);
    opacity: 0%;
  }

  to {
    transform: scale(1);
    opacity: 100%;
  }
}
</style>
