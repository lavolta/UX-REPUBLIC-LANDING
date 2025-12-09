<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const { availableLocales, locale } = useI18n()
const { currentRoute } = useRouter()
const handleSwitchLocale = (localeToSwitch: string) => {
  if (currentRoute.value.name && typeof currentRoute.value.name === 'string' && currentRoute.value.name.includes('home')) {
    window.location.href = localeToSwitch === 'fr' ? '/' : `/${localeToSwitch}`
  }
  else {
    const splitFullPath = currentRoute.value.fullPath.split('/')
    window.location.href = localeToSwitch === 'fr' ? `/${splitFullPath[2]}` : splitFullPath.length === 2 ? `/${localeToSwitch}/${splitFullPath[1]}` : `/${localeToSwitch}/${splitFullPath[2]}`
  }
}
</script>
<template>
  <div class="lang-switcher">
    <button
      v-for="(availableLocale, key) in availableLocales"
      :key="`availableLocale-item-${key}`"
      :class="['button', 'lang-switcher__btn', {'actif': availableLocale === locale}]"
      :disabled="availableLocale === locale"
      @click="handleSwitchLocale(availableLocale)"
    >
      <span>
        {{ availableLocale }}
      </span>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.lang-switcher {
  display: flex;

  &__btn {
    padding: 0.8125rem;
    background-color: transparent;
    color: var(--color-bg-footer);
    font-weight: 700;
    text-transform: uppercase;

    @include mq(desktop) {
      padding: 0.8125rem 1.875rem;
    }

    span {
      position: relative;
      z-index: 2;
    }

    cursor: pointer;

    &:not(:last-child) {
      margin-right: 0.5rem;

      @include mq(desktop) {
        margin-right: 1rem;
      }
    }

    &::after {
      opacity: 100%;
      background-color: var(--color-bg-footer);
    }

    &.actif,
    &:hover {
      color: var(--color-background);

      &::after {
        transform: translateY(0);
      }
    }
  }
}
</style>
