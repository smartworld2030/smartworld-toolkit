import React from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'
import { buttonShadows } from '../../theme/base'
import Button from './Button'
import { scaleVariants } from './theme'
import { IconButtonProps, BaseButtonProps } from './types'

const ResizableIcon = styled.div<{ size: number; blur?: boolean }>`
  position: absolute;
  left: auto;
  top: auto;
  z-index: 2;
  padding-top: ${({ size }) => size}px;
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.text};
  filter: ${({ blur }) => (blur ? 'blur(1px)' : 'none')};
`
const StyledChild = styled.div<{ size: number; padding?: number; shadowSize: number }>`
  z-index: 3;
  padding-top: ${({ padding }) => padding}px;
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: ${({ theme, shadowSize }) => buttonShadows(theme.colors.background, shadowSize)};
`

const StyledButton = styled(Button)<BaseButtonProps>`
  position: relative;
`

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconProps,
  bottomIcon,
  blur,
  shadow,
  shadowSize,
  fontSize,
  children,
  borderWidth,
  size,
  scale,
  ...rest
}) => {
  const { height, borderWidth: bw } = variant({
    prop: 'scale',
    variants: scaleVariants,
  })({ scale })

  const sizeCalc = size || height.replace('px', '')
  const borderCalc = borderWidth || +bw.replace('px', '')

  return (
    <StyledButton
      borderWidth={borderCalc}
      shape="circle"
      shadow={shadow}
      size={`${sizeCalc}px`}
      shadowSize={shadowSize || borderCalc}
      {...rest}
    >
      {icon && (
        <ResizableIcon blur={blur} size={borderCalc / 10} style={iconProps}>
          {icon(sizeCalc - borderCalc * 2)}
        </ResizableIcon>
      )}
      <StyledChild size={fontSize || sizeCalc / 4} padding={icon ? 0 : sizeCalc / 9} shadowSize={borderCalc / 3}>
        {children}
      </StyledChild>
      {bottomIcon && (
        <StyledChild size={sizeCalc / 8} shadowSize={borderCalc / 3}>
          {bottomIcon(sizeCalc / 8)}
        </StyledChild>
      )}
    </StyledButton>
  )
}
IconButton.defaultProps = {
  scale: 'md',
  blur: true,
}
export default IconButton
