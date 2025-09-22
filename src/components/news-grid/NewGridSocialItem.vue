<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: 'linkedin' | 'youtube'
}

const props = defineProps<Props>()

const socialData = computed(() => {
  const data = {
    linkedin: {
      name: 'LinkedIn',
      color: '#0077B5',
      url: 'https://linkedin.com',
      logoUrl: '/images/icons/social/linkedin.svg',
    },
    youtube: {
      name: 'YouTube',
      color: '#FF0000',
      url: 'https://youtube.com',
      logoUrl: '/images/icons/social/youtube.svg',
    },
  }
  return data[props.type]
})

const followIconUrl = '/images/icons/social/follow-arrow.svg'
</script>

<template>
  <div
    class="social"
    :style="{ '--social-color': socialData.color }"
  >
    <div class="social__media">
      <div class="social__logo">
        <img
          :src="socialData.logoUrl"
          :alt="socialData.name + ' logo'"
        >
      </div>
      <span class="social__text">We are <br>on {{ socialData.name }}</span>
    </div>
    <div class="social__cta">
      <button class="social__button">
        Venez follow <img
          :src="followIconUrl"
          alt="Follow icon"
        >
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.social {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20.125rem;
  height: 18.688rem;
  padding: 2.125rem 1.375rem;
  background: #82828233;

  &__media {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    :deep(svg) {
      width: 40px;
      height: 40px;
      fill: currentcolor;
    }
  }

  &__text {
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 500;
    text-align: left;
  }

  &__cta {
    width: 100%;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border: none;
    background: transparent;
    color: white;
    font-size: 1rem;
    font-weight: 300;
    cursor: pointer;
    gap: 4rem;

    :deep(svg) {
      width: 16px;
      height: 16px;
      fill: currentcolor;
    }

    &:hover {
      transform: scale(1.05);
      opacity: 90%;
    }

    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
