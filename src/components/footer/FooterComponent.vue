<!-- components/footer/FooterSection.vue -->
<script setup lang="ts">
import ContactSection from '@/components/contact/ContactSection.vue'
import FooterNav from '@/components/footer/FooterNav.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted } from 'vue'
import { useTemplateRef } from 'vue'
import StarsIcon from '../icons/StarsIcon.vue'

const footerSection = useTemplateRef('footerSection')
const footerMask = useTemplateRef('footerMask')
const footerTitle = useTemplateRef('footerTitle')

let footergsapContext: gsap.Context | null = null

onMounted(() => {
  footergsapContext = gsap.context(() => {
    const footerTimeline = gsap.timeline()
    const footerStars = gsap.utils.toArray(`#footerTitle .footer-section__stars`) as HTMLOrSVGElement[]

    // footerTimeline.to(footerMask.value, {
    //   bottom: '100%',
    //   duration: 200,
    //   ease: 'power1',
    // })
    footerTimeline.to(footerTitle.value, {
      translateY: '20%',
      duration: 200,
      ease: 'power1',
    }, '>')
    footerStars.forEach((star) => {
      footerTimeline.to(
        star,
        {
          rotation: 90,
          duration: 250,
          ease: 'power1',
        },
        '<',
      )
    })
    ScrollTrigger.create({
      animation: footerTimeline,
      trigger: footerSection.value,
      start: 'top-=50% 30%', // quand le haut du footer atteint 70% de l’écran
      end: '100% 100%',
      scrub: 4,
      onEnter: () => {
        // lancer la timeline à ce moment
        // gsap.to(footerMask.value, {
        //   bottom: '100%',
        //   duration: 1,
        //   ease: 'power2.out',
        // })
      },
      onLeave: () => {
      },
      onLeaveBack: () => {
        // gsap.to(footerMask.value, {
        //   bottom: '0%',
        //   duration: 1,
        //   ease: 'power2.out',
        // })
      },
    })
  })
})
onUnmounted(() => {
  if (footergsapContext) {
    footergsapContext.revert()
  }
})
</script>

<template>
  <footer
    ref="footerSection"
    class="footer-section"
  >
    <div
      id="footerTitle"
      ref="footerTitle"
      class="footer-section__title"
    >
      <div class="footer-section__titleinner">
        <div
          v-for="item in 4"
          :key="`footer-section__title${item}`"
          :class="{'red': item === 2}"
        >
          <span>contactez-nous</span>
          <div class="footer-section__stars">
            <StarsIcon />
          </div>
        </div>
      </div>
    </div>
    <div class="footer-section__inner">
      <div>
        <div
          ref="footerMask"
          class="footer-section__mask"
        />
        <ContactSection />
      </div>
      <FooterNav />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-section {
  $c: &;

  --translate-value: calc(-25% - 5px);

  @include mq(desktop) {
    --translate-value: calc(-25% - 10px);
  }

  @keyframes scroll {
    to {
      transform: translateX(var(--translate-value));
    }
  }

  position: relative;
  z-index: 20;
  width: 100%;
  transition: transform ease-in .3s;
  background: var(--color-bg-footer);

  .contact {
    margin-bottom: 3.5rem;
  }

  &__inner {
    width: 100%;
    max-width: var(--max-section-width);
    margin: 0 auto;
    padding: 4rem 2rem;
    overflow: hidden;

    @include mq(desktop) {
      padding: 28.125rem 0 4rem;
    }
  }

  &__mask {
    display: none;
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left:0;
    width: 100%;

    // background-color: red;
    background-color: var(--color-bg);
  }

  &__title {
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;
    overflow: hidden;
    transform: translateY(100%);
    color: var(--color-bg-footer);

  }

  &__titleinner {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    animation: scroll 60s linear infinite;
    gap: 1rem;

    @include mq(desktop) {
        gap: 2rem;
    }

    > div {
      display: flex;
      align-items: center;

      // &.red { background-color: red; }

      > div {
        margin-left: 1rem;

        @include mq(desktop) {
          margin-left: 2rem;
        }
      }

      span {
        display: block;

        // color: var(--color-bg-footer);
        font-size: 3.1rem;
        font-weight: 400;
        line-height: 0;
        text-align: center;
        white-space: nowrap;

        @include mq(smartphone) {
          font-size: 3.7rem;
          line-height: 1;
        }

        @include mq(desktop) {
          font-size: 12.075rem;
        }

      }

      svg {
        display: block;
        flex: 0 0 auto;
        width: 3rem;

        @include mq(desktop) {
          width: 9rem;
        }
      }
    }
  }
}
</style>
