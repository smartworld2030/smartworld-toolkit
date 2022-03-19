import React from 'react'
import styled from 'styled-components'
import { variant as v } from 'styled-system'
import { getTextShadows } from '../../theme/base'
import Button from './Button'
import { scaleVariants } from './theme'
import { IconButtonProps } from './types'

const ResizableIcon = styled.div<{ size: number; blurSize: number; blur?: boolean }>`
  position: absolute;
  left: auto;
  top: auto;
  z-index: 2;
  padding-top: ${({ size }) => size}px;
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.text};
  filter: ${({ blur, blurSize }) => (blur ? `blur(${blurSize}px)` : 'none')};
`
const StyledChild = styled.div<{ size: number; padding?: number; shadowSize: number }>`
  z-index: 3;
  padding-top: ${({ padding }) => padding}px;
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: ${({ theme, shadowSize }) => getTextShadows(theme.colors.background, shadowSize)};
`

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconProps,
  bottomIcon,
  blur,
  blurSize,
  shadow,
  shadowSize,
  fontSize,
  children,
  borderWidth,
  size,
  scale,
  active,
  variant,
  ...rest
}) => {
  const { height, borderWidth: bw } = v({
    prop: 'scale',
    variants: scaleVariants,
  })({ scale })

  const sizeCalc = size || height.replace('px', '')
  const borderCalc = borderWidth || +bw.replace('px', '')

  return (
    <Button
      borderWidth={borderCalc}
      shape="circle"
      shadow={shadow}
      active={active}
      size={`${sizeCalc}px`}
      shadowSize={shadowSize || borderCalc}
      variant={active ? 'primary' : variant}
      {...rest}
    >
      {icon && (
        <ResizableIcon blur={blur} blurSize={blurSize || borderCalc / 8} size={borderCalc / 10} style={iconProps}>
          {icon(sizeCalc - borderCalc * 2)}
        </ResizableIcon>
      )}
      <StyledChild size={fontSize || sizeCalc / 4} padding={icon ? 0 : sizeCalc / 9} shadowSize={borderCalc / 10}>
        {children}
      </StyledChild>
      {bottomIcon && (
        <StyledChild size={sizeCalc / 8} shadowSize={borderCalc / 10}>
          {bottomIcon(sizeCalc / 8)}
        </StyledChild>
      )}
    </Button>
  )
}
IconButton.defaultProps = {
  scale: 'md',
  blur: true,
  variant: 'tertiary',
}
export default IconButton
