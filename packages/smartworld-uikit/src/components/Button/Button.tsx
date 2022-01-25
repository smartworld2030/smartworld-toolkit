import React, { cloneElement, ElementType, isValidElement } from 'react'
import getExternalLinkProps from '../../util/getExternalLinkProps'
import { ButtonProps, scales, variants } from './types'
import StyledButton from './StyledButton'
import { scaleVariants } from './theme'

const Button = <E extends ElementType = 'button'>(props: ButtonProps<E>): JSX.Element => {
  const { startIcon, endIcon, shape, external, className, isLoading, disabled, shadow, children, ...rest } = props
  const internalProps = external ? getExternalLinkProps() : {}
  const isDisabled = isLoading || disabled
  const classNames = className ? [className] : []
  const shapeProps: any = {}

  if (isLoading) {
    classNames.push('smartworld-button--loading')
  }

  if (isDisabled && !isLoading) {
    classNames.push('smartworld-button--disabled')
  }
  if (shape === 'circle') {
    const scale = scaleVariants[rest.scale]
    shapeProps.height = scale.height
    shapeProps.width = scale.height
    const s = scale.height.split('px')
    shapeProps.fontSize = +s[0] / 10
  }

  return (
    <StyledButton
      $isLoading={isLoading}
      className={classNames.join(' ')}
      disabled={isDisabled}
      shape={shape}
      {...shapeProps}
      {...internalProps}
      shadow={shadow}
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
