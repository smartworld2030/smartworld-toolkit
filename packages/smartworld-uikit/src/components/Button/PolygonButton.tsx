import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { variant as v } from 'styled-system'
import { ShadowSvg } from '../Svg'
import Button from './Button'
import { scaleVariants, polygonVariants } from './theme'
import { BaseButtonProps, PolygonButtonProps, Variant } from './types'

const rotateIn = keyframes`
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
`
const rotateOut = keyframes`
  0% {
    transform: rotateY(360deg);
  }

  100% {
    transform: rotateY(0deg);
  }
`

const StyledShadowSvg = styled(ShadowSvg)<{ variant: Variant }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  fill: ${({ fill }) => fill || 'none'};
  ${v({
    variants: polygonVariants,
  })}
  ${({ stroke }) =>
    stroke &&
    css`
      stroke: ${stroke};
    `}
`

const StyledChild = styled.div<{ size: number }>`
  z-index: 2;
  padding-top: ${({ size }) => size / 5.5}px;
  font-size: ${({ size }) => size / 10}px;
  color: ${({ theme }) => theme.colors.text};
`

const StyledButton = styled(Button)<BaseButtonProps>`
  position: relative;
  & > div {
    animation: ${rotateOut} 0.5s;
  }
  &:hover:not(:disabled):not(.smartworld-button--disabled):not(:active) > div {
    animation: ${rotateIn} 0.5s;
  }
  &:has(.smartworld-button--disabled) > svg {
    filter: none;
  }
`

const PolygonButton: React.FC<PolygonButtonProps> = ({
  icon,
  shadow = false,
  className,
  borderWidth,
  fill,
  variant = 'primary',
  stroke,
  children,
  size,
  ...rest
}) => {
  const { borderWidth: bw, height } = v({
    prop: 'scale',
    variants: scaleVariants,
  })(rest)

  const classNames = className ? [className] : []

  const sizeCalc = (size || height.replace('px', '')) as number
  const borderCalc = (borderWidth || bw.replace('px', '')) as number

  if (rest.disabled) {
    classNames.push('smartworld-svg--disabled')
  }

  return (
    <StyledButton shape="circle" variant="text" size={`${sizeCalc}px`} {...rest}>
      <StyledShadowSvg
        viewBox="0 0 20 17"
        shadow={shadow}
        className={classNames.join(' ')}
        fill={fill}
        stroke={stroke}
        variant={variant}
        width={sizeCalc}
        shadowSize={shadow && borderCalc / 2}
        overflow="visible"
      >
        <path d="M1.74842 16L10 1.97231L18.2516 16H1.74842Z" strokeWidth={borderCalc / 7} />
      </StyledShadowSvg>
      <StyledChild size={sizeCalc}>{icon ? icon(sizeCalc) : children}</StyledChild>
    </StyledButton>
  )
}

PolygonButton.defaultProps = {
  scale: 'md',
}
export default PolygonButton
