import 'vue'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $gsap: typeof import('gsap').default
    $Observer: typeof import('gsap/Observer').Observer
    $ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
    $ScrollSmoother: typeof import('gsap/ScrollSmoother').ScrollSmoother
    $ScrollToPlugin: typeof import('gsap/ScrollToPlugin').ScrollToPlugin
  }
}
