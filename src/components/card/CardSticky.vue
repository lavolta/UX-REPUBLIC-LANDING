<script setup lang="ts">
const cards = ['Carte 1', 'Carte 2', 'Carte 3', 'Carte 4']
</script>

<template>
  <div class="stacking-container">
    <div
      v-for="(card, i) in cards"
      :key="i"
      class="card"
      :style="{ '--i': i }"
    >
      <div class="card-content">
        {{ card }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.stacking-container {
  display: grid;
  position: relative;
  height: 400vh; /* assez grand pour scroller */
  place-items: center;
}

.card {
  display: flex;
  position: sticky;
  z-index: calc(10 + var(--i));
  top: 2rem; /* distance du haut */
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 150px;
  margin-bottom: 2rem;

  /* réduction progressive des cartes empilées */
  transform: scale(calc(1 - (var(--i) * 0.05)));

  /* petit effet visuel */
  border-radius: 12px;
  background: #4e79ff;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
}
</style>
