import { ScrollTrigger } from 'gsap/ScrollTrigger'

export interface StackSliderPropsInterface {
  id: string
  title: string
}
export interface StackSliderState {
  currentIndex: number
  nextIndex: number
  allowScroll: boolean
  isTransitionning: boolean
  direction: 'down' | 'up'
}

export interface StackSliderTimelineDefaultSettingsInterface {
  ease: string
  duration: number
}

export type SplitTextAnimationType = 'words' | 'lines' | 'chars'
export interface StackSliderConfig {
  trigger: string
  items: string
  itemImagesBg: string
  itemImageCenter: string
  itemOuter: string
  itemInner: string
  itemTitle: string
  itemTitleAnimationType: SplitTextAnimationType
  stackSliderTimelineParameter: StackSliderTimelineDefaultSettingsInterface
}

export type StackSliderScrollTrigerType = ReturnType<typeof ScrollTrigger.create> | null
export type StackSliderObbserverType = ReturnType<typeof ScrollTrigger.observe> | null
