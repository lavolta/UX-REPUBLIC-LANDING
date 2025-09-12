<script lang="ts" setup>

const props = withDefaults(defineProps<{
  type?: 'primary' | 'secondary' | 'redtags' | 'bluetags'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  isExternal?: boolean
  hrefLink?: string
  htmlType?: 'button' | 'submit' | 'reset'
}>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  isExternal: false,
  hrefLink: '',
  htmlType: 'button',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// const { t } = useI18n()
// const translatedText = computed(() => {
//   if (props.tags) {
//     return t(`tags.${props.tags}`)
//   }
//   return props.text ? t(props.text) : ''
// })
</script>

<template>
  <button
    v-if="isExternal"
    class="btn"
    :class="[props.type, props.size]"
    :disabled="props.disabled"
    :type="props.htmlType"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
  <a
    v-else
    class="btn"
    :href="hrefLink"
    :class="[props.type, props.size]"
    :disabled="props.disabled"
    :type="props.htmlType"
  >
    <slot />
  </a>
</template>

<style lang="scss">
.btn {
  display: inline-block;
  padding: 1.33rem;
  border: none;
  border-radius: 1.5rem;
  font-family: inherit;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}

/* Couleurs */
.primary {
  background-color: #262A31;
  color: white;
}

.secondary {
  background-color: #33A6FF;
  color: white;
}

/* .secondary:hover:not(:disabled) {
} */

.redtags {
  background-color: #ED2749;
  color: white;
}

.bluetags {
  background-color: #33A6FF;
  color: white;
}

/* .redtags:hover:not(:disabled) {
} */

/* Tailles */
.small {
  font-size: 1rem;
}

.medium {
  font-size: 1.125rem;
}

.large {
  font-size: 1.5rem;
}

/* .btn:disabled {
}

.btn:not(:disabled):hover {
} */

/* Focus pour accessibilité */
.btn:focus {
  outline: none;
}
</style>
