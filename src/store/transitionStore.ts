import { reactive } from 'vue'

type stateType = 'transitioning' | 'startTransition' | 'welcomeAnimation'

interface TransitionStateInterface {
  transitioning: boolean
  startTransition: boolean
  welcomeAnimation: boolean
}
interface TransitionStoreInterface {
  state: TransitionStateInterface
  setStateTransition: (type: stateType, value: boolean) => void
}

export const transitionStore = reactive<TransitionStoreInterface>({
  state: {
    transitioning: false,
    startTransition: false,
    welcomeAnimation: true,
  },
  setStateTransition(type: stateType, value: boolean) {
    this.state[type] = value
  },
})
