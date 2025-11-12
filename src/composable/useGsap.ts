import { inject } from 'vue'
import { gsapKey, scrollTriggerKey, scrollSmootherKey } from '@/plugins/gsap'

export function useGsap() {
  const gsap = inject(gsapKey)
  if (!gsap) throw new Error('GSAP non injecté')
  return gsap
}

export function useGsapPlugins() {
  const ScrollTrigger = inject(scrollTriggerKey)
  const ScrollSmoother = inject(scrollSmootherKey)
  if (!ScrollTrigger || !ScrollSmoother) throw new Error('Plugins GSAP non injectés')
  return { ScrollTrigger, ScrollSmoother }
}
