import React from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'
import { ShadowSvg, SvgProps } from '../Svg'
import Button from './Button'
import { scaleVariants } from './theme'
import { PolygonButtonProps } from './types'

interface PolygonProps extends SvgProps {
  $blur?: number | false | undefined
  $shadowColor?: string | undefined
}

const StyledShadowSvg = styled(ShadowSvg)<{ color?: string; fill?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  fill: ${({ fill }) => fill || 'none'};
  stroke: ${({ theme, color }) => color || theme.colors.primary};
`

const Polygon: React.FC<PolygonProps> = (props) => {
  return (
    <StyledShadowSvg viewBox="0 0 20 17" {...props} overflow="visible">
      <path d="M1.74842 16L10 1.97231L18.2516 16H1.74842Z" strokeWidth="2" />
    </StyledShadowSvg>
  )
}

const StyledChild = styled.div<{ size: number }>`
  z-index: 2;
  padding-top: ${({ size }) => size / 5.5}px;
  font-size: ${({ size }) => size / 10}px;
  color: ${({ theme }) => theme.colors.text};
`

const StyledButton = styled(Button)`
  position: relative;
  &:hover:not(:disabled):not(.smartworld-button--disabled):not(.smartworld-button--disabled):not(:active) > div {
    transform: scale(1.1, 1.1);
  }
`

const PolygonButton: React.FC<PolygonButtonProps> = ({ icon, shadow, borderWidth, fill, color, children, ...rest }) => {
  const { borderWidth: bw, height } = variant({
    prop: 'scale',
    variants: scaleVariants,
  })(rest)

  const sizeCalc = height.replace('px', '')
  const borderCalc = (borderWidth || bw.replace('px', '')) as number

  return (
    <StyledButton shape="circle" variant="text" {...rest}>
      <Polygon fill={fill} color={color} width={height} $blur={shadow && borderCalc / 2} $shadowColor={color} />
      <StyledChild size={sizeCalc}>{icon ? icon(sizeCalc) : children}</StyledChild>
    </StyledButton>
  )
}

PolygonButton.defaultProps = {
  scale: 'md',
}
export default PolygonButton
