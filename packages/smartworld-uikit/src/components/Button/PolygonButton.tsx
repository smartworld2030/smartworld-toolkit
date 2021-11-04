import React from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'
import { buttonShadows } from '../../theme/base'
import { HeaderIcon } from '../Svg'
import Button from './Button'
import { scaleVariants } from './theme'
import { PolygonButtonProps } from './types'

const StyledPolygonIcon = styled(HeaderIcon)<{ color?: string; fill?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  fill: ${({ fill }) => (fill ? fill : 'none')};
  stroke: ${({ theme, color }) => (color ? color : theme.colors.primary)};
`

const StyledChild = styled.div<{ size: number }>`
  z-index: 2;
  padding-top: ${({ size }) => size / 5.5}px;
  font-size: ${({ size }) => size / 10}px;
  color: ${({ theme }) => theme.colors.text};
`

const StyledButton = styled(Button)`
  position: relative;
  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) > div {
    transform: scale(1.1, 1.1);
  }
`

const PolygonButton: React.FC<PolygonButtonProps> = ({ icon, shadow, fill, color, children, ...rest }) => {
  const size = variant({
    prop: 'scale',
    variants: scaleVariants,
  })
  const sizeCalc = +size(rest).height.replace('px', '')
  return (
    <StyledButton shape="circle" variant="text" {...rest}>
      <StyledPolygonIcon fill={fill} color={color} width={size(rest).height} shadow={shadow} />
      <StyledChild size={sizeCalc}>{icon ? icon(sizeCalc) : children}</StyledChild>
    </StyledButton>
  )
}
PolygonButton.defaultProps = {
  scale: 'md',
}
export default PolygonButton