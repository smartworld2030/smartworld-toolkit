import { ComponentProps, ElementType, ReactElement, ReactNode } from "react";
import { LayoutProps, SpaceProps } from "styled-system";
import { Link } from "react-router-dom";

export const scales = {
  XL: "xl",
  ML: "ml",
  LG: "lg",
  MD: "md",
  SM: "sm",
  XS: "xs",
} as const;

export const shape = {
  CIRCLE: "circle",
  DEFAULT: "default",
} as const;

export const variants = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
  TEXT: "text",
  DANGER: "danger",
  SUBTLE: "subtle",
  SUCCESS: "success",
  TRANSPARENT: "transparent",
} as const;

export type Shape = typeof shape[keyof typeof shape];
export type Scale = typeof scales[keyof typeof scales];
export type Variant = typeof variants[keyof typeof variants];

/**
 * @see https://www.benmvp.com/blog/polymorphic-react-components-typescript/
 */
export type AsProps<E extends ElementType = ElementType> = {
  as?: E;
};

export type MergeProps<E extends ElementType> = AsProps<E> & Omit<ComponentProps<E>, keyof AsProps>;

export type PolymorphicComponentProps<E extends ElementType, P> = P & MergeProps<E>;

export type PolymorphicComponent<P, D extends ElementType = "button"> = <E extends ElementType = D>(
  props: PolymorphicComponentProps<E, P>
) => ReactElement | null;

export interface BaseButtonProps extends LayoutProps, SpaceProps {
  as?: "a" | "button" | typeof Link;
  external?: boolean;
  isLoading?: boolean;
  scale?: Scale;
  shape?: Shape;
  fontSize?: string | number;
  fontWeight?: string | number;
  variant?: Variant;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  zIndex?: number | string;
}

export type ButtonProps<P extends ElementType = "button"> = PolymorphicComponentProps<P, BaseButtonProps>;
