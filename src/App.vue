<script setup lang="ts">
import { useHead } from '@unhead/vue'
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bowlby+One&family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Questrial&family=Carattere&family=Dawning+of+a+New+Day&family=VT323&family=Zen+Loop&display=swap',
    },
  ],
})
</script>
<template>
  <RouterView />
</template>
