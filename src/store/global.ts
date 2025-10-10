import { reactive } from 'vue'

export const globalStore = reactive({
  forcedHideHeader: false,
  globalOverflow: false,
  setForcedHideHeader(value: boolean) {
    this.forcedHideHeader = value
  },
  setGlobalOverflow(value: boolean) {
    this.globalOverflow = value
  },
})
