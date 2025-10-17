import { reactive } from 'vue'

export const globalStore = reactive({
  forcedHideHeader: false,
  globalOverflow: false,
  footerHeight: 0,
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
