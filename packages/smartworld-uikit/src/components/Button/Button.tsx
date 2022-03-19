import React, { cloneElement, ElementType, isValidElement } from 'react'
import { variant } from 'styled-system'
import getExternalLinkProps from '../../util/getExternalLinkProps'
import { ButtonProps, scales, variants } from './types'
import StyledButton from './StyledButton'
import { scaleVariants } from './theme'

const Button = <E extends ElementType = 'button'>(props: ButtonProps<E>): JSX.Element => {
  const {
    startIcon,
    endIcon,
    shape,
    external,
    className,
    isLoading,
    disabled,
    shadow = true,
    children,
    ...rest
  } = props
  const internalProps = external ? getExternalLinkProps() : {}
  const isDisabled = isLoading || disabled
  const classNames = className ? [className] : []
  const shapeProps: any = {}

  const { height: h, borderWidth: bw } = variant({
    prop: 'scale',
    variants: scaleVariants,
  })({ scale: rest.scale })

  const height = h?.replace('px', '')
  const shadowSize = bw?.replace('px', '')

  if (isLoading) {
    classNames.push('smartworld-button--loading')
  }

  if (isDisabled && !isLoading) {
    classNames.push('smartworld-button--disabled')
  }

  if (rest.variant === 'text') {
    classNames.push(`smartworld-text${isDisabled ? '--disabled' : ''}`)
  }

  if (shape === 'circle') {
    shapeProps.height = `${height}px`
    shapeProps.width = `${height}px`

    shapeProps.fontSize = +height / 10
  }

  return (
    <StyledButton
      $isLoading={isLoading}
      className={classNames.join(' ')}
      disabled={isDisabled}
      shape={shape}
      {...shapeProps}
      {...internalProps}
      $shadow={shadow}
      $shadowSize={shadowSize}
      {...rest}
    >
      <>
        {isValidElement(startIcon) &&
          cloneElement(startIcon, {
            mr: shape !== 'circle' && '0.5rem',
          })}
        {children}
        {isValidElement(endIcon) &&
          cloneElement(endIcon, {
            ml: shape !== 'circle' && '0.5rem',
          })}
      </>
    </StyledButton>
  )
}

Button.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false,
}

export default Button
