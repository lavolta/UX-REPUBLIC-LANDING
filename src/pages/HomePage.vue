<script lang="ts" setup>
import FakeSection from '@/components/faker/FakeSection.vue'
import NewsGrid from '@/components/news-grid/NewsGrid.vue'
import ProjectGrid from '@/components/project-grid/ProjectGrid.vue'
import { useDefaultSeo } from '@/composable/useDefaultSeo'
useDefaultSeo('home')
</script>
<template>
  <ProjectGrid />
  <FakeSection color="teal" />
  <NewsGrid />
</template>
