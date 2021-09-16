import { ReactNode } from 'react'
import { Sizes } from '../../hooks/useContinerSize/useContainerSize'

export interface ExpandableColProps {
  showTip: boolean
  tip?: ReactNode
  ret?: any
  tipSize?: number
}
type Screen = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export interface MainContainerProps {
  backgroundColor?: string
  initialValue?: Sizes
  height?: string
  width?: string
  showTip?: boolean
  right?: AdditionalComp
  left?: AdditionalComp
  children: (props: { isMobile?: boolean; isTablet?: boolean; screen?: Screen }) => Childrens[]
}
type AdditionalComp = (props: {
  flex: number
  isMobile?: boolean
  responsiveSize: (
    w: number,
    toggle: boolean,
  ) =>
    | {
        height: number
        width?: undefined
      }
    | {
        width: number
        height?: undefined
      }
}) => ReactNode

export interface Childrens {
  size: number
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
  items: ChildItems[]
}

export interface ChildItems {
  size: number
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
  item: ReactNode
  tip?: { item: ReactNode; size?: number }
}
