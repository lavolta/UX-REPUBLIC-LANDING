<script setup lang="ts">
import { useGetContent } from '@/composable'
const { content: cards } = useGetContent('expert.cards', true)
console.log('cards : ', cards)
</script>

<template>
  <section>
    <div>
      <ul id="cards">
        <li
          v-for="(card, i) in cards"
          :id="`card${i+1}`"
          :key="i"
          class="card"
        >
          <div class="card__content">
            <div>
              <h2>Card {{ i + 1 }}</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p>
                <a
                  href="#top"
                  class="btn btn--accent"
                >Read more</a>
              </p>
            </div>
            <figure>
              <img
                src="/images/img-1.jpg"
                alt="Image description"
              >
            </figure>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">

section {
  --card-height: 746px;
  --card-margin: 2vh;
  --negative-card-margin: -2vh;
  --card-top-offset: 1em;
  --numcards: 4;
  --outline-width: 0px;

  margin-bottom: var(--negative-card-margin);
  background-color: var(--color-bg-dark);

  > div {
    width: 100%;
    max-width: 80vw;
    margin: 0 auto;
  }
}

#cards {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(var(--numcards), var(--card-height));

  /* Don't include the --card-margin in padding, as that will affect the scroll-timeline */
  margin-bottom: var(--card-margin);

  /* Make place at bottom, as items will slide to that position */
  padding-bottom: calc(var(--numcards) * var(--card-top-offset));
  outline: calc(var(--outline-width) * 10) solid hotpink;
  list-style: none;
  view-timeline-name: --cards-element-scrolls-in-body;
  gap: var(--card-margin);
}

.card {
  position: sticky;
  top: 0;
  padding-top: calc(var(--index) * var(--card-top-offset));
  outline: var(--outline-width) solid lime;

  --index0: calc(var(--index) - 1); /* 0-based index */
  --reverse-index: calc(var(--numcards) - var(--index0)); /* reverse index */
  --reverse-index0: calc(var(--reverse-index) - 1); /* 0-based reverse index */
  --start-range: calc(var(--index0) / var(--numcards) * 100%);
  --end-range: calc((var(--index)) / var(--numcards) * 100%);

  @keyframes scale {
    to {
      transform: scale(calc(1.1 - calc(0.1 * var(--reverse-index))));
    }
  }

  &__content {
    display: grid;
    grid-template-areas: "text img";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    align-items: stretch;
    overflow: hidden;
    transform-origin: 50% 0%;
    animation: linear scale forwards;
    border-radius: 1em;
    outline: var(--outline-width) solid blue;
    background: rgb(255 255 255);
    box-shadow: 0 0.2em 1em rgb(0 0 0 / 10%), 0 1em 2em rgb(0 0 0 / 10%);
    color: rgb(10 5 7);
    will-change: transform;
    animation-timeline: --cards-element-scrolls-in-body;
    animation-range: exit-crossing var(--start-range) exit-crossing var(--end-range);

    > div {
      display: grid;
      grid-area: text;
      width: 80%;
      text-align: left;
      place-self: center;
      gap: 1em;
      place-items: start;
    }

    > figure {
      grid-area: img;
      overflow: hidden;

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

/* assigner un index manuellement pour l’offset */
#card1 { --index: 1; }
#card2 { --index: 2; }
#card3 { --index: 3; }
#card4 { --index: 4; }
</style>
