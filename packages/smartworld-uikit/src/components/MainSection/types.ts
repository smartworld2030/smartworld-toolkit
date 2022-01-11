import { SpringConfig, TransitionFrom, TransitionTo } from '@react-spring/core'
import { CSSProperties, ReactElement, ReactNode, Ref } from 'react'
import { FlexboxProps } from 'styled-system'
import { MediaQueries, ListItems } from '../..'
import { WindowSizes } from '../../hooks/useWindowSize/useWindowSize'

export type ScreenBreakPoint = keyof Omit<MediaQueries, 'nav'>

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
  initialValue?: WindowSizes
  config?: SpringConfig
  list?: ListItems
  height?: string
  width?: string
  refFunc?: Ref<HTMLDivElement>
  background?: string
  menuBackground?: string
  mainBackground?: string
  loading?: boolean
  transition?: MainContainerTransition
  rightIcon?: (props: { checked: boolean; onChange: () => void }) => ReactNode
  leftIcon?: (props: { checked: boolean; onChange: () => void }) => ReactNode
  left?: (props: AdditionalCompProps) => ReactNode
  right?: (props: Omit<AdditionalCompProps, 'showTip' | 'tipChanger'>) => ReactNode
  header?: ReactElement | ReactElement[]
  children: ReactElement | ReactElement[]
  skeleton?: ReactElement | ReactElement[]
  style?: CSSProperties
  computedMatch?: unknown
  location?: Location
}

interface AdditionalCompProps {
  flexSize: number
  isMobile?: boolean
  isTablet?: boolean
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
