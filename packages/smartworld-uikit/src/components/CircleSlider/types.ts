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
  circleColor?: string
  progressColor?: string
  gradientColorFrom?: string
  gradientColorTo?: string
  knobColor?: string
  onInputChange?: (value?: number) => void
  onImageError?: () => void
  disabled?: boolean
  shadow?: boolean
  image?: string
  showPercentage?: boolean
  tooltipSize?: number
  tooltipColor?: string
  insideColor?: string
}
