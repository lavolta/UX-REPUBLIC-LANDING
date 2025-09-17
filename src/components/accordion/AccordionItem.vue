<script lang="ts">
import { defineComponent } from 'vue'

interface AccordionMenu {
  active: number | null
  count: number
}

export default defineComponent({
  inject: ['AccordionMenu'],
  props: {},
  data() {
    return {
      index: null as number | null,
    }
  },
  computed: {
    visible(): boolean {
      const menu = this.AccordionMenu as AccordionMenu
      return this.index === menu.active
    },
  },
  created() {
    const menu = this.AccordionMenu as AccordionMenu
    this.index = menu.count++
  },
  methods: {
    open(): void {
      const menu = this.AccordionMenu as AccordionMenu

      if (this.visible) {
        menu.active = null
      }
      else {
        menu.active = this.index
      }
    },
    start(el: HTMLElement): void {
      el.style.height = el.scrollHeight + 'px'
    },
    end(el: HTMLElement): void {
      el.style.height = ''
    },
  },
})
</script>

<template class="accordion">
  <li class="accordion__item">
    <div
      class="accordion__trigger"
      :class="{'accordion__trigger_active': visible}"
      @click="open"
    >
      <slot name="accordion-trigger" />
    </div>

    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <div
        v-show="visible"
        class="accordion__content"
      >
        <ul>
          <slot name="accordion-content" />
        </ul>
      </div>
    </transition>
  </li>
</template>

<style lang="scss" scoped>
.accordion {
&__item {
  position: relative;
  padding: 10px 20px 10px 40px;
  border-bottom: 1px solid #ebebeb;
  cursor: pointer;
}

&__trigger {
  display: flex;
  justify-content: space-between;
}

&-enter-active,
&-leave-active {
  overflow: hidden;
  transition: height 0.3s ease, opacity 0.3s ease;
  will-change: height, opacity;
}

&-enter,
&-leave-to {
  height: 0 !important;
  opacity: 0%;
}
}
</style>
