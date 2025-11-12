<script lang="ts" setup>
import type { PictureInterface } from '@/interfaces'
defineProps<{ picture: PictureInterface }>()
</script>
<template>
  <div class="news-grid-item-image">
    <img
      :src="picture.href"
      :alt="picture.alt"
      loading="lazy"
    >
  </div>
</template>
<style lang="scss" scoped>
.news-grid-item-image {
  filter: grayscale(1);
  padding: 1rem;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 3px;
  }

  &:hover {
    filter: grayscale(0);
  }
}
</style>
