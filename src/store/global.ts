import { reactive } from 'vue'

export const globalStore = reactive({
  forcedHideHeader: false,
  setForcedHideHeader(value: boolean) {
    this.forcedHideHeader = value
  },
})
