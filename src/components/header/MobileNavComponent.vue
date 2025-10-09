<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { tm } = useI18n()
const items = tm('header.navigation')
</script>
<template>
  <div
    id="mobile-nav"
    class="mobile-nav"
  >
    <div class="mobile-nav__inner">
      <nav class="mobile-nav__list">
        <ul>
          <li
            v-for="(item, key) in items"
            :key="`mobile-nav-item-${key}`"
          >
            <a
              :href="item.href"
              class="button"
            >
              {{ item.content }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mobile-nav {
  position: fixed;
  z-index: 100;
  transform: translateY(-100%);
  background-color: transparent;
  background-color: var(--color-bg);
  inset: 0;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
  }

  &__list {
    li {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }

      .button {
        display: block;
      }
    }
  }
}
</style>
