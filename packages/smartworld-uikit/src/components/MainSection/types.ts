import { SpringConfig, TransitionFrom, TransitionTo } from '@react-spring/core'
import { ReactElement, ReactNode, Ref } from 'react'
import { FlexboxProps } from 'styled-system'
import { MainSectionSizes, ScreenBreakPoint } from '../../hooks/useWindowSize/useWindowSize'
import { BoxProps } from '../Box/types'

export interface ExpandableColProps {
  ret?: any
  tip?: ReactNode
  tipSize?: number
  showTip: boolean
}
export interface ChildrenProps {
  flex: number
  screen: ScreenBreakPoint
  isTablet?: boolean
  isMobile?: boolean
  sideToggle: boolean
  animLoading?: boolean
  toggle: DefaltToggle
}

export interface DefaltToggle {
  showTip: boolean
  showLeft: boolean
  showRight: boolean
}
export type MainContainerTransition<Item = any> = {
  from?: TransitionFrom<Item>
  initial?: TransitionFrom<Item>
  enter?: TransitionTo<Item>
  update?: TransitionTo<Item>
  leave?: TransitionTo<Item>
}

export interface MainSectionProps {
  initialValue?: MainSectionSizes
  width?: number
  height?: number
  config?: SpringConfig
  refFunc?: Ref<HTMLDivElement>
  background?: string
  menuBackground?: string
  mainBackground?: string
  loading?: boolean
  transition?: MainContainerTransition
  rightIcon?: (props: { checked: boolean; onChange: () => void }) => ReactNode
  leftIcon?: (props: { checked: boolean; onChange: () => void }) => ReactNode
  left?: (props: AdditionalCompProps) => ReactNode
  right?: (props: AdditionalCompProps) => ReactNode
  header?: ReactElement | ReactElement[]
  children: ReactElement | ReactElement[]
  skeleton?: ReactElement | ReactElement[]
  computedMatch?: unknown
  location?: Location
}

interface AdditionalCompProps {
  toggle: DefaltToggle
  showTip: boolean
  tipChanger: () => void
  responsiveSize: (
    w: number,
    toggle?: boolean,
    withPercent?: boolean,
  ) =>
    | {
        height: number
        width: string | undefined
      }
    | {
        width: number
        height: string | undefined
      }
}

export interface Childrens extends FlexboxProps {
  route: string
  flex: number
  xxl?: number
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
  items?: ChildItems[]
}

export interface ChildItems {
  flex: number
  xxl?: number
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
  item: ReactNode
  demo?: ReactNode
  tip?: { item: ReactNode; flex?: number }
}

export interface FlexWithTipProps extends BoxProps {
  flex: number
  tip?: ReactNode
  tipSize?: number
  showTip?: boolean
  isMobile?: boolean
}

export interface MainSectionMenuProps {
  width?: number
  height?: number
  selected?: string
  background?: string
  leftSide?: ReactNode
  rightSide?: ReactNode
}
