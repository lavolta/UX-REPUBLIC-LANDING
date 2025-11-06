import { reactive } from 'vue'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

type ScrollSmootherType = null | ReturnType<typeof ScrollSmoother.create>

interface GlobalStoreInterface {
  forcedHideHeader: boolean
  globalOverflow: boolean
  footerHeight: number
  pageHeight: number
  windowHeight: number
  scrollSmoother: ScrollSmootherType
  isIOS: boolean
  setScrollSmoother: (scrollSmoother: ScrollSmootherType) => void
  setPageHeight: (value: number) => void
  setFooterHeight: (value: number) => void
  setForcedHideHeader: (value: boolean) => void
  setGlobalOverflow: (value: boolean) => void
  setWindowHeight: (value: number) => void
  setIsIOS: (value: boolean) => void
}
export const globalStore = reactive<GlobalStoreInterface>({
  forcedHideHeader: false,
  globalOverflow: false,
  footerHeight: 0,
  pageHeight: 0,
  windowHeight: 0,
  scrollSmoother: null,
  isIOS: false,
  setIsIOS(value: boolean) {
    this.isIOS = value
  },
  setScrollSmoother(value: ScrollSmootherType) {
    this.scrollSmoother = value
  },
  setPageHeight(value: number) {
    this.pageHeight = value
  },
  setWindowHeight(value: number) {
    this.windowHeight = value
  },
  setFooterHeight(value: number) {
    this.footerHeight = value
  },
  setForcedHideHeader(value: boolean) {
    this.forcedHideHeader = value
  },
  setGlobalOverflow(value: boolean) {
    this.globalOverflow = value
  },
})
