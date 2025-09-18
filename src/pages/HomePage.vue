<script lang="ts" setup>
import ProjectGrid from '@/components/project-grid/ProjectGrid.vue'
import { useDefaultSeo } from '@/composable/useDefaultSeo'
useDefaultSeo('home')
</script>
<template>
  <ProjectGrid />
</template>
