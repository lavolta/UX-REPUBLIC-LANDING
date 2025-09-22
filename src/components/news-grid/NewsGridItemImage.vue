<script lang="ts" setup>
import type { PictureInterface } from '@/interfaces'
defineProps<{ picture: PictureInterface }>()
</script>
<template>
  <div class="news-grid-item-image">
    <img
      :src="picture.href"
      :alt="picture.alt"
    >
  </div>
</template>
<style lang="scss" scoped>
.news-grid-item-image {
  filter: grayscale(1);
  padding: 1rem;

  > img {
    display: block;
    border-radius: 3px;
  }

  &:hover {
    filter: grayscale(0);
  }
}
</style>
