import { HTMLAttributes, ReactNode } from 'react'
import {
  BackgroundProps,
  BorderProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  GridProps as _GridProps,
} from 'styled-system'

export interface BoxProps
  extends BackgroundProps,
    BorderProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    HTMLAttributes<HTMLDivElement> {}

export interface FlexProps extends BoxProps, FlexboxProps {}

export interface MainFlexProps extends Omit<BoxProps & FlexboxProps, 'overflow'> {
  flex?: number
  tip?: ReactNode
  demo?: ReactNode
  tipSize?: number
  loading?: boolean
  overflow?: boolean
}

export interface GridProps extends FlexProps, _GridProps {}
