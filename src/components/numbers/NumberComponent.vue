<script setup lang="ts">
import TitleComponent from '@/components/title/TitleComponent.vue'
import NumberComponent from '@/components/numbers/NumberExemple.vue'
</script>

<template>
  <div class="stats-row">
    <div class="stat-item">
      <TitleComponent uppercase>
        Projets réalisés
      </TitleComponent>
      <NumberComponent :value="12" />
    </div>

    <div class="stat-item">
      <TitleComponent uppercase>
        Années d'expérience
      </TitleComponent>
      <NumberComponent :value="4" />
    </div>

    <div class="stat-item">
      <TitleComponent uppercase>
        Clients satisfaits
      </TitleComponent>
      <NumberComponent :value="100" />
    </div>

    <div class="stat-item">
      <TitleComponent uppercase>
        Développeurs
      </TitleComponent>
      <NumberComponent :value="500" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats-row {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-dark);
  text-align: center;
  gap: 1.5rem;

  @include mq(tablet) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @include mq(desktop) {
    grid-template-columns: repeat(4, 1fr);
    padding-right: 2.5625rem; // 41px
    padding-left: 5.6875rem; // 91px
    gap: 2.5rem;
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.1875rem;

  @include mq(desktop) {
  align-items: start;
  }

}

.stat-title {
  order: 2;
}

.stat-number {
  order: 1;
}
</style>
