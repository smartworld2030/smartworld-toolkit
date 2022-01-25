import { scales, variants } from '../Button/types'

export type Scale = typeof scales[keyof typeof scales]

export type Variant = typeof variants[keyof typeof variants]

export interface ProgressRingProps {
  id?: string
  scale?: Scale
  blur?: string
  variant?: Variant
  size?: number
  radius?: number
  stroke?: number
  progress?: number
  loading?: boolean
  shadow?: boolean
  image?: string
  insideColor?: string
  showProgressBunny?: boolean
  onClick?: () => void
  onImageError?: () => void
}
