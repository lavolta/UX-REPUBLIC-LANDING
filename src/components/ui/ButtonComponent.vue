<!-- components/ui/ButtonComponent.vue -->
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'outline'
  size?: 'small' | 'medium' | 'large'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
})
</script>

<template>
  <button
    :class="['button', `button--${variant}`, `button--${size}`]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.uibutton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
  text-overflow: ellipsis;
  white-space: nowrap; // ← GARANTIT LE TEXTE SUR UNE SEULE LIGNE
  cursor: pointer;

  &--outline {
    border: 1px solid #555555;
    background: transparent;
    color: var(--color-text);

    &:hover {
      background: #555555;
      color: white;
    }
  }

  &--large {
    padding: 1.5rem 2rem;
    font-size: inherit; // Utilise la taille de police du parent
  }
}
</style>
