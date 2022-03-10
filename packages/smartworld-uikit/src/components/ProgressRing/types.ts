import { scales, variants } from '../Button/types'

export type Scale = typeof scales[keyof typeof scales]

export type Variant = typeof variants[keyof typeof variants]

export interface ProgressRingProps {
  id?: string
  scale?: Scale
  blur?: number
  variant?: Variant
  size?: number
  radius?: number
  borderWidth?: number
  progress?: number
  loading?: boolean
  shadow?: boolean
  image?: string | string[]
  circleColor?: string
  insideColor?: string
  shadowColor?: string
  showProgressBunny?: boolean
  onClick?: () => void
}
