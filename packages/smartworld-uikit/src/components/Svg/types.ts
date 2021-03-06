import { SVGAttributes } from 'react'
import { DefaultTheme } from 'styled-components'
import { SpaceProps } from 'styled-system'

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement>, SpaceProps {
  theme?: DefaultTheme
  spin?: boolean
}
export interface ShadowSvgProps extends SvgProps {
  shadow?: boolean
  shadowColor?: string
  shadowSize?: number | false
}
export interface SvgEffectedProps extends ShadowSvgProps {
  radius: number
  center: number
  blur: number
}
