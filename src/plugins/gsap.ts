import type { App, InjectionKey } from 'vue'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Enregistre les plugins une fois
gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger, ScrollSmoother)

// Clés typées pour fournir via inject
export const gsapKey = Symbol('gsap') as InjectionKey<typeof gsap>
export const observerKey = Symbol('Observer') as InjectionKey<typeof Observer>
export const scrollTriggerKey = Symbol('ScrollTrigger') as InjectionKey<typeof ScrollTrigger>
export const scrollSmootherKey = Symbol('ScrollSmoother') as InjectionKey<typeof ScrollSmoother>
export const scrollToKey = Symbol('ScrollToPlugin') as InjectionKey<typeof ScrollToPlugin>

export default {
  install(app: App) {
    app.provide(gsapKey, gsap)
    app.provide(observerKey, Observer)
    app.provide(scrollToKey, ScrollToPlugin)
    app.provide(scrollTriggerKey, ScrollTrigger)
    app.provide(scrollSmootherKey, ScrollSmoother)

    app.config.globalProperties.$gsap = gsap
    app.config.globalProperties.$Observer = Observer
    app.config.globalProperties.$ScrollTrigger = ScrollTrigger
    app.config.globalProperties.$ScrollSmoother = ScrollSmoother
    app.config.globalProperties.$ScrollToPlugin = ScrollToPlugin
  },
}
