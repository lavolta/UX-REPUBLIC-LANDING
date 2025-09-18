<script setup lang="ts">
import TitleComponent from '@/components/title/TitleComponent.vue'
</script>

<template>
  <div class="presentation-container">
    <div class="presentation-grid">
      <div class="title-section">
        <TitleComponent uppercase>
          UX-REPUBLIC
        </TitleComponent>
      </div>

      <div class="description-section">
        <p class="description">
          Dompteur d'expériences qui mettent l'utilisateur au centre. Précurseurs du design à Paris, nous avons grandi avec audace. Aujourd'hui, dans un paysage où les discours se ressemblent, nous choisissons de nous réinventer. Fidèles à nos valeurs — innovation, proximité, pragmatisme et partage — nous affirmons une nouvelle ambition : créer des expériences justes, utiles, performantes et profondément humaines.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.presentation-container {
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @include mq(tablet) {
    padding: 1rem 2rem;
  }

  @include mq(desktop) {
    padding: 1rem 5.625rem;
  }

  @include mq(large) {
    padding: 1rem 5.625rem;
  }

  @include mq(xlarge) {
    padding: 1rem 5.625rem;
  }
}

.presentation-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  align-items: start;
  width: 100%;

  // Mobile first - 1 colonne
  .title-section,
  .description-section {
    grid-column: span 12;
  }

  // Tablet
  @include mq(tablet) {
    gap: 2rem;

    .title-section,
    .description-section {
      grid-column: span 12;
    }
  }

  // Desktop
  @include mq(desktop) {
    gap: 2rem;
    align-items: start;

    .title-section {
      grid-column: 1 / span 6;
      text-align: left;
    }

    .description-section {
      grid-column: 7 / span 6;
      text-align: left;
    }
  }

  // Large screens
  @include mq(large) {
    gap: 2.6875rem; // 43px
  }

  // XLarge screens
  @include mq(xlarge) {
    gap: 3rem;
  }
}

.description {
  margin: 0;
  color: var(--color-text);
  font-size: 1.25rem; // 20px mobile
  font-style: normal;
  font-weight: 200;
  letter-spacing: 0%;
  line-height: 1.4;

  // Tablet
  @include mq(tablet) {
    font-size: 1.5rem; // 24px
    line-height: 1.5;
  }

  // Desktop (1024px+) - 24px
  @include mq(desktop) {
    font-size: 1.5rem; // 24px
    line-height: 1.5;
  }

  // Large (1280px+) - 32px
  @include mq(large) {
    font-size: 2rem; // 32px
    line-height: 1.5;
  }

  // XLarge (1440px+) - Peut-être ajuster si nécessaire
  @include mq(xlarge) {
    font-size: 2rem; // Reste à 32px ou augmentez si besoin
    line-height: 1.5;
  }
}

// Ajustements responsive supplémentaires
@include mq(mobile-small) {
  .presentation-container {
    padding: 1.5rem 0.75rem;
  }

  .description {
    font-size: 1.125rem;
    line-height: 1.35;
  }
}
</style>
