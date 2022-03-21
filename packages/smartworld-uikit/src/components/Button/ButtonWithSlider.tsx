import React, { ReactNode, ReactText, useMemo, useRef, useState } from 'react'
import styled, { CSSProperties, useTheme } from 'styled-components'
import { variant } from 'styled-system'
import { CircleSlider, CircleSliderProps } from '../CircleSlider'
import { getBoxShadows } from '../../theme/base'
import Button from './Button'
import { scaleVariants } from './theme'

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
  border-width: 0;
`
const StyledChild = styled.div<{ size: ReactText; padding?: number; shadow?: boolean; shadowSize?: number }>`
  position: absolute;
  left: auto;
  top: auto;
  z-index: 3;
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: ${({ theme, shadowSize, shadow }) =>
    shadow ? getBoxShadows(theme.colors.background, shadowSize || 4) : 'none'};
`

interface BWSProps extends Omit<CircleSliderProps, 'onInput'> {
  onClick: (e: any) => void
  onInput: (e: number) => void
  icon?: (size: number) => ReactNode
  iconStyle?: CSSProperties
  initialPercent?: number
  isWarning?: boolean
  shadow?: boolean
}

export const ButtonWithSlider: React.FC<BWSProps> = ({
  onClick,
  onInput,
  icon,
  scale,
  loading,
  fontSize,
  disabled,
  children,
  progressColor,
  shadow = true,
  iconStyle = {},
  isWarning = false,
  initialPercent = 100,
  ...rest
}): JSX.Element => {
  const [input, setInput] = useState(initialPercent)
  const lastInput = useRef(initialPercent)
  const { colors } = useTheme()

  const { height, borderWidth, iconSize } = variant({
    prop: 'scale',
    variants: scaleVariants,
  })({ scale })

  const sizeCalc = height.replace('px', '')
  const borderCalc = borderWidth.replace('px', '')

  const clickHandler = (e: any) => {
    if (lastInput.current === input) onClick(e)
    else lastInput.current = input
  }

  const strokeSlider = useMemo(() => {
    if (disabled) return colors.disabled
    if (isWarning) return colors.failure
    return progressColor || colors.primary
  }, [colors, disabled, progressColor, isWarning])

  const isDisabled = loading || disabled

  return (
    <StyledButton shape="circle" shadow={shadow} shadowSize={borderCalc} disabled={isDisabled} scale={scale}>
      <ResizableIcon size={borderCalc / 10} style={iconStyle}>
        {icon && icon(iconSize)}
      </ResizableIcon>
      <StyledChild size={fontSize || sizeCalc / 6}>{children || input}</StyledChild>
      <CircleSlider
        loading={loading}
        shadow={shadow}
        value={input}
        initialValue={initialPercent}
        zIndex={10}
        size={sizeCalc}
        onMouseUp={!isDisabled ? clickHandler : undefined}
        onInputChange={(i) => {
          onInput(i)
          setInput(i)
        }}
        progressColor={strokeSlider}
        disabled={isDisabled}
        {...rest}
      />
    </StyledButton>
  )
}

export default ButtonWithSlider
