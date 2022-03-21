import { scales, variants } from '../Button/types'

export type Scale = typeof scales[keyof typeof scales]

export type Variant = typeof variants[keyof typeof variants]

export interface ProgressRingProps {
  id?: string
  className?: string
  scale?: Scale
  blur?: number
  variant?: Variant
  size?: number
  radius?: number
  circleWidth?: number
  progress?: number
  loading?: boolean
  shadow?: boolean
  disabled?: boolean
  noSlider?: boolean
  image?: string | string[]
  circleColor?: string
  insideColor?: string
  shadowColor?: string
  showProgressBunny?: boolean
  onClick?: () => void
}
