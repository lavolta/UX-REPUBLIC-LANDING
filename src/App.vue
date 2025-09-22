<script setup lang="ts">
import { useHead } from '@unhead/vue'
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=Cormorant+Garamond:wght@700&family=Lora:ital,wght@1,600&family=Raleway:wght@900&family=Montserrat:wght@700&family=Open+Sans:wght@800&family=Source+Sans+Pro:wght@700&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Carattere&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Carattere&family=Bowlby+One&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Carattere&family=Bowlby+One&family=Dawning+of+a+New+Day&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Carattere&family=Bowlby+One&family=Dawning+of+a+New+Day&family=VT323&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Carattere&family=Bowlby+One&family=Dawning+of+a+New+Day&family=VT323&family=Zen+Loop:ital@0;1&display=swap',
    },
  ],
})
</script>
<template>
  <RouterView />
</template>
