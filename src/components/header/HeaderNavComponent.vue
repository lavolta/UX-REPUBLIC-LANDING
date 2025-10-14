<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { tm } = useI18n()
const navItems = tm('header.navigation')
</script>
<template>
  <nav
    class="header-nav"
  >
    <ul>
      <li
        v-for="(item, key) in navItems"
        :key="`header-nav-item-${key}`"
      >
        <a
          v-if="item.type === 'link'"
          :href="item.href"
          class="button"
          target="_blank"
        >
          {{ item.content }}
        </a>
        <RouterLink
          v-else-if="item.type === 'internal'"
          :to="item.href"
          class="button"
        >
          {{ item.content }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
<style lang="scss" scoped>
.header-nav {
  ul {
    display: flex;
  }

  a,
  button {
    padding: 1rem;

    @include mq(desktop) {
      padding: 1rem 1.5625rem;
    }

    border: none;
    background-color: transparent;
    cursor: pointer;
  }
}
</style>
