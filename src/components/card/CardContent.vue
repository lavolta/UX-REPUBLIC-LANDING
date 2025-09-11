<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  card: { type: Object, required: true },
})

const cardIndex = computed(() => {
  // Trouver l'index de la carte dans le tableau original si nécessaire
  return props.card.id - 1 // Supposant que les IDs commencent à 1
})
</script>

<template>
  <div class="card__inner">
    <div class="left">
      <div class="card__inner--step-badge">
        {{ cardIndex + 1 }}
      </div>
      <h3 class="card__inner--title">
        {{ card.title }}
      </h3>
      <p
        v-if="card.description"
        class="card__inner--desc"
      >
        {{ card.description }}
      </p>
      <ul
        v-if="card.tags?.length"
        class="card__inner--tags"
      >
        <li
          v-for="tag in card.tags"
          :key="tag"
        >
          {{ tag }}
        </li>
      </ul>
    </div>
    <div class="card__inner--right">
      <div class="card__inner--right-frame">
        <img
          v-if="card.image"
          :src="card.image"
          :alt="card.title || ''"
          loading="lazy"
          decoding="async"
        >
        <div
          v-else
          class="placeholder"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
</template>
