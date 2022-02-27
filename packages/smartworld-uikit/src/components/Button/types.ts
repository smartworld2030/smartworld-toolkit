import { ComponentProps, CSSProperties, ElementType, ReactElement, ReactNode } from 'react'
import { LayoutProps, SpaceProps } from 'styled-system'
import { Link } from 'react-router-dom'

export const scales = {
  XL: 'xl',
  ML: 'ml',
  LG: 'lg',
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
} as const

export const shape = {
  CIRCLE: 'circle',
  NOPAD: 'nopad',
} as const

export const variants = {
  TRANSPARENT: 'transparent',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  SUCCESS: 'success',
  PRIMARY: 'primary',
  DANGER: 'danger',
  SUBTLE: 'subtle',
  TEXT: 'text',
} as const

export type Shape = typeof shape[keyof typeof shape]
export type Scale = typeof scales[keyof typeof scales]
export type Variant = typeof variants[keyof typeof variants]

/**
 * @see https://www.benmvp.com/blog/polymorphic-react-components-typescript/
 */
export type AsProps<E extends ElementType = ElementType> = {
  as?: E
}

export type MergeProps<E extends ElementType> = AsProps<E> & Omit<ComponentProps<E>, keyof AsProps>

export type PolymorphicComponentProps<E extends ElementType, P> = P & MergeProps<E>

export type PolymorphicComponent<P, D extends ElementType = 'button'> = <E extends ElementType = D>(
  props: PolymorphicComponentProps<E, P>,
) => ReactElement | null

export type ButtonProps<P extends ElementType = 'button'> = PolymorphicComponentProps<P, BaseButtonProps>

export interface BaseButtonProps extends LayoutProps, SpaceProps {
  as?: 'a' | 'button' | typeof Link
  className?: string
  external?: boolean
  isLoading?: boolean
  shadow?: boolean
  shadowSize?: number | false
  shadowColor?: string
  scale?: Scale
  shape?: Shape
  fontSize?: number
  fontWeight?: string | number
  borderWidth?: number
  variant?: Variant
  disabled?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  zIndex?: number | string
}

export interface PolygonButtonProps extends BaseButtonProps {
  icon?: (size: number) => ReactNode
  size?: number
  fill?: string
  stroke?: string
  onClick: () => void
}
export interface IconButtonProps extends BaseButtonProps {
  icon?: (size: number) => ReactNode
  bottomIcon?: (size: number) => ReactNode
  fill?: string
  color?: string
  borderWidth?: number
  blur?: boolean
  onClick?: () => void
  iconProps?: CSSProperties
}
export interface PayButtonProps extends BaseButtonProps {
  children?: (e: ChildrenProps) => JSX.Element
  done?: boolean
  onClick: () => void
}

export interface ChildrenProps {
  width: string
  variant?: Variant
  done?: boolean
}
