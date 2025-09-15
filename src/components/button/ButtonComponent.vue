<script lang="ts" setup>

const props = withDefaults(defineProps<{
  type?: 'primary' | 'secondary' | 'warning' | 'info'
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
  color: white;
  font-family: inherit;
  font-weight: 600;
  text-align: center;
  cursor: pointer;

  &.primary {
  background-color: #262A31;
  }

  &.secondary {
  background-color: #33A6FF;
  }

  &.warning {
    background-color: #ED2749;
  }

  &.info {
    background-color: #33A6FF;
  }

  &.small {
  font-size: 1rem;
}

&.medium {
  font-size: 1.125rem;
}

&.large {
  font-size: 1.5rem;
}

&:focus {
  outline: none;
}
}
</style>
