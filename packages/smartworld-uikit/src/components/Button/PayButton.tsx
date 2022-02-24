import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { variant as v } from 'styled-system'
import { PayButtonProps } from './types'
import { CheckmarkIcon, PayIcon } from '../Svg'
import Button from './Button'
import { scaleVariants, iconVariant } from './theme'

const loadingKey = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`

const StyledButton = styled(Button)`
  position: relative;
  animation: ${({ isLoading }) => (isLoading ? loadingKey : '')} 5s linear infinite;
  &:hover:not(:disabled):not(.smartworld-button--disabled):not(.smartworld-button--disabled):not(:active) > svg {
    transform: scale(1.1, 1.1);
  }
`

const rotatingY = keyframes`
  0% {
    transform: rotateY(0deg);
  }

  40% {
    transform: rotateY(360deg);
  }

  100% {
    transform: rotateY(0deg);
  }
`

const loadingKeyFrame = keyframes`
  0% {
    transform: rotateY(0deg) scale(1);
  }
  100% {
    transform: rotateY(360deg) scale(1.6);
  }
  0% {
    transform: rotateY(0deg) scale(1);
  }
`

const StyledDiv = styled.div<{ $loading?: boolean; width?: string }>`
  transform-origin: center;
  animation: ${({ $loading }) =>
    $loading
      ? css`
          ${loadingKeyFrame} 1.5s alternate linear infinite;
        `
      : css`
          ${rotatingY} 5s alternate ease-in infinite;
        `};
  & > svg {
    width: ${({ width }) => width};
    ${v({
      variants: iconVariant,
    })};
  }
`
const StyledCheckmark = styled(CheckmarkIcon)`
  ${v({
    variants: iconVariant,
  })}
`

export const PayButton = (props: PayButtonProps): JSX.Element => {
  const { children, done, isLoading, variant, borderWidth, scale } = props
  const { iconSize: width, borderWidth: bw } = v({
    prop: 'scale',
    variants: scaleVariants,
  })({ scale })

  const borderCalc = borderWidth || +bw.replace('px', '')

  const iconProps = { width, paddingTop: `${borderCalc}px`, variant, scale }

  return (
    <StyledButton shape="circle" shadowSize={borderCalc} {...props}>
      {done ? (
        <StyledCheckmark {...iconProps} />
      ) : (
        <StyledDiv $loading={isLoading} {...iconProps}>
          {children ? children(iconProps) : <PayIcon {...iconProps} />}
        </StyledDiv>
      )}
    </StyledButton>
  )
}

PayButton.defaultProps = {
  scale: 'md',
  done: false,
  children: undefined,
  variant: 'primary',
}

export default PayButton
