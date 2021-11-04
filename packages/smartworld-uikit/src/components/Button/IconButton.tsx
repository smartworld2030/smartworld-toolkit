import React from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'
import { buttonShadows } from '../../theme/base'
import Button from './Button'
import { scaleVariants } from './theme'
import { IconButtonProps } from './types'

const StyledIcon = styled.div<{ size: number; blur?: boolean }>`
  position: absolute;
  z-index: 2;
  padding-top: ${({ size }) => size}px;
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.text};
  filter: ${({ blur }) => (blur ? 'blur(2px)' : 'none')};
`
const StyledChild = styled.div<{ size: number; padding?: number; shadow?: boolean; shadowSize?: number }>`
  z-index: 3;
  padding-top: ${({ padding }) => padding}px;
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: ${({ theme, shadowSize, shadow }) =>
    shadow ? buttonShadows(theme.colors.background, shadowSize + 'px') : 'none'};
`

const StyledButton = styled(Button)`
  position: relative;
`

const IconButton: React.FC<IconButtonProps> = ({ icon, bottomIcon, blur, shadow, fill, color, children, ...rest }) => {
  const size = variant({
    prop: 'scale',
    variants: scaleVariants,
  })
  const sizeCalc = +size(rest).height.replace('px', '')
  const borderCalc = +size(rest).borderWidth.replace('px', '')

  return (
    <StyledButton shape="circle" {...rest}>
      {icon && (
        <StyledIcon blur={blur} size={borderCalc / 10}>
          {icon(sizeCalc - borderCalc * 2)}
        </StyledIcon>
      )}
      <StyledChild size={sizeCalc / 4} padding={!!icon ? 0 : sizeCalc / 9} shadowSize={borderCalc / 3} shadow={shadow}>
        {children}
      </StyledChild>
      {bottomIcon && (
        <StyledChild size={sizeCalc / 8} shadowSize={borderCalc / 3} shadow={shadow}>
          {bottomIcon(sizeCalc / 8)}
        </StyledChild>
      )}
    </StyledButton>
  )
}
IconButton.defaultProps = {
  scale: 'md',
  blur: true,
  shadow: false,
}
export default IconButton
