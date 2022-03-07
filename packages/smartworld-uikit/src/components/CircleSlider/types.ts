import { ReactText } from 'react'
import { SvgProps } from '../Svg'

export interface CircleSliderProps extends SvgProps {
  size?: number
  circleWidth?: number
  progressWidth?: number
  knobRadius?: number
  knobWidth?: number
  value?: number
  stepSize?: number
  min?: number
  max?: number
  blur?: ReactText
  circleColor?: string
  progressColor?: string
  gradientColorFrom?: string
  gradientColorTo?: string
  knobColor?: string
  onInputChange?: (value: number) => void
  disabled?: boolean
  noSlider?: boolean
  loading?: boolean
  shadow?: boolean
  image?: string | string[]
  showPercentage?: boolean
  tooltipSize?: number
  tooltipColor?: string
  insideColor?: string
  shadowColor?: string
  zIndex?: number
}
