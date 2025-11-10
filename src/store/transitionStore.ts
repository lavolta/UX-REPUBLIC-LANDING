import { reactive } from 'vue'

type stateType = 'readyToNextPage' | 'displayTransitionScreen' | 'displayTransitionLeave' | 'welcomeAnimation' | 'transitionInProgress' | 'forceCloseNavMenu'

interface TransitionStateInterface {
  readyToNextPage: boolean
  transitionInProgress: boolean
  displayTransitionScreen: boolean
  displayTransitionLeave: boolean
  welcomeAnimation: boolean
  forceCloseNavMenu: boolean
}
interface TransitionStoreInterface {
  state: TransitionStateInterface
  setStateTransition: (type: stateType, value: boolean) => void
  resetTransitionState: () => void
}

export const transitionStore = reactive<TransitionStoreInterface>({
  state: {
    readyToNextPage: false,
    displayTransitionScreen: false,
    displayTransitionLeave: false,
    transitionInProgress: false,
    welcomeAnimation: true,
    forceCloseNavMenu: false,
  },
  resetTransitionState() {
    this.state.readyToNextPage = false
    this.state.displayTransitionLeave = false
    this.state.displayTransitionScreen = false
  },
  setStateTransition(type: stateType, value: boolean) {
    this.state[type] = value
  },
})
