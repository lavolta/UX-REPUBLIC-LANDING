<script lang="ts" setup>

const props = withDefaults(defineProps<{
  type?: 'transparent' | 'primary' | 'secondary' | 'warning' | 'info'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  isExternal?: boolean
  hrefLink?: string
  htmlType?: 'button' | 'submit' | 'reset'
}>(), {
  type: 'transparent',
  size: 'medium',
  disabled: false,
  isExternal: false,
  hrefLink: '',
  htmlType: 'button',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'hover'): void
}>()

const handleMouseEnter = () => {
  emit('hover')
}
</script>

<template>
  <button
    v-if="isExternal"
    class="btn"
    :class="[props.type, props.size]"
    :disabled="props.disabled"
    :type="props.htmlType"
    @click="emit('click', $event)"
    @mouseenter="handleMouseEnter"
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
    @mouseenter="handleMouseEnter"
  >
    <slot />
  </a>
</template>

<style lang="scss">
.btn {
  display: inline-block;
  position: relative;
  padding: 1.33rem;
  overflow: hidden;
  transition: transform 0.3s ease;
  border: none;
  border-radius: 1.5rem;
  color: white;
  font-family: inherit;
  font-weight: 600;
  text-align: center;
  cursor: pointer;

  &.transparent {
    background-color: transparent;

   &::before {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      left: 50%;
      width: 0;
      height: 100%;
      transform: translateX(-50%);
      background: #262A31;
    }

    &:hover {
      &::before {
        animation: suck-in 0.5s ease forwards;
      }
    }

    &:not(:hover)::before {
      animation: suck-out 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
  }

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

.no-animation {
    &::before {
        animation: none!important;
    }

    &:hover::before {
        background: #262A31;
    }
}

@keyframes suck-in {
  0% {
    top: 0;
    width: 20%;
    height: 0;
  }

  50% {
    top: 0;
    width: 50%;
    height: 100%;
  }

  100% {
    top: 0;
    width: 100%;
    height: 100%;
  }
}

@keyframes suck-out {
  0% {
    top: 0;
    width: 100%;
    height: 100%;
  }

  50% {
    top: 40%;
    width: 50%;
    height: 10%;
  }

  100% {
    top: 50%;
    width: 0;
    height: 0;
  }
}
</style>
