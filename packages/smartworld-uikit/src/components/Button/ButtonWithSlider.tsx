import React, { ReactNode, ReactText, useRef, useState } from 'react'
import styled, { CSSProperties, keyframes, useTheme } from 'styled-components'
import { variant } from 'styled-system'
import { CircleSlider, CircleSliderProps } from '../CircleSlider'
import { buttonShadows } from '../../theme/base'
import Button from './Button'
import { scaleVariants } from './theme'

const loadingKey = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`
const ResizableIcon = styled.div<{ size: number; blur?: boolean }>`
  position: absolute;
  left: auto;
  top: auto;
  z-index: 2;
  padding-top: ${({ size }) => size}px;
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.text};
  filter: ${({ blur }) => (blur ? 'blur(2px)' : 'none')};
`

const StyledButton = styled(Button)`
  position: relative;
  animation: ${({ isLoading }) => (isLoading ? loadingKey : '')} 5s linear infinite;
  border-width: 0;
  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) > svg {
    transform: scale(1.1, 1.1);
  }
`
const StyledChild = styled.div<{ size: ReactText; padding?: number; shadow?: boolean; shadowSize?: number }>`
  position: absolute;
  left: auto;
  top: auto;
  z-index: 3;
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: ${({ theme, shadowSize, shadow }) =>
    shadow ? buttonShadows(theme.colors.background, `${shadowSize}px`) : 'none'};
`

interface BWSProps extends CircleSliderProps {
  onClick: (e: any) => void
  icon?: (size: number) => ReactNode
  iconStyle?: CSSProperties
  iconColor?: string
  isWarning?: boolean
}

export const ButtonWithSlider = ({
  onClick,
  icon,
  fontSize,
  isWarning,
  progressColor,
  iconStyle,
  iconColor,
  children,
  disabled,
  ...rest
}: BWSProps): JSX.Element => {
  const [input, setInput] = useState(100)
  const lastInput = useRef(100)
  const { colors } = useTheme()

  const size = variant({
    prop: 'scale',
    variants: scaleVariants,
  })

  const sizeCalc = +size(rest).height.replace('px', '')
  const borderCalc = +size(rest).borderWidth.replace('px', '')

  const clickHandler = (e: any) => {
    if (lastInput.current === input) onClick(e)
    else lastInput.current = input
  }

  const strokeIconFunc = () => {
    if (disabled) return colors.disabled
    if (isWarning) return colors.failure
    return iconColor || colors.secondary
  }
  const strokeSliderFunc = () => {
    if (disabled) return colors.disabled
    if (isWarning) return colors.failure
    return progressColor || colors.primary
  }

  return (
    <StyledButton shape="circle" {...rest}>
      <ResizableIcon size={borderCalc / 10} style={iconStyle}>
        {icon ? (
          icon(size(rest).iconSize)
        ) : (
          <svg width={size(rest).iconSize} viewBox="0 0 20 22">
            <path d="M 2 15 L 10 2 L 18 15 H 2 Z" stroke={strokeIconFunc()} strokeWidth="1.5" fill="none" />
          </svg>
        )}
      </ResizableIcon>
      <StyledChild size={fontSize || sizeCalc / 6} shadowSize={borderCalc / 4}>
        {children || input}
      </StyledChild>
      <CircleSlider
        value={input}
        zIndex={10}
        width={size(rest).height}
        onMouseUp={!disabled ? clickHandler : undefined}
        onInputChange={(i) => setInput(i!)}
        progressColor={strokeSliderFunc()}
        disabled={disabled}
        {...rest}
      />
    </StyledButton>
  )
}

ButtonWithSlider.defaultProps = {
  scale: 'md',
  progressWidth: 12,
  knobWidth: 12,
}

export default ButtonWithSlider
