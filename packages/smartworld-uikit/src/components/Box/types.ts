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

export interface MainFlexProps extends BoxProps, FlexboxProps {
  tip?: ReactNode
  demo?: ReactNode
  tipSize?: number
}

export interface GridProps extends FlexProps, _GridProps {}
