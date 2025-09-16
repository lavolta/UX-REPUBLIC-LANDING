<script setup lang="ts">
import { ref } from 'vue'
import ButtonComponent from '@/components/button/ButtonComponent.vue'

const ctas = ref([
  { translationKey: 'button.navigationCta' },
  { translationKey: 'button.offerCta' },
  { translationKey: 'button.translateCta' },
])

const emit = defineEmits(['ctaClick'])
const animationPlayed = ref(false)

const emitCtaClick = (index: number) => {
  emit('ctaClick', index)
}

const handleFirstHover = () => {
  if (!animationPlayed.value) {
    setTimeout(() => {
      animationPlayed.value = true
      console.log('Animations disabled after first hover')
    }, 1200)
  }
}
</script>

<template>
  <div
    class="navbar"
    :class="{ 'no-animations': animationPlayed }"
  >
    <div class="navbar__ctas">
      <ButtonComponent
        v-for="(cta, index) in ctas"
        :key="index"
        type="transparent"
        size="small"
        :no-animation="animationPlayed"
        @click="emitCtaClick(index)"
        @hover="handleFirstHover"
      >
        <span>{{ $t(cta.translationKey) }}</span>
      </ButtonComponent>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  position: fixed;
  bottom: 20px;
  left: 50%;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  padding: 12px 20px;
  transform: translateX(-50%);
  border-radius: 40px;
  background-color: #212121;
  box-shadow: 0 5px 15px rgb(0 0 0 / 20%);

  &__ctas {
    display: flex;
    gap: 10px;
  }

  &.no-animations {
    ::v-deep(.btn.transparent)::before {
      animation: none !important;
    }

    ::v-deep(.btn.transparent:hover)::before {
      left: 0;
      width: 100%;
      height: 100%;
      transform: none;
      animation: none !important;
      background: #262A31;
    }

    ::v-deep(.btn.transparent:not(:hover))::before {
      left: 50%;
      width: 0;
      height: 100%;
      transform: translateX(-50%);
      animation: none !important;
    }
  }
}
</style>
